from pydantic_settings import BaseSettings
from typing import List, Union, Optional
import os


class Settings(BaseSettings):
    # API
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "E-Learning Platform"
    ENVIRONMENT: str = "development"
    
    # Database - Supabase PostgreSQL
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/elearning"
    DATABASE_POOL_SIZE: int = 10
    DATABASE_MAX_OVERFLOW: int = 20
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8080",
    ]
    
    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    
    # Redis Cache & Queue
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_CACHE_TTL: int = 300  # 5 minutes
    REDIS_RATE_LIMIT_TTL: int = 3600  # 1 hour
    
    # AI & LLM
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL_CHAT: str = "gemini-2.0-flash-exp"
    GEMINI_MODEL_COMPLEX: str = "gemini-2.0-flash-thinking-exp"
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    
    # Vector Search
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    VECTOR_DIMENSION: int = 384
    SIMILARITY_THRESHOLD: float = 0.7
    
    # File Storage
    UPLOAD_MAX_SIZE: int = 50 * 1024 * 1024  # 50MB
    ALLOWED_EXTENSIONS: List[str] = [".pdf", ".docx", ".txt", ".md", ".jpg", ".png", ".mp4"]
    STORAGE_BUCKET: str = "materials"
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 3600  # 1 hour
    CHAT_RATE_LIMIT: int = 50  # per hour
    AI_RATE_LIMIT: int = 20  # per hour
    
    # Monitoring
    SENTRY_DSN: str = ""
    PROMETHEUS_ENABLED: bool = True
    LOG_LEVEL: str = "INFO"
    
    # Email settings
    SMTP_TLS: bool = True
    SMTP_PORT: int = 587
    SMTP_HOST: str = ""
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAILS_FROM_EMAIL: str = ""
    EMAILS_FROM_NAME: str = "E-Learning Platform"
    
    # Feature Flags
    ENABLE_AI_CHAT: bool = True
    ENABLE_DEBATE_ROOM: bool = True
    ENABLE_SOCRATIC_BOT: bool = True
    ENABLE_AUTO_QUIZ_GENERATION: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
