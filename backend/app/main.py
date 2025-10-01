from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import time
from contextlib import asynccontextmanager

from .core.config import settings
from .core.database import engine, Base, init_database
from .api.api_v1.api import api_router
from .middleware.rate_limiter import rate_limiter, chat_rate_limiter, ai_rate_limiter
from .services.redis_service import redis_service

# Setup logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting E-Learning Platform API...")
    
    # Initialize database
    init_database()
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    
    # Test Redis connection
    if redis_service.is_connected():
        logger.info("Redis connection established")
    else:
        logger.warning("Redis connection failed - caching disabled")
    
    yield
    
    # Shutdown
    logger.info("Shutting down E-Learning Platform API...")


# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Advanced E-Learning Platform with AI-powered features",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Add middleware
app.middleware("http")(rate_limiter)
app.middleware("http")(chat_rate_limiter)
app.middleware("http")(ai_rate_limiter)

# Set up CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to E-Learning Platform API",
        "version": "1.0.0",
        "features": [
            "AI-powered chat and Q&A",
            "RAG-based content search",
            "Debate rooms with real-time collaboration",
            "Socratic questioning",
            "Auto quiz generation",
            "Vector search and embeddings",
            "Role-based access control",
            "Real-time presence tracking"
        ]
    }


@app.get("/health")
def health_check():
    """Health check endpoint with system status"""
    redis_status = redis_service.get_cache_stats()
    
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "services": {
            "database": "connected",
            "redis": redis_status,
            "ai": "available" if settings.GEMINI_API_KEY else "not_configured"
        },
        "features": {
            "ai_chat": settings.ENABLE_AI_CHAT,
            "debate_room": settings.ENABLE_DEBATE_ROOM,
            "socratic_bot": settings.ENABLE_SOCRATIC_BOT,
            "auto_quiz": settings.ENABLE_AUTO_QUIZ_GENERATION
        }
    }


@app.get("/metrics")
def get_metrics():
    """Basic metrics endpoint"""
    redis_stats = redis_service.get_cache_stats()
    
    return {
        "cache": redis_stats,
        "environment": settings.ENVIRONMENT,
        "uptime": time.time()  # This would be actual uptime in production
    }


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "type": "internal_error"
        }
    )
