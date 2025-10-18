"""
MongoDB Document Models using Beanie ODM
"""
from beanie import Document, Indexed, PydanticObjectId
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
    # is_instructor removed - all new users are students by default

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


# Test Result Models
class TestAnswer(BaseModel):
    """Individual answer for a test question"""
    question_id: str
    question_text: str
    selected_answer: Optional[str] = None
    selected_answers: List[str] = []  # For multiple choice questions
    is_correct: bool = False
    points_earned: float = 0.0
    time_spent: Optional[int] = None  # seconds spent on this question

class TestResult(Document):
    """Test result document"""
    user_id: str
    test_id: str
    test_title: str
    subject_id: Optional[str] = None
    subject_name: Optional[str] = None
    instructor_id: Optional[str] = None
    
    # Test details
    total_questions: int
    answered_questions: int
    correct_answers: int
    
    # Scoring
    total_points: float
    earned_points: float
    percentage: float
    grade: Optional[str] = None  # A, B, C, D, F
    
    # Timing
    time_limit: Optional[int] = None  # in minutes
    time_taken: int  # in seconds
    started_at: datetime
    completed_at: Optional[datetime] = None
    
    # Answers
    answers: List[TestAnswer] = []
    
    # Status
    status: str = "in_progress"  # in_progress, completed, submitted, graded
    is_passed: bool = False
    passing_score: float = 60.0
    
    # Metadata
    attempt_number: int = 1
    max_attempts: Optional[int] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "test_results"
        indexes = [
            "user_id",
            "test_id",
            "subject_id",
            "instructor_id",
            "status",
            "completed_at",
            "percentage",
            "is_passed",
            ("user_id", "test_id"),  # Compound index
            ("instructor_id", "completed_at"),  # For instructor stats
        ]

class TestStatistics(Document):
    """Aggregated test statistics"""
    test_id: str
    test_title: str
    instructor_id: str
    subject_id: Optional[str] = None
    
    # Participation stats
    total_attempts: int = 0
    unique_students: int = 0
    completed_attempts: int = 0
    
    # Score statistics
    average_score: float = 0.0
    highest_score: float = 0.0
    lowest_score: float = 0.0
    median_score: float = 0.0
    
    # Pass/Fail stats
    passed_count: int = 0
    failed_count: int = 0
    pass_rate: float = 0.0
    
    # Time statistics
    average_time: float = 0.0  # in minutes
    fastest_time: float = 0.0
    slowest_time: float = 0.0
    
    # Question analysis
    question_stats: List[dict] = []  # Per-question statistics
    
    # Last updated
    last_calculated: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "test_statistics"
        indexes = [
            "test_id",
            "instructor_id",
            "subject_id",
            "last_calculated"
        ]

class StudentProgress(Document):
    """Track student progress across subjects and tests"""
    user_id: str
    subject_id: str
    subject_name: str
    instructor_id: Optional[str] = None
    
    # Overall progress
    total_tests: int = 0
    completed_tests: int = 0
    passed_tests: int = 0
    failed_tests: int = 0
    
    # Score tracking
    average_score: float = 0.0
    best_score: float = 0.0
    latest_score: float = 0.0
    improvement_trend: float = 0.0  # Positive = improving, Negative = declining
    
    # Time tracking
    total_study_time: int = 0  # in minutes
    average_test_time: float = 0.0
    
    # Activity tracking
    first_attempt: Optional[datetime] = None
    last_attempt: Optional[datetime] = None
    streak_days: int = 0  # Consecutive days with activity
    
    # Weak areas (questions frequently missed)
    weak_topics: List[str] = []
    strong_topics: List[str] = []
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "student_progress"
        indexes = [
            "user_id",
            "subject_id",
            "instructor_id",
            ("user_id", "subject_id"),  # Compound index
            "last_attempt",
            "average_score"
        ]

# Pydantic models for API
class TestResultCreate(BaseModel):
    """Create test result"""
    test_id: str
    test_title: str
    subject_id: Optional[str] = None
    subject_name: Optional[str] = None
    total_questions: int
    time_limit: Optional[int] = None
    max_attempts: Optional[int] = None
    passing_score: float = 60.0

class TestResultUpdate(BaseModel):
    """Update test result"""
    answers: List[TestAnswer]
    time_taken: int
    status: str = "completed"

class TestResultResponse(BaseModel):
    """Test result response"""
    id: str
    user_id: str
    test_id: str
    test_title: str
    subject_name: Optional[str] = None
    total_questions: int
    answered_questions: int
    correct_answers: int
    total_points: float
    earned_points: float
    percentage: float
    grade: Optional[str] = None
    time_taken: int
    time_limit: Optional[int] = None
    status: str
    is_passed: bool
    attempt_number: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    answers: List[TestAnswer] = []

class StudentProgressResponse(BaseModel):
    """Student progress response"""
    user_id: str
    subject_id: str
    subject_name: str
    total_tests: int
    completed_tests: int
    passed_tests: int
    average_score: float
    best_score: float
    latest_score: float
    improvement_trend: float
    total_study_time: int
    last_attempt: Optional[datetime] = None
    weak_topics: List[str] = []
    strong_topics: List[str] = []

class InstructorStatsResponse(BaseModel):
    """Instructor statistics response"""
    instructor_id: str
    total_students: int
    total_tests: int
    total_attempts: int
    average_class_score: float
    pass_rate: float
    active_students_today: int
    active_students_week: int
    top_performers: List[dict] = []
    struggling_students: List[dict] = []
    subject_performance: List[dict] = []

# ===============================
# Library/Document Models
# ===============================

