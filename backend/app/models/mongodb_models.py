"""
MongoDB Document Models using Beanie ODM
"""
from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    INSTRUCTOR = "instructor"
    STUDENT = "student"

class User(Document):
    """User document model"""
    email: Indexed(EmailStr, unique=True)
    username: Indexed(str, unique=True)
    full_name: str
    hashed_password: str
    is_active: bool = True
    is_superuser: bool = False
    is_instructor: bool = False
    role: UserRole = UserRole.STUDENT
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None
    
    class Settings:
        name = "users"
        indexes = [
            "email",
            "username", 
            "role",
            "is_active"
        ]

class Course(Document):
    """Course document model"""
    title: str
    description: str
    subject_code: str  # e.g., MLN111, MLN122
    instructor_id: str  # User ID
    thumbnail_url: Optional[str] = None
    is_published: bool = False
    enrollment_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "courses"
        indexes = [
            "subject_code",
            "instructor_id",
            "is_published"
        ]

class Lesson(Document):
    """Lesson document model"""
    title: str
    content: str
    course_id: str  # Course ID
    order: int
    duration_minutes: int
    video_url: Optional[str] = None
    materials: List[Dict[str, Any]] = []  # List of file attachments
    is_published: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "lessons"
        indexes = [
            "course_id",
            "order",
            "is_published"
        ]

class Exercise(Document):
    """Exercise/Test document model"""
    title: str
    description: str
    course_id: str  # Course ID
    lesson_id: Optional[str] = None  # Optional lesson ID
    exercise_type: str  # "quiz", "assignment", "test"
    questions: List[Dict[str, Any]] = []  # List of questions
    time_limit_minutes: Optional[int] = None
    max_attempts: int = 1
    passing_score: float = 0.0
    is_published: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "exercises"
        indexes = [
            "course_id",
            "lesson_id",
            "exercise_type",
            "is_published"
        ]

class ExerciseSubmission(Document):
    """Exercise submission document model"""
    exercise_id: str  # Exercise ID
    student_id: str  # User ID
    answers: List[Dict[str, Any]] = []  # Student answers
    score: Optional[float] = None
    time_taken_minutes: Optional[int] = None
    is_completed: bool = False
    submitted_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "exercise_submissions"
        indexes = [
            "exercise_id",
            "student_id",
            "is_completed"
        ]

class ChatSession(Document):
    """Chat session document model"""
    user_id: str  # User ID
    session_type: str  # "learning", "debate", "qa"
    messages: List[Dict[str, Any]] = []  # Chat messages
    subject_filter: Optional[str] = None  # Course subject filter
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "chat_sessions"
        indexes = [
            "user_id",
            "session_type",
            "is_active"
        ]

class News(Document):
    """News/Article document model"""
    title: str
    content: str
    author_id: str  # User ID
    thumbnail_url: Optional[str] = None
    tags: List[str] = []
    is_published: bool = False
    view_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "news"
        indexes = [
            "author_id",
            "is_published",
            "created_at"
        ]

class Assessment(Document):
    """Assessment/Test result document model"""
    user_id: str  # User ID
    exercise_id: str  # Exercise ID
    score: float
    total_questions: int
    correct_answers: int
    time_taken_minutes: int
    answers: List[Dict[str, Any]] = []  # User answers with correct/incorrect
    completed_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "assessments"
        indexes = [
            "user_id",
            "exercise_id",
            "completed_at"
        ]

class Enrollment(Document):
    """Course enrollment document model"""
    user_id: str  # User ID
    course_id: str  # Course ID
    enrolled_at: datetime = Field(default_factory=datetime.utcnow)
    progress_percentage: float = 0.0
    is_completed: bool = False
    completed_at: Optional[datetime] = None
    
    class Settings:
        name = "enrollments"
        indexes = [
            "user_id",
            "course_id",
            "is_completed"
        ]

# Pydantic models for API requests/responses
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    password: str
    is_instructor: bool = False

class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    full_name: str
    role: UserRole
    is_active: bool
    avatar_url: Optional[str] = None
    created_at: datetime

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse
