"""
MongoDB Authentication endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import Optional
import logging

from app.core.security import create_access_token, create_refresh_token, verify_password, get_password_hash
from app.core.mongodb import get_database
from app.models.mongodb_models import User, UserCreate, UserResponse, UserLogin, TokenResponse, UserRole
from beanie import PydanticObjectId

logger = logging.getLogger(__name__)

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """Get current user from JWT token"""
    try:
        # Handle mock tokens for development
        if token.startswith("mock_token_") or token.startswith("mock-jwt-token-"):
            logger.info("Using mock token for development")
            # Return a mock admin user for development
            mock_user = User(
                email="admin@demo.com",
                username="admin",
                full_name="Admin User",
                hashed_password="mock",
                is_active=True,
                is_superuser=True,
                is_instructor=False,
                role=UserRole.ADMIN
            )
            # Set a mock ID
            mock_user.id = PydanticObjectId("507f1f77bcf86cd799439011")
            return mock_user
            
        from app.core.security import verify_token
        payload = verify_token(token)
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        user = await User.get(PydanticObjectId(user_id))
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except Exception as e:
        logger.error(f"Error getting current user: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = await User.find_one(User.email == user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        existing_username = await User.find_one(User.username == user_data.username)
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        role = UserRole.INSTRUCTOR if user_data.is_instructor else UserRole.STUDENT
        
        user = User(
            email=user_data.email,
            username=user_data.username,
            full_name=user_data.full_name,
            hashed_password=hashed_password,
            role=role,
            is_instructor=user_data.is_instructor
        )
        
        await user.insert()
        logger.info(f"New user registered: {user.email}")
        
        return UserResponse(
            id=str(user.id),
            email=user.email,
            username=user.username,
            full_name=user.full_name,
            role=user.role,
            is_active=user.is_active,
            avatar_url=user.avatar_url,
            created_at=user.created_at
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed"
        )

@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login user and return JWT tokens"""
    try:
        # Auto-create admin user if it doesn't exist
        admin_email = "admin@demo.com"
        if form_data.username == admin_email:
            existing_admin = await User.find_one(User.email == admin_email)
            if not existing_admin:
                # Create default admin user
                admin_user = User(
                    email=admin_email,
                    username="admin",
                    full_name="Admin User",
                    hashed_password=get_password_hash("123"),
                    is_active=True,
                    is_superuser=True,
                    is_instructor=False,
                    role=UserRole.ADMIN
                )
                await admin_user.insert()
                logger.info("Auto-created admin user")
        
        # Find user by email
        logger.info(f"Looking for user with email: {form_data.username}")
        user = await User.find_one(User.email == form_data.username)
        if not user:
            logger.error(f"User not found: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        logger.info(f"Found user: {user.email}, checking password...")
        
        # Verify password
        logger.info(f"Verifying password for user: {user.email}")
        if not verify_password(form_data.password, user.hashed_password):
            logger.error(f"Password verification failed for user: {user.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        logger.info(f"Password verified successfully for user: {user.email}")
        
        # Check if user is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user"
            )
        
        # Update last login
        user.last_login = datetime.utcnow()
        await user.save()
        
        # Create tokens
        access_token = create_access_token(data={"sub": str(user.id)})
        refresh_token = create_refresh_token(data={"sub": str(user.id)})
        
        logger.info(f"User logged in: {user.email}")
        
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            user=UserResponse(
                id=str(user.id),
                email=user.email,
                username=user.username,
                full_name=user.full_name,
                role=user.role,
                is_active=user.is_active,
                avatar_url=user.avatar_url,
                created_at=user.created_at
            )
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        username=current_user.username,
        full_name=current_user.full_name,
        role=current_user.role,
        is_active=current_user.is_active,
        avatar_url=current_user.avatar_url,
        created_at=current_user.created_at
    )

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(refresh_token: str):
    """Refresh access token"""
    try:
        from app.core.security import verify_token
        payload = verify_token(refresh_token)
        user_id = payload.get("sub")
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        user = await User.get(PydanticObjectId(user_id))
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or inactive"
            )
        
        # Create new tokens
        new_access_token = create_access_token(data={"sub": str(user.id)})
        new_refresh_token = create_refresh_token(data={"sub": str(user.id)})
        
        return TokenResponse(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
            user=UserResponse(
                id=str(user.id),
                email=user.email,
                username=user.username,
                full_name=user.full_name,
                role=user.role,
                is_active=user.is_active,
                avatar_url=user.avatar_url,
                created_at=user.created_at
            )
        )
        
    except Exception as e:
        logger.error(f"Token refresh error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    """Logout user (client should discard tokens)"""
    logger.info(f"User logged out: {current_user.email}")
    return {"message": "Successfully logged out"}

@router.get("/users", response_model=list[UserResponse])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user)
):
    """Get all users (admin only)"""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    users = await User.find_all().skip(skip).limit(limit).to_list()
    return [
        UserResponse(
            id=str(user.id),
            email=user.email,
            username=user.username,
            full_name=user.full_name,
            role=user.role,
            is_active=user.is_active,
            avatar_url=user.avatar_url,
            created_at=user.created_at
        )
        for user in users
    ]
