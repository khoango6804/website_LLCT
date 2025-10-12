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
from app.core.config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting up MongoDB FastAPI application...")
    try:
        await connect_to_mongo()
        await init_mongodb_models()
        logger.info("MongoDB application started successfully!")
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
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
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
