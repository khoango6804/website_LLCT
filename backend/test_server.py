"""
Simple test server for registration
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserCreate(BaseModel):
    full_name: str
    email: str
    username: str
    password: str
    is_instructor: bool = False

@app.get("/")
async def root():
    return {"message": "Test server is running!"}

@app.get("/health")
async def health():
    return {"status": "healthy", "message": "Test server is working!"}

@app.post("/api/v1/auth/register")
async def register(user_data: UserCreate):
    """Mock registration endpoint"""
    print(f"Registration attempt: {user_data.email}")
    
    # Simulate successful registration
    return {
        "message": "Registration successful!",
        "user": {
            "id": "123",
            "email": user_data.email,
            "username": user_data.username,
            "full_name": user_data.full_name,
            "role": "instructor" if user_data.is_instructor else "student"
        }
    }

@app.post("/api/v1/auth/login")
async def login(username: str, password: str):
    """Mock login endpoint"""
    print(f"Login attempt: {username}")
    
    # Simulate successful login
    return {
        "access_token": "mock_token_123",
        "refresh_token": "mock_refresh_123",
        "token_type": "bearer",
        "user": {
            "id": "123",
            "email": username,
            "username": "testuser",
            "full_name": "Test User",
            "role": "student"
        }
    }

if __name__ == "__main__":
    print("Starting test server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
