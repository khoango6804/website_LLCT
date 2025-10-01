#!/usr/bin/env python3
"""
Full E-Learning Platform API with all features
"""
from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
import json
from datetime import datetime
import uuid

app = FastAPI(title="E-Learning Platform API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    username: str
    password: str
    is_instructor: bool = False

class User(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    is_active: bool
    is_superuser: bool
    is_instructor: bool
    avatar_url: Optional[str] = None
    bio: Optional[str] = None

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

class Course(BaseModel):
    id: int
    title: str
    description: str
    instructor_id: int
    instructor_name: str
    subject: str
    level: str
    duration: str
    price: float
    is_published: bool
    thumbnail_url: Optional[str] = None
    created_at: str
    updated_at: str

class CourseCreate(BaseModel):
    title: str
    description: str
    subject: str
    level: str
    duration: str
    price: float = 0.0

class Exercise(BaseModel):
    id: int
    title: str
    description: str
    course_id: int
    type: str  # "quiz", "assignment", "exam"
    time_limit: Optional[int] = None
    max_attempts: int = 1
    is_published: bool
    created_at: str

class Question(BaseModel):
    id: int
    exercise_id: int
    question_text: str
    question_type: str  # "multiple_choice", "true_false", "essay"
    options: Optional[List[str]] = None
    correct_answer: str
    points: int = 1

class Enrollment(BaseModel):
    id: int
    user_id: int
    course_id: int
    enrolled_at: str
    progress: float
    status: str  # "active", "completed", "dropped"

class ChatMessage(BaseModel):
    id: int
    user_id: int
    session_id: str
    message: str
    is_ai: bool
    timestamp: str

class CommunityPost(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    author_name: str
    category: str
    created_at: str
    likes: int = 0
    comments_count: int = 0

# Mock database
MOCK_USERS = {
    "admin@demo.com": {
        "id": 1,
        "email": "admin@demo.com",
        "username": "admin",
        "full_name": "Administrator",
        "password": "admin123",
        "is_active": True,
        "is_superuser": True,
        "is_instructor": False,
        "avatar_url": None,
        "bio": "System Administrator"
    },
    "instructor@demo.com": {
        "id": 2,
        "email": "instructor@demo.com",
        "username": "instructor",
        "full_name": "Giảng viên Demo",
        "password": "instructor123",
        "is_active": True,
        "is_superuser": False,
        "is_instructor": True,
        "avatar_url": None,
        "bio": "Giảng viên môn học"
    },
    "student@demo.com": {
        "id": 3,
        "email": "student@demo.com",
        "username": "student",
        "full_name": "Sinh viên Demo",
        "password": "student123",
        "is_active": True,
        "is_superuser": False,
        "is_instructor": False,
        "avatar_url": None,
        "bio": "Sinh viên đại học"
    }
}

MOCK_COURSES = [
    {
        "id": 1,
        "title": "Toán học cơ bản",
        "description": "Khóa học toán học cơ bản dành cho sinh viên năm nhất",
        "instructor_id": 2,
        "instructor_name": "Giảng viên Demo",
        "subject": "Toán học",
        "level": "Cơ bản",
        "duration": "12 tuần",
        "price": 0.0,
        "is_published": True,
        "thumbnail_url": "/api/placeholder/300/200",
        "created_at": "2024-01-15T10:00:00Z",
        "updated_at": "2024-01-15T10:00:00Z"
    },
    {
        "id": 2,
        "title": "Vật lý đại cương",
        "description": "Khóa học vật lý đại cương với các thí nghiệm thực tế",
        "instructor_id": 2,
        "instructor_name": "Giảng viên Demo",
        "subject": "Vật lý",
        "level": "Trung bình",
        "duration": "16 tuần",
        "price": 0.0,
        "is_published": True,
        "thumbnail_url": "/api/placeholder/300/200",
        "created_at": "2024-01-20T10:00:00Z",
        "updated_at": "2024-01-20T10:00:00Z"
    }
]

MOCK_EXERCISES = [
    {
        "id": 1,
        "title": "Bài kiểm tra Toán học - Chương 1",
        "description": "Kiểm tra kiến thức về đại số tuyến tính",
        "course_id": 1,
        "type": "quiz",
        "time_limit": 60,
        "max_attempts": 3,
        "is_published": True,
        "created_at": "2024-01-16T10:00:00Z"
    },
    {
        "id": 2,
        "title": "Bài tập Vật lý - Cơ học",
        "description": "Bài tập về cơ học Newton",
        "course_id": 2,
        "type": "assignment",
        "time_limit": None,
        "max_attempts": 1,
        "is_published": True,
        "created_at": "2024-01-21T10:00:00Z"
    }
]

MOCK_QUESTIONS = [
    {
        "id": 1,
        "exercise_id": 1,
        "question_text": "Phương trình bậc hai ax² + bx + c = 0 có nghiệm khi nào?",
        "question_type": "multiple_choice",
        "options": ["b² - 4ac > 0", "b² - 4ac ≥ 0", "b² - 4ac < 0", "b² - 4ac = 0"],
        "correct_answer": "b² - 4ac ≥ 0",
        "points": 2
    },
    {
        "id": 2,
        "exercise_id": 1,
        "question_text": "Định lý Pythagore chỉ áp dụng cho tam giác vuông. Đúng hay sai?",
        "question_type": "true_false",
        "options": ["Đúng", "Sai"],
        "correct_answer": "Đúng",
        "points": 1
    }
]

MOCK_ENROLLMENTS = [
    {
        "id": 1,
        "user_id": 3,
        "course_id": 1,
        "enrolled_at": "2024-01-16T10:00:00Z",
        "progress": 75.0,
        "status": "active"
    }
]

MOCK_CHAT_MESSAGES = [
    {
        "id": 1,
        "user_id": 3,
        "session_id": "session_1",
        "message": "Xin chào, tôi cần giúp đỡ về bài tập toán",
        "is_ai": False,
        "timestamp": "2024-01-16T10:00:00Z"
    },
    {
        "id": 2,
        "user_id": 3,
        "session_id": "session_1",
        "message": "Xin chào! Tôi sẵn sàng giúp bạn với bài tập toán. Bạn gặp khó khăn ở phần nào?",
        "is_ai": True,
        "timestamp": "2024-01-16T10:01:00Z"
    }
]

MOCK_COMMUNITY_POSTS = [
    {
        "id": 1,
        "title": "Cách học toán hiệu quả",
        "content": "Chia sẻ kinh nghiệm học toán của mình...",
        "author_id": 3,
        "author_name": "Sinh viên Demo",
        "category": "Học tập",
        "created_at": "2024-01-16T10:00:00Z",
        "likes": 15,
        "comments_count": 8
    }
]

MOCK_COMMENTS = [
    # {id, post_id, author_id, author_name, content, created_at}
]

# Attempts (mock)
MOCK_ATTEMPTS = []  # {id, exercise_id, user_id, started_at, submitted_at, score, answers: [{question_id, answer}]}

# Authentication endpoints
@app.get("/")
def root():
    return {
        "message": "E-Learning Platform API",
        "version": "1.0.0",
        "status": "running",
        "features": [
            "Authentication & Authorization",
            "Course Management",
            "Exercise & Quiz System",
            "AI Chatbot",
            "Community Features",
            "File Upload",
            "Reporting & Analytics"
        ]
    }

@app.post("/api/v1/auth/login", response_model=LoginResponse)
def login(request: LoginRequest):
    user_data = MOCK_USERS.get(request.email)
    
    if not user_data:
        raise HTTPException(status_code=401, detail="Email không tồn tại")
    
    if user_data["password"] != request.password:
        raise HTTPException(status_code=401, detail="Mật khẩu không đúng")
    
    if not user_data["is_active"]:
        raise HTTPException(status_code=401, detail="Tài khoản đã bị vô hiệu hóa")
    
    user = User(
        id=user_data["id"],
        email=user_data["email"],
        username=user_data["username"],
        full_name=user_data["full_name"],
        is_active=user_data["is_active"],
        is_superuser=user_data["is_superuser"],
        is_instructor=user_data["is_instructor"],
        avatar_url=user_data["avatar_url"],
        bio=user_data["bio"]
    )
    
    access_token = f"mock_jwt_token_{user_data['id']}_{user_data['email']}"
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=user
    )

@app.post("/api/v1/auth/register")
def register(request: RegisterRequest):
    if request.email in MOCK_USERS:
        raise HTTPException(status_code=400, detail="Email đã được sử dụng")
    
    for user_data in MOCK_USERS.values():
        if user_data["username"] == request.username:
            raise HTTPException(status_code=400, detail="Tên đăng nhập đã được sử dụng")
    
    new_id = max([u["id"] for u in MOCK_USERS.values()]) + 1
    new_user = {
        "id": new_id,
        "email": request.email,
        "username": request.username,
        "full_name": request.full_name,
        "password": request.password,
        "is_active": True,
        "is_superuser": False,
        "is_instructor": request.is_instructor,
        "avatar_url": None,
        "bio": None
    }
    
    MOCK_USERS[request.email] = new_user
    
    return {
        "message": "Đăng ký thành công",
        "user": {
            "id": new_user["id"],
            "email": new_user["email"],
            "username": new_user["username"],
            "full_name": new_user["full_name"],
            "is_active": new_user["is_active"],
            "is_superuser": new_user["is_superuser"],
            "is_instructor": new_user["is_instructor"]
        }
    }

# Course management endpoints
@app.get("/api/v1/courses", response_model=List[Course])
def get_courses():
    return MOCK_COURSES

@app.get("/api/v1/courses/{course_id}", response_model=Course)
def get_course(course_id: int):
    course = next((c for c in MOCK_COURSES if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Khóa học không tồn tại")
    return course

@app.post("/api/v1/courses", response_model=Course)
def create_course(course: CourseCreate):
    new_id = max([c["id"] for c in MOCK_COURSES]) + 1
    new_course = {
        "id": new_id,
        "title": course.title,
        "description": course.description,
        "instructor_id": 2,  # Mock instructor
        "instructor_name": "Giảng viên Demo",
        "subject": course.subject,
        "level": course.level,
        "duration": course.duration,
        "price": course.price,
        "is_published": False,
        "thumbnail_url": "/api/placeholder/300/200",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    MOCK_COURSES.append(new_course)
    return new_course

# Exercise endpoints
@app.get("/api/v1/exercises", response_model=List[Exercise])
def get_exercises(course_id: Optional[int] = None):
    if course_id:
        return [e for e in MOCK_EXERCISES if e["course_id"] == course_id]
    return MOCK_EXERCISES

@app.get("/api/v1/exercises/{exercise_id}", response_model=Exercise)
def get_exercise(exercise_id: int):
    exercise = next((e for e in MOCK_EXERCISES if e["id"] == exercise_id), None)
    if not exercise:
        raise HTTPException(status_code=404, detail="Bài tập không tồn tại")
    return exercise

@app.get("/api/v1/exercises/{exercise_id}/questions", response_model=List[Question])
def get_exercise_questions(exercise_id: int):
    questions = [q for q in MOCK_QUESTIONS if q["exercise_id"] == exercise_id]
    return questions

# Create exercise with questions
class ExerciseCreate(BaseModel):
    title: str
    description: str
    course_id: int
    type: str
    time_limit: Optional[int] = None
    max_attempts: int = 1
    questions: Optional[List[Question]] = None

@app.post("/api/v1/exercises", response_model=Exercise)
def create_exercise(payload: ExerciseCreate):
    new_id = max([e["id"] for e in MOCK_EXERCISES] + [0]) + 1
    new_ex = {
        "id": new_id,
        "title": payload.title,
        "description": payload.description,
        "course_id": payload.course_id,
        "type": payload.type,
        "time_limit": payload.time_limit,
        "max_attempts": payload.max_attempts,
        "is_published": False,
        "created_at": datetime.now().isoformat()
    }
    MOCK_EXERCISES.append(new_ex)

    # Persist questions if provided
    if payload.questions:
        max_q_id = max([q["id"] for q in MOCK_QUESTIONS] + [0])
        add_list = []
        for idx, q in enumerate(payload.questions, start=1):
            add_list.append({
                "id": max_q_id + idx,
                "exercise_id": new_id,
                "question_text": q.question_text,
                "question_type": q.question_type,
                "options": q.options,
                "correct_answer": q.correct_answer,
                "points": q.points
            })
        MOCK_QUESTIONS.extend(add_list)

    return new_ex

# Attempts API
class AttemptStartRequest(BaseModel):
    user_id: int

class AttemptAnswer(BaseModel):
    question_id: int
    answer: str

class AttemptSubmitRequest(BaseModel):
    user_id: int
    answers: List[AttemptAnswer]

@app.post("/api/v1/exercises/{exercise_id}/attempts/start")
def start_attempt(exercise_id: int, payload: AttemptStartRequest):
    attempt_id = len(MOCK_ATTEMPTS) + 1
    record = {
        "id": attempt_id,
        "exercise_id": exercise_id,
        "user_id": payload.user_id,
        "started_at": datetime.now().isoformat(),
        "submitted_at": None,
        "score": None,
        "answers": []
    }
    MOCK_ATTEMPTS.append(record)
    return record

@app.get("/api/v1/exercises/{exercise_id}/attempts/{attempt_id}")
def get_attempt(exercise_id: int, attempt_id: int, user_id: int):
    att = next((a for a in MOCK_ATTEMPTS if a["id"] == attempt_id and a["exercise_id"] == exercise_id and a["user_id"] == user_id), None)
    if not att:
        raise HTTPException(status_code=404, detail="Attempt not found")
    return att

@app.post("/api/v1/exercises/{exercise_id}/attempts/{attempt_id}/submit")
def submit_attempt(exercise_id: int, attempt_id: int, payload: AttemptSubmitRequest):
    att = next((a for a in MOCK_ATTEMPTS if a["id"] == attempt_id and a["exercise_id"] == exercise_id and a["user_id"] == payload.user_id), None)
    if not att:
        raise HTTPException(status_code=404, detail="Attempt not found")
    # simple scoring
    qmap = {q["id"]: q for q in MOCK_QUESTIONS if q["exercise_id"] == exercise_id}
    score = 0
    for ans in payload.answers:
        q = qmap.get(ans.question_id)
        if not q:
            continue
        if str(q.get("correct_answer")) == str(ans.answer):
            score += int(q.get("points", 1))
    att["answers"] = [a.dict() for a in payload.answers]
    att["submitted_at"] = datetime.now().isoformat()
    att["score"] = score
    return {"message": "submitted", "score": score, "attempt": att}

# Enrollment endpoints
@app.get("/api/v1/enrollments", response_model=List[Enrollment])
def get_enrollments(user_id: Optional[int] = None):
    if user_id:
        return [e for e in MOCK_ENROLLMENTS if e["user_id"] == user_id]
    return MOCK_ENROLLMENTS

@app.post("/api/v1/enrollments")
def enroll_course(user_id: int, course_id: int):
    # Check if already enrolled
    existing = next((e for e in MOCK_ENROLLMENTS if e["user_id"] == user_id and e["course_id"] == course_id), None)
    if existing:
        raise HTTPException(status_code=400, detail="Đã đăng ký khóa học này")
    
    new_enrollment = {
        "id": max([e["id"] for e in MOCK_ENROLLMENTS]) + 1,
        "user_id": user_id,
        "course_id": course_id,
        "enrolled_at": datetime.now().isoformat(),
        "progress": 0.0,
        "status": "active"
    }
    MOCK_ENROLLMENTS.append(new_enrollment)
    return new_enrollment

# Unenroll
@app.delete("/api/v1/enrollments")
def unenroll_course(user_id: int, course_id: int):
    idx = None
    for i, e in enumerate(MOCK_ENROLLMENTS):
        if e["user_id"] == user_id and e["course_id"] == course_id:
            idx = i
            break
    if idx is None:
        raise HTTPException(status_code=404, detail="Chưa đăng ký khóa học này")
    removed = MOCK_ENROLLMENTS.pop(idx)
    return {"message": "Đã hủy đăng ký", "enrollment": removed}

# Chat endpoints
@app.get("/api/v1/chat/sessions/{session_id}/messages", response_model=List[ChatMessage])
def get_chat_messages(session_id: str):
    messages = [m for m in MOCK_CHAT_MESSAGES if m["session_id"] == session_id]
    return messages

@app.post("/api/v1/chat/sessions/{session_id}/messages")
def send_chat_message(session_id: str, message: str, user_id: int):
    new_message = {
        "id": max([m["id"] for m in MOCK_CHAT_MESSAGES]) + 1,
        "user_id": user_id,
        "session_id": session_id,
        "message": message,
        "is_ai": False,
        "timestamp": datetime.now().isoformat()
    }
    MOCK_CHAT_MESSAGES.append(new_message)
    
    # Mock AI response
    ai_response = {
        "id": max([m["id"] for m in MOCK_CHAT_MESSAGES]) + 2,
        "user_id": user_id,
        "session_id": session_id,
        "message": f"Tôi hiểu câu hỏi của bạn về '{message}'. Đây là câu trả lời từ AI...",
        "is_ai": True,
        "timestamp": datetime.now().isoformat()
    }
    MOCK_CHAT_MESSAGES.append(ai_response)
    
    return {"message": "Tin nhắn đã được gửi", "ai_response": ai_response}

# Community endpoints
@app.get("/api/v1/community/posts", response_model=List[CommunityPost])
def get_community_posts(category: Optional[str] = None):
    if category:
        return [p for p in MOCK_COMMUNITY_POSTS if p["category"] == category]
    return MOCK_COMMUNITY_POSTS

@app.post("/api/v1/community/posts")
def create_community_post(title: str, content: str, author_id: int, category: str):
    new_post = {
        "id": max([p["id"] for p in MOCK_COMMUNITY_POSTS]) + 1,
        "title": title,
        "content": content,
        "author_id": author_id,
        "author_name": "User",  # Mock name
        "category": category,
        "created_at": datetime.now().isoformat(),
        "likes": 0,
        "comments_count": 0
    }
    MOCK_COMMUNITY_POSTS.append(new_post)
    return new_post

@app.get("/api/v1/community/posts/{post_id}")
def get_post_detail(post_id: int):
    post = next((p for p in MOCK_COMMUNITY_POSTS if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

class CreateCommentRequest(BaseModel):
    author_id: int
    author_name: str
    content: str

@app.get("/api/v1/community/posts/{post_id}/comments")
def get_post_comments(post_id: int):
    return [c for c in MOCK_COMMENTS if c["post_id"] == post_id]

@app.post("/api/v1/community/posts/{post_id}/comments")
def add_comment(post_id: int, payload: CreateCommentRequest):
    post = next((p for p in MOCK_COMMUNITY_POSTS if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    new_id = max([c["id"] for c in MOCK_COMMENTS] + [0]) + 1
    comment = {
        "id": new_id,
        "post_id": post_id,
        "author_id": payload.author_id,
        "author_name": payload.author_name,
        "content": payload.content,
        "created_at": datetime.now().isoformat()
    }
    MOCK_COMMENTS.append(comment)
    # update comments_count
    post["comments_count"] = post.get("comments_count", 0) + 1
    return comment

@app.post("/api/v1/community/posts/{post_id}/like")
def like_post(post_id: int):
    post = next((p for p in MOCK_COMMUNITY_POSTS if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post["likes"] = post.get("likes", 0) + 1
    return {"likes": post["likes"]}

# File upload endpoint
@app.post("/api/v1/upload")
async def upload_file(file: UploadFile = File(...)):
    # Mock file upload
    return {
        "filename": file.filename,
        "url": f"/uploads/{file.filename}",
        "size": 1024,  # Mock size
        "uploaded_at": datetime.now().isoformat()
    }

# Analytics endpoints
@app.get("/api/v1/analytics/dashboard")
def get_dashboard_analytics():
    return {
        "total_users": len(MOCK_USERS),
        "total_courses": len(MOCK_COURSES),
        "total_enrollments": len(MOCK_ENROLLMENTS),
        "active_sessions": 15,
        "revenue": 0.0,
        "completion_rate": 75.5
    }

@app.get("/api/v1/analytics/courses/{course_id}")
def get_course_analytics(course_id: int):
    enrollments = [e for e in MOCK_ENROLLMENTS if e["course_id"] == course_id]
    return {
        "course_id": course_id,
        "total_enrollments": len(enrollments),
        "average_progress": sum(e["progress"] for e in enrollments) / len(enrollments) if enrollments else 0,
        "completion_rate": len([e for e in enrollments if e["status"] == "completed"]) / len(enrollments) * 100 if enrollments else 0
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
