from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

# Create FastAPI app
app = FastAPI(
    title="E-Learning Platform API",
    description="Simple version for testing",
    version="1.0.0"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to E-Learning Platform API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Pydantic models
class LoginRequest(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    is_superuser: bool
    roles: list

class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: User

# Mock users for testing
MOCK_USERS = {
    'admin@demo.com': {
        'id': 1,
        'email': 'admin@demo.com',
        'username': 'admin',
        'full_name': 'Admin User',
        'is_superuser': True,
        'roles': ['admin']
    },
    'instructor@demo.com': {
        'id': 2,
        'email': 'instructor@demo.com',
        'username': 'instructor',
        'full_name': 'Instructor User',
        'is_superuser': False,
        'roles': ['instructor']
    },
    'student@demo.com': {
        'id': 3,
        'email': 'student@demo.com',
        'username': 'student',
        'full_name': 'Student User',
        'is_superuser': False,
        'roles': ['student']
    }
}

@app.post("/api/v1/auth/login", response_model=LoginResponse)
def login(request: LoginRequest):
    """Mock login endpoint for testing"""
    user = MOCK_USERS.get(request.email)
    
    if not user or request.password != "demo123":
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    
    return LoginResponse(
        access_token="mock_access_token_" + str(user['id']),
        refresh_token="mock_refresh_token_" + str(user['id']),
        user=User(**user)
    )

@app.get("/api/v1/test")
def test_endpoint():
    return {
        "message": "API is working!",
        "features": [
            "FastAPI server running",
            "CORS configured",
            "Auth endpoints available",
            "Ready for development"
        ]
    }
