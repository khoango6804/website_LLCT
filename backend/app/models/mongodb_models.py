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
    subject_code: Optional[str] = None  # Subject code like MLN111, MLN122, etc.
    subject_name: Optional[str] = None  # Subject name
    lesson_id: Optional[str] = None  # Optional lesson ID
    exercise_type: str  # "quiz", "assignment", "test"
    questions: List[Dict[str, Any]] = []  # List of questions
    time_limit_minutes: Optional[int] = None
    max_attempts: int = 1
    passing_score: float = 0.0
    is_published: bool = False
    created_by: Optional[str] = None  # User ID who created this
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "exercises"
        indexes = [
            "course_id",
            "subject_code",
            "lesson_id",
            "exercise_type",
            "is_published",
            "created_by"
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

class AssessmentResult(Document):
    """Assessment result document model for storing student scores"""
    student_id: str  # User ID
    student_name: str  # Student name for easy reference
    assessment_id: str  # Exercise (Assessment) ID
    assessment_title: str  # Assessment title for easy reference
    subject_code: Optional[str] = None  # Subject code (MLN111, etc.)
    subject_name: Optional[str] = None  # Subject name
    answers: Dict[str, str] = {}  # Question ID -> Answer mapping
    score: float = 0.0  # Score out of 100
    correct_answers: int = 0  # Number of correct answers
    total_questions: int = 0  # Total number of questions
    time_taken: int = 0  # Time taken in seconds
    max_time: Optional[int] = None  # Maximum allowed time in seconds
    attempt_number: int = 1  # Which attempt this is (1st, 2nd, etc.)
    is_completed: bool = True  # Whether the assessment was completed
    completed_at: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "assessment_results"
        indexes = [
            "student_id",
            "assessment_id",
            "subject_code",
            "completed_at",
            "score"
        ]

class AssessmentResultCreate(BaseModel):
    """Pydantic model for creating assessment results"""
    student_id: str
    student_name: str
    assessment_id: str
    assessment_title: str
    subject_code: Optional[str] = None
    subject_name: Optional[str] = None
    answers: Dict[str, str] = {}
    score: float = 0.0
    correct_answers: int = 0
    total_questions: int = 0
    time_taken: int = 0
    max_time: Optional[int] = None

# Product Models
class ProductType(str, Enum):
    """Product type enum"""
    WEBSITE = "website"
    MOBILE_APP = "mobile-app"
    WEB_SYSTEM = "web-system"
    PRESENTATION = "presentation"
    VIDEO = "video"
    DOCUMENT = "document"

class Product(Document):
    """Student learning product document model"""
    title: str
    description: str
    subject: str  # Subject code like MLN111
    subject_name: str  # Full subject name
    group: str  # Group name like "Nhóm 1"
    members: List[str]  # List of group member names
    instructor: str  # Instructor name
    semester: str  # Semester like "HK1 2024-2025"
    type: ProductType
    technologies: List[str]  # Technologies used
    file_url: Optional[str] = None  # GitHub, Drive, etc.
    demo_url: Optional[str] = None  # Demo/live URL
    downloads: int = 0  # Download count
    views: int = 0  # View count
    submitted_date: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "products"
        indexes = [
            "subject",
            "type",
            "group",
            "instructor",
            "semester",
            "submitted_date"
        ]

class ProductCreate(BaseModel):
    """Pydantic model for creating products"""
    title: str
    description: str
    subject: str
    subject_name: str
    group: str
    members: List[str]
    instructor: str
    semester: str = "HK1 2024-2025"
    type: ProductType
    technologies: List[str]
    file_url: Optional[str] = None
    demo_url: Optional[str] = None

class ProductUpdate(BaseModel):
    """Pydantic model for updating products"""
    title: Optional[str] = None
    description: Optional[str] = None
    subject: Optional[str] = None
    subject_name: Optional[str] = None
    group: Optional[str] = None
    members: Optional[List[str]] = None
    instructor: Optional[str] = None
    semester: Optional[str] = None
    type: Optional[ProductType] = None
    technologies: Optional[List[str]] = None
    file_url: Optional[str] = None
    demo_url: Optional[str] = None

class ProductResponse(BaseModel):
    """Pydantic model for product response"""
    id: str
    title: str
    description: str
    subject: str
    subject_name: str
    group: str
    members: List[str]
    instructor: str
    semester: str
    type: ProductType
    technologies: List[str]
    file_url: Optional[str] = None
    demo_url: Optional[str] = None
    downloads: int = 0
    views: int = 0
    submitted_date: datetime
    created_at: datetime
    updated_at: datetime

# News Models
class NewsStatus(str, Enum):
    """News status enum"""
    DRAFT = "draft"
    PUBLISHED = "published"
    HIDDEN = "hidden"
    ARCHIVED = "archived"

class NewsMedia(BaseModel):
    """News media (images/videos) model"""
    type: str  # "image" or "video"
    url: str
    filename: str
    size: Optional[int] = None
    alt_text: Optional[str] = None

class News(Document):
    """News article document model"""
    title: str
    slug: str  # URL-friendly version of title
    content: str  # HTML content
    excerpt: Optional[str] = None  # Short description
    author_id: str  # Admin user ID
    author_name: str  # Admin user name
    status: NewsStatus = NewsStatus.DRAFT
    featured_image: Optional[str] = None  # Main image URL
    media: List[NewsMedia] = []  # Additional images/videos
    tags: List[str] = []  # Tags for categorization
    views: int = 0  # View count
    likes: int = 0  # Like count
    is_featured: bool = False  # Featured on homepage
    published_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "news"
        indexes = [
            "author_id",
            "status",
            "published_at",
            "is_featured",
            "slug",
            "tags"
        ]

class NewsCreate(BaseModel):
    """Pydantic model for creating news"""
    title: str
    content: str
    excerpt: Optional[str] = None
    status: NewsStatus = NewsStatus.DRAFT
    featured_image: Optional[str] = None
    media: List[NewsMedia] = []
    tags: List[str] = []
    is_featured: bool = False

class NewsUpdate(BaseModel):
    """Pydantic model for updating news"""
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    status: Optional[NewsStatus] = None
    featured_image: Optional[str] = None
    media: Optional[List[NewsMedia]] = None
    tags: Optional[List[str]] = None
    is_featured: Optional[bool] = None

class NewsResponse(BaseModel):
    """Pydantic model for news response"""
    id: str
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    author_id: str
    author_name: str
    status: NewsStatus
    featured_image: Optional[str] = None
    media: List[NewsMedia] = []
    tags: List[str] = []
    views: int = 0
    likes: int = 0
    is_featured: bool = False
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
