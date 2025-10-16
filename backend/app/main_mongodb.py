"""
FastAPI application with MongoDB integration
"""
import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.core.mongodb import connect_to_mongo, close_mongo_connection, init_mongodb_models
from app.api.api_v1.endpoints import mongodb_auth
from app.api.api_v1.endpoints import mongo_assessments
from app.api.api_v1.endpoints import assessment_results
from app.api.api_v1.endpoints import news
from app.api.api_v1.endpoints import products
from app.core.config import settings
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting up MongoDB FastAPI application...")
    # Ensure .env is loaded when starting via `uvicorn app.main_mongodb:app`
    try:
        load_dotenv()
    except Exception:
        pass
    try:
        await connect_to_mongo()
        await init_mongodb_models()
        logger.info("MongoDB application started successfully!")
        # Debug: log routes so we know what is mounted
        try:
            for r in app.routes:
                try:
                    logger.info(f"Route mounted: {getattr(r, 'path', None)} methods={getattr(r, 'methods', None)}")
                except Exception:
                    pass
        except Exception:
            pass
    except Exception as e:
        logger.error(f"Failed to start MongoDB application: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("Shutting down MongoDB application...")
    await close_mongo_connection()
    logger.info("MongoDB application shut down successfully!")

# Create FastAPI app
app = FastAPI(
    title="E-Learning Platform - MongoDB",
    description="Advanced E-Learning Platform with MongoDB and AI-powered features",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add trusted host middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]  # Configure appropriately for production
)

# Include routers
app.include_router(
    mongodb_auth.router,
    prefix="/api/v1/auth",
    tags=["MongoDB Authentication"]
)
app.include_router(
    mongo_assessments.router,
    prefix="/api/v1/mongo/assessments",
    tags=["mongo-assessments"]
)
app.include_router(
    assessment_results.router,
    prefix="/api/v1/results",
    tags=["assessment-results"]
)
app.include_router(
    news.router,
    prefix="/api/v1/news",
    tags=["news"]
)
app.include_router(
    products.router,
    prefix="/api/v1/products",
    tags=["products"]
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "E-Learning Platform API with MongoDB",
        "version": "1.0.0",
        "database": "MongoDB",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        from app.core.mongodb import get_database
        db = get_database()
        if db:
            # Test MongoDB connection
            await db.command("ping")
            return {
                "status": "healthy",
                "database": "MongoDB connected",
                "timestamp": "2024-01-01T00:00:00Z"
            }
        else:
            return {
                "status": "unhealthy",
                "database": "MongoDB not connected",
                "timestamp": "2024-01-01T00:00:00Z"
            }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": f"MongoDB error: {str(e)}",
            "timestamp": "2024-01-01T00:00:00Z"
        }

@app.post("/create-admin")
async def create_admin_user():
    """Create default admin user for testing"""
    try:
        from app.models.mongodb_models import User, UserRole
        from app.core.security import get_password_hash
        
        admin_email = "admin@demo.com"
        
        # Always delete existing admin to recreate with correct password
        existing_admin = await User.find_one(User.email == admin_email)
        if existing_admin:
            await existing_admin.delete()
            logger.info("Deleted existing admin user")
        
        # Create admin user with simple password
        simple_password = "123"
        admin_user = User(
            email=admin_email,
            username="admin",
            full_name="Admin User",
            hashed_password=get_password_hash(simple_password),
            is_active=True,
            is_superuser=True,
            is_instructor=False,
            role=UserRole.ADMIN
        )
        await admin_user.insert()
        logger.info(f"Created new admin user with password: {simple_password}")
        
        return {
            "message": "Admin user recreated successfully",
            "email": admin_email,
            "username": "admin",
            "password": simple_password
        }
        
    except Exception as e:
        logger.error(f"Error creating admin user: {e}")
        return {"error": str(e)}

@app.get("/debug/routes")
async def list_routes():
    """Return all registered route paths (debug)."""
    try:
        return [
            {"path": getattr(r, "path", None), "name": getattr(r, "name", None), "methods": list(getattr(r, "methods", []) or [])}
            for r in app.routes
        ]
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/v1/test")
async def test_endpoint():
    """Test endpoint"""
    return {
        "message": "MongoDB API is working!",
        "database": "MongoDB",
        "features": [
            "User authentication",
            "Course management", 
            "AI chatbot",
            "Assessment system"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main_mongodb:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
