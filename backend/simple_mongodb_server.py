#!/usr/bin/env python3
"""
Simple MongoDB FastAPI Server
"""
import os
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Set environment variables
os.environ["MONGODB_URL"] = "mongodb+srv://elearning_user:anhkhoadeptrai@cluster0.apfn5nb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
os.environ["MONGODB_DATABASE"] = "elearning_platform"
os.environ["SECRET_KEY"] = "your-secret-key-change-this-in-production-12345"
os.environ["BACKEND_CORS_ORIGINS"] = "http://localhost:3000,http://localhost:3001"

if __name__ == "__main__":
    try:
        import uvicorn
        from app.main_mongodb import app
        
        print("Starting MongoDB FastAPI Server...")
        print("Server will be available at: http://localhost:8000")
        
        uvicorn.run(
            app,
            host="127.0.0.1",
            port=8000,
            reload=False,
            log_level="info"
        )
    except ImportError as e:
        print(f"Import error: {e}")
        print("Installing required packages...")
        os.system("pip install motor pymongo beanie fastapi uvicorn")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
