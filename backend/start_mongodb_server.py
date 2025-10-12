#!/usr/bin/env python3
"""
Simple MongoDB FastAPI Server Starter
"""
import os
import sys
import uvicorn
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

def main():
    print("Starting MongoDB FastAPI Server...")
    print("Backend directory:", backend_dir)
    
    # Set environment variables
    os.environ.setdefault("MONGODB_URL", "mongodb+srv://elearning_user:anhkhoadeptrai@cluster0.apfn5nb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    os.environ.setdefault("MONGODB_DATABASE", "elearning_platform")
    os.environ.setdefault("SECRET_KEY", "your-secret-key-change-this-in-production-12345")
    os.environ.setdefault("BACKEND_CORS_ORIGINS", "http://localhost:3000,http://localhost:3001")
    
    try:
        # Import and run the MongoDB app
        from app.main_mongodb import app
        
        print("MongoDB app imported successfully")
        print("Starting server on http://localhost:8000")
        
        uvicorn.run(
            app,
            host="127.0.0.1",
            port=8000,
            reload=True,
            log_level="info"
        )
    except Exception as e:
        print(f"Error starting server: {e}")
        print("Make sure MongoDB dependencies are installed:")
        print("   pip install motor pymongo beanie fastapi uvicorn")

if __name__ == "__main__":
    main()
