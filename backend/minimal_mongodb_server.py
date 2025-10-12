#!/usr/bin/env python3
"""
Minimal MongoDB FastAPI Server
"""
import os
import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from pydantic import BaseModel
from typing import Optional
import bcrypt
from datetime import datetime

# Add backend to path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Set environment
os.environ["MONGODB_URL"] = "mongodb+srv://elearning_user:anhkhoadeptrai@cluster0.apfn5nb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
os.environ["MONGODB_DATABASE"] = "elearning_platform"
os.environ["SECRET_KEY"] = "your-secret-key-change-this-in-production-12345"
os.environ["GEMINI_API_KEY"] = "AIzaSyB7PFhFYDIxqZ9FYEzU0AmWJbLNfl3wFcE"

# Pydantic models
class UserRegister(BaseModel):
    email: str
    username: str
    password: str
    full_name: str
    is_instructor: bool = False

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: Optional[str] = None
    email: str
    username: str
    full_name: str
    is_instructor: bool
    is_active: bool = True
    created_at: Optional[str] = None

# FastAPI app
app = FastAPI(title="MongoDB E-Learning API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB client
client = None
db = None

@app.on_event("startup")
async def startup_event():
    global client, db
    try:
        client = AsyncIOMotorClient(os.environ["MONGODB_URL"])
        db = client[os.environ["MONGODB_DATABASE"]]
        # Test connection
        await client.admin.command('ping')
        print("MongoDB connected successfully!")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")

@app.on_event("shutdown")
async def shutdown_event():
    if client:
        client.close()

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "mongodb"}

@app.post("/api/v1/auth/register")
async def register(user_data: UserRegister):
    try:
        # Check if user exists
        existing_user = await db.users.find_one({"email": user_data.email})
        if existing_user:
            return {"detail": "Email already registered"}
        
        # Hash password
        hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())
        
        # Create user
        user_doc = {
            "email": user_data.email,
            "username": user_data.username,
            "full_name": user_data.full_name,
            "hashed_password": hashed_password.decode('utf-8'),
            "is_instructor": user_data.is_instructor,
            "is_active": True,
            "created_at": datetime.utcnow().isoformat()
        }
        
        result = await db.users.insert_one(user_doc)
        
        # Return user without password
        user_response = {
            "id": str(result.inserted_id),
            "email": user_doc["email"],
            "username": user_doc["username"],
            "full_name": user_doc["full_name"],
            "is_instructor": user_doc["is_instructor"],
            "is_active": user_doc["is_active"],
            "created_at": user_doc["created_at"]
        }
        
        return {"message": "User registered successfully", "user": user_response}
        
    except Exception as e:
        return {"detail": f"Registration failed: {str(e)}"}

@app.post("/api/v1/auth/login")
async def login(login_data: UserLogin):
    try:
        # Find user
        user = await db.users.find_one({"email": login_data.email})
        if not user:
            return {"detail": "Invalid credentials"}
        
        # Check password
        if not bcrypt.checkpw(login_data.password.encode('utf-8'), user["hashed_password"].encode('utf-8')):
            return {"detail": "Invalid credentials"}
        
        # Return user without password
        user_response = {
            "id": str(user["_id"]),
            "email": user["email"],
            "username": user["username"],
            "full_name": user["full_name"],
            "is_instructor": user["is_instructor"],
            "is_active": user["is_active"],
            "created_at": user["created_at"]
        }
        
        return {
            "access_token": "mock_token_" + str(user["_id"]),
            "refresh_token": "mock_refresh_" + str(user["_id"]),
            "user": user_response
        }
        
    except Exception as e:
        return {"detail": f"Login failed: {str(e)}"}

@app.get("/api/v1/users")
async def get_users():
    try:
        users = []
        async for user in db.users.find():
            user_response = {
                "id": str(user["_id"]),
                "email": user["email"],
                "username": user["username"],
                "full_name": user["full_name"],
                "is_instructor": user["is_instructor"],
                "is_active": user["is_active"],
                "created_at": user["created_at"]
            }
            users.append(user_response)
        return {"users": users}
    except Exception as e:
        return {"detail": f"Failed to get users: {str(e)}"}

@app.post("/api/v1/chat/test")
async def test_chat(message: dict):
    """Test Gemini API chat functionality"""
    try:
        import google.generativeai as genai
        
        # Configure Gemini
        genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "AIzaSyB7PFhFYDIxqZ9FYEzU0AmWJbLNfl3wFcE"))
        model = genai.GenerativeModel("gemini-2.0-flash-exp")
        
        # Generate response
        user_message = message.get("message", "Hello")
        chat_type = message.get("type", "learning")
        
        # Create context based on chat type
        if chat_type == "learning":
            context = """Bạn là Chatbot Học Tập chuyên về kỹ năng mềm. Hãy trả lời câu hỏi một cách chi tiết và hữu ích.

Yêu cầu format câu trả lời:
- Sử dụng xuống dòng để tách các phần
- Sử dụng gạch đầu dòng (-) cho các điểm chính
- Sử dụng số thứ tự (1., 2., 3.) cho các bước hoặc danh sách
- Sử dụng **text** để làm nổi bật từ khóa quan trọng
- Giữ câu trả lời rõ ràng, dễ đọc và có cấu trúc"""
        elif chat_type == "debate":
            context = """Bạn là Chatbot Debate chuyên về tranh luận và phân tích. Hãy đưa ra quan điểm và lập luận logic.

Yêu cầu format câu trả lời:
- Sử dụng xuống dòng để tách các phần
- Sử dụng gạch đầu dòng (-) cho các điểm chính
- Sử dụng số thứ tự (1., 2., 3.) cho các lập luận
- Sử dụng **text** để làm nổi bật từ khóa quan trọng
- Đưa ra cả ưu điểm và nhược điểm
- Kết luận rõ ràng và logic"""
        else:
            context = """Bạn là Chatbot Q&A chuyên trả lời câu hỏi về hệ thống và thông tin khóa học.

Yêu cầu format câu trả lời:
- Sử dụng xuống dòng để tách các phần
- Sử dụng gạch đầu dòng (-) cho các điểm chính
- Sử dụng số thứ tự (1., 2., 3.) cho các bước hướng dẫn
- Sử dụng **text** để làm nổi bật từ khóa quan trọng
- Cung cấp thông tin chính xác và hữu ích"""
        
        prompt = f"{context}\n\nCâu hỏi: {user_message}\n\nHãy trả lời bằng tiếng Việt với format đẹp:"
        
        response = model.generate_content(prompt)
        
        return {
            "success": True,
            "response": response.text,
            "message": "Gemini API is working!"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": "Gemini API test failed"
        }

if __name__ == "__main__":
    import uvicorn
    print("Starting Minimal MongoDB FastAPI Server...")
    print("Server will be available at: http://localhost:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
