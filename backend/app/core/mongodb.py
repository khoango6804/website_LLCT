"""
MongoDB configuration and connection management
"""
import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class MongoDB:
    client: Optional[AsyncIOMotorClient] = None
    database = None

mongodb = MongoDB()

async def connect_to_mongo():
    """Create database connection"""
    try:
        # Get MongoDB configuration from environment
        mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        database_name = os.getenv("MONGODB_DATABASE", "elearning_platform")
        username = os.getenv("MONGODB_USERNAME")
        password = os.getenv("MONGODB_PASSWORD")
        auth_source = os.getenv("MONGODB_AUTH_SOURCE", "admin")
        
        # Build connection string
        if username and password:
            # For MongoDB Atlas or authenticated local MongoDB
            connection_string = f"mongodb://{username}:{password}@{mongodb_url.split('://')[1]}/{database_name}?authSource={auth_source}"
        else:
            # For local MongoDB without authentication
            connection_string = f"{mongodb_url}/{database_name}"
        
        logger.info(f"Connecting to MongoDB: {connection_string.replace(password or '', '***') if password else connection_string}")
        
        # Create client
        mongodb.client = AsyncIOMotorClient(connection_string)
        mongodb.database = mongodb.client[database_name]
        
        # Test connection
        await mongodb.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB!")
        
        return mongodb.database
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Close database connection"""
    if mongodb.client:
        mongodb.client.close()
        logger.info("MongoDB connection closed")

async def init_mongodb_models():
    """Initialize Beanie with all document models"""
    try:
        from app.models.mongodb_models import User, Course, Lesson, Exercise, ChatSession, News, Assessment, AssessmentResult, LibraryDocument, Subject
        
        # Initialize Beanie
        await init_beanie(
            database=mongodb.database,
            document_models=[
                User,
                Course, 
                Lesson,
                Exercise,
                ChatSession,
                News,
                Assessment,
                AssessmentResult,
                LibraryDocument,
                Subject,
            ]
        )
        logger.info("MongoDB models initialized successfully!")
        
    except Exception as e:
        logger.error(f"Failed to initialize MongoDB models: {e}")
        raise

def get_database():
    """Get database instance"""
    return mongodb.database
