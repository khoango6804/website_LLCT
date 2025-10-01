from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
from .config import settings
import logging

logger = logging.getLogger(__name__)

# Create database engine with connection pooling
engine = create_engine(
    settings.DATABASE_URL,
    poolclass=QueuePool,
    pool_size=settings.DATABASE_POOL_SIZE,
    max_overflow=settings.DATABASE_MAX_OVERFLOW,
    pool_pre_ping=True,
    pool_recycle=3600,  # Recycle connections every hour
    echo=settings.ENVIRONMENT == "development"
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()


def init_database():
    """Initialize database with required extensions"""
    try:
        with engine.connect() as conn:
            # Enable required PostgreSQL extensions
            extensions = [
                "CREATE EXTENSION IF NOT EXISTS vector;",
                "CREATE EXTENSION IF NOT EXISTS unaccent;",
                "CREATE EXTENSION IF NOT EXISTS pg_trgm;",
                "CREATE EXTENSION IF NOT EXISTS btree_gin;",
            ]
            
            for ext in extensions:
                try:
                    conn.execute(text(ext))
                    conn.commit()
                    logger.info(f"Extension enabled: {ext}")
                except Exception as e:
                    logger.warning(f"Failed to enable extension {ext}: {e}")
                    
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")


# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Async database dependency (for future use)
async def get_async_db():
    # This will be implemented when we add async support
    pass
