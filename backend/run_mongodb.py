"""
Run MongoDB FastAPI server
"""
import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    uvicorn.run(
        "app.main_mongodb:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