class DocumentType(str, Enum):
    """Document types in library"""
    TEXTBOOK = "textbook"           # Giáo trình
    LECTURE_NOTES = "lecture_notes" # Bài giảng
    REFERENCE = "reference"         # Tài liệu tham khảo
    EXERCISE = "exercise"           # Bài tập
    EXAM = "exam"                   # Đề thi
    PRESENTATION = "presentation"   # Slide thuyết trình
    VIDEO = "video"                 # Video bài giảng
    AUDIO = "audio"                 # Audio bài giảng
    OTHER = "other"                 # Khác

class DocumentStatus(str, Enum):
    """Document status"""
    DRAFT = "draft"                 # Nháp
    PUBLISHED = "published"         # Đã xuất bản
    ARCHIVED = "archived"           # Lưu trữ
    UNDER_REVIEW = "under_review"   # Đang xem xét

class LibraryDocument(Document):
    """Library document model"""
    title: str
    description: Optional[str] = None
    subject_code: str  # Mã môn học (MLN111, VNR202, etc.)
    subject_name: str  # Tên môn học
    document_type: DocumentType
    status: DocumentStatus = DocumentStatus.DRAFT
    
    # File information
    file_url: Optional[str] = None
    file_name: Optional[str] = None
    file_size: Optional[int] = None  # in bytes
    file_type: Optional[str] = None  # pdf, docx, pptx, etc.
    
    # Metadata
    author: str  # Tác giả/Giảng viên
    instructor_id: Optional[PydanticObjectId] = None  # Link to User
    tags: List[str] = []
    keywords: List[str] = []
    
    # Academic info
    semester: Optional[str] = None  # Học kỳ
    academic_year: Optional[str] = None  # Năm học
    chapter: Optional[str] = None  # Chương
    lesson: Optional[str] = None   # Bài học
    
    # Statistics
    download_count: int = 0
    view_count: int = 0
    rating: float = 0.0
    rating_count: int = 0
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    published_at: Optional[datetime] = None
    
    class Settings:
        name = "library_documents"
        indexes = [
            "subject_code",
            "document_type", 
            "status",
            "author",
            "instructor_id",
            [("subject_code", 1), ("document_type", 1)],
            [("status", 1), ("created_at", -1)]
        ]

class Subject(Document):
    """Subject/Course model"""
    code: str  # MLN111, VNR202, etc.
    name: str  # Tên môn học
    description: Optional[str] = None
    credits: int = 3
    
    # Academic info
    department: Optional[str] = None  # Khoa
    faculty: Optional[str] = None     # Viện
    prerequisite_subjects: List[str] = []  # Môn tiên quyết
    
    # Instructors
    primary_instructor_id: Optional[PydanticObjectId] = None
    instructors: List[PydanticObjectId] = []
    
    # Statistics
    total_documents: int = 0
    total_students: int = 0
    
    # Status
    is_active: bool = True
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "subjects"
        indexes = [
            "code",
            "is_active",
            "department",
            "primary_instructor_id"
        ]

# ===============================
# Pydantic Models for API
# ===============================

class LibraryDocumentCreate(BaseModel):
    """Create library document request"""
    title: str
    description: Optional[str] = None
    subject_code: str
    subject_name: str
    document_type: DocumentType
    author: str
    tags: List[str] = []
    keywords: List[str] = []
    semester: Optional[str] = None
    academic_year: Optional[str] = None
    chapter: Optional[str] = None
    lesson: Optional[str] = None

class LibraryDocumentUpdate(BaseModel):
    """Update library document request"""
    title: Optional[str] = None
    description: Optional[str] = None
    subject_code: Optional[str] = None
    subject_name: Optional[str] = None
    document_type: Optional[DocumentType] = None
    status: Optional[DocumentStatus] = None
    author: Optional[str] = None
    tags: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    semester: Optional[str] = None
    academic_year: Optional[str] = None
    chapter: Optional[str] = None
    lesson: Optional[str] = None

class LibraryDocumentResponse(BaseModel):
    """Library document response"""
    id: str
    title: str
    description: Optional[str]
    subject_code: str
    subject_name: str
    document_type: DocumentType
    status: DocumentStatus
    file_url: Optional[str]
    file_name: Optional[str]
    file_size: Optional[int]
    file_type: Optional[str]
    author: str
    instructor_id: Optional[str]
    tags: List[str]
    keywords: List[str]
    semester: Optional[str]
    academic_year: Optional[str]
    chapter: Optional[str]
    lesson: Optional[str]
    download_count: int
    view_count: int
    rating: float
    rating_count: int
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime]

class SubjectCreate(BaseModel):
    """Create subject request"""
    code: str
    name: str
    description: Optional[str] = None
    credits: int = 3
    department: Optional[str] = None
    faculty: Optional[str] = None
    prerequisite_subjects: List[str] = []

class SubjectUpdate(BaseModel):
    """Update subject request"""
    name: Optional[str] = None
    description: Optional[str] = None
    credits: Optional[int] = None
    department: Optional[str] = None
    faculty: Optional[str] = None
    prerequisite_subjects: Optional[List[str]] = None
    is_active: Optional[bool] = None

class SubjectResponse(BaseModel):
    """Subject response"""
    id: str
    code: str
    name: str
    description: Optional[str]
    credits: int
    department: Optional[str]
    faculty: Optional[str]
    prerequisite_subjects: List[str]
    primary_instructor_id: Optional[str]
    instructors: List[str]
    total_documents: int
    total_students: int
    is_active: bool
    created_at: datetime
    updated_at: datetime