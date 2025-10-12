from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key="AIzaSyB7PFhFYDIxqZ9FYEzU0AmWJbLNfl3wFcE")
gemini_model = genai.GenerativeModel("gemini-2.0-flash-exp")

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

class ChatRequest(BaseModel):
    message: str
    type: str

class ChatResponse(BaseModel):
    response: str

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

@app.post("/api/v1/chat/test", response_model=ChatResponse)
def chat_test(request: ChatRequest):
    """Chat endpoint using Gemini API"""
    try:
        # Build system prompt based on chat type
        if request.type == "learning":
            system_prompt = """Bạn là một trợ lý AI chuyên về giáo dục và kỹ năng mềm. 
            Nhiệm vụ của bạn là giúp học sinh hiểu các khái niệm, giải thích bài học và hướng dẫn làm bài tập.
            Hãy trả lời bằng tiếng Việt một cách thân thiện và hữu ích."""
        elif request.type == "debate":
            system_prompt = """Bạn là một trợ lý AI chuyên về tranh luận và thảo luận.
            Nhiệm vụ của bạn là giúp học sinh tranh luận, phân tích quan điểm và thảo luận về các chủ đề học tập.
            Hãy trả lời bằng tiếng Việt một cách khách quan và khuyến khích tư duy phản biện."""
        elif request.type == "qa":
            system_prompt = """Bạn là một trợ lý AI chuyên về hỏi đáp.
            Nhiệm vụ của bạn là trả lời các câu hỏi về thông tin khóa học, lịch thi và hướng dẫn sử dụng hệ thống.
            Hãy trả lời bằng tiếng Việt một cách chính xác và hữu ích."""
        else:
            system_prompt = """Bạn là một trợ lý AI chuyên về giáo dục.
            Hãy trả lời bằng tiếng Việt một cách thân thiện và hữu ích."""
        
        # Generate response using Gemini API
        full_prompt = f"{system_prompt}\n\nNgười dùng: {request.message}"
        response = gemini_model.generate_content(full_prompt)
        
        return ChatResponse(response=response.text)
        
    except Exception as e:
        # Fallback to mock response if Gemini API fails
        print(f"Gemini API error: {e}")
        return ChatResponse(response=f"Xin lỗi, tôi gặp lỗi khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.")

@app.get("/api/v1/test")
def test_endpoint():
    return {
        "message": "API is working!",
        "features": [
            "FastAPI server running",
            "CORS configured",
            "Auth endpoints available",
            "Chat endpoints available",
            "Ready for development"
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
