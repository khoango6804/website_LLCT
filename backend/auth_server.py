#!/usr/bin/env python3
"""
Simple FastAPI server for authentication testing
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn

app = FastAPI(title="E-Learning Auth API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    username: str
    password: str
    is_instructor: bool = False

class User(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    is_active: bool
    is_superuser: bool
    is_instructor: bool
    avatar_url: Optional[str] = None
    bio: Optional[str] = None

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

# Mock database
MOCK_USERS = {
    "admin@demo.com": {
        "id": 1,
        "email": "admin@demo.com",
        "username": "admin",
        "full_name": "Administrator",
        "password": "admin123",
        "is_active": True,
        "is_superuser": True,
        "is_instructor": False,
        "avatar_url": None,
        "bio": "System Administrator"
    },
    "instructor@demo.com": {
        "id": 2,
        "email": "instructor@demo.com",
        "username": "instructor",
        "full_name": "Giảng viên Demo",
        "password": "instructor123",
        "is_active": True,
        "is_superuser": False,
        "is_instructor": True,
        "avatar_url": None,
        "bio": "Giảng viên môn học"
    },
    "student@demo.com": {
        "id": 3,
        "email": "student@demo.com",
        "username": "student",
        "full_name": "Sinh viên Demo",
        "password": "student123",
        "is_active": True,
        "is_superuser": False,
        "is_instructor": False,
        "avatar_url": None,
        "bio": "Sinh viên đại học"
    }
}

@app.get("/")
def root():
    return {
        "message": "E-Learning Platform Auth API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "login": "/api/v1/auth/login",
            "register": "/api/v1/auth/register",
            "docs": "/docs"
        }
    }

@app.post("/api/v1/auth/login", response_model=LoginResponse)
def login(request: LoginRequest):
    """Login endpoint"""
    user_data = MOCK_USERS.get(request.email)
    
    if not user_data:
        raise HTTPException(status_code=401, detail="Email không tồn tại")
    
    if user_data["password"] != request.password:
        raise HTTPException(status_code=401, detail="Mật khẩu không đúng")
    
    if not user_data["is_active"]:
        raise HTTPException(status_code=401, detail="Tài khoản đã bị vô hiệu hóa")
    
    # Create user object without password
    user = User(
        id=user_data["id"],
        email=user_data["email"],
        username=user_data["username"],
        full_name=user_data["full_name"],
        is_active=user_data["is_active"],
        is_superuser=user_data["is_superuser"],
        is_instructor=user_data["is_instructor"],
        avatar_url=user_data["avatar_url"],
        bio=user_data["bio"]
    )
    
    # Mock JWT token
    access_token = f"mock_jwt_token_{user_data['id']}_{user_data['email']}"
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=user
    )

@app.post("/api/v1/auth/register")
def register(request: RegisterRequest):
    """Register endpoint"""
    # Check if email already exists
    if request.email in MOCK_USERS:
        raise HTTPException(status_code=400, detail="Email đã được sử dụng")
    
    # Check if username already exists
    for user_data in MOCK_USERS.values():
        if user_data["username"] == request.username:
            raise HTTPException(status_code=400, detail="Tên đăng nhập đã được sử dụng")
    
    # Create new user
    new_id = max([u["id"] for u in MOCK_USERS.values()]) + 1
    new_user = {
        "id": new_id,
        "email": request.email,
        "username": request.username,
        "full_name": request.full_name,
        "password": request.password,
        "is_active": True,
        "is_superuser": False,
        "is_instructor": request.is_instructor,
        "avatar_url": None,
        "bio": None
    }
    
    MOCK_USERS[request.email] = new_user
    
    return {
        "message": "Đăng ký thành công",
        "user": {
            "id": new_user["id"],
            "email": new_user["email"],
            "username": new_user["username"],
            "full_name": new_user["full_name"],
            "is_active": new_user["is_active"],
            "is_superuser": new_user["is_superuser"],
            "is_instructor": new_user["is_instructor"]
        }
    }

@app.get("/api/v1/users")
def get_users():
    """Get all users (for testing)"""
    users = []
    for user_data in MOCK_USERS.values():
        users.append({
            "id": user_data["id"],
            "email": user_data["email"],
            "username": user_data["username"],
            "full_name": user_data["full_name"],
            "is_active": user_data["is_active"],
            "is_superuser": user_data["is_superuser"],
            "is_instructor": user_data["is_instructor"]
        })
    return {"users": users}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
