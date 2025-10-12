"""
Run MongoDB server without .env file
"""
import uvicorn
import os

# Set environment variables directly
os.environ["MONGODB_URL"] = "mongodb+srv://elearning_user:anhkhoadeptrai@cluster0.apfn5nb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
os.environ["MONGODB_DATABASE"] = "elearning_platform"
os.environ["MONGODB_USERNAME"] = "elearning_user"
os.environ["MONGODB_PASSWORD"] = "anhkhoadeptrai"
os.environ["MONGODB_AUTH_SOURCE"] = "admin"
os.environ["SECRET_KEY"] = "your-secret-key-change-this-in-production-12345"
os.environ["ALGORITHM"] = "HS256"
os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"] = "30"
os.environ["REFRESH_TOKEN_EXPIRE_DAYS"] = "7"
os.environ["BACKEND_CORS_ORIGINS"] = "http://localhost:3000,http://localhost:3001"
os.environ["ENVIRONMENT"] = "development"
os.environ["LOG_LEVEL"] = "INFO"

if __name__ == "__main__":
    print("Starting MongoDB FastAPI server...")
    print("MongoDB URL:", os.environ["MONGODB_URL"].replace("anhkhoadeptrai", "***"))
    uvicorn.run(
        "app.main_mongodb:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
