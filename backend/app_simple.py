from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
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

# --- Simple Assessments/Questions models (in-memory storage for demo) ---
class AssessmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    assessment_type: str = "quiz"
    subject_id: int = 0


class AssessmentCreate(AssessmentBase):
    created_by: int = 0


class Assessment(AssessmentBase):
    id: int
    created_by: int
    is_published: bool = False


class QuestionCreate(BaseModel):
    question_text: str
    question_type: str = "multiple_choice"
    options: Optional[List[str]] = None
    correct_answer: str
    explanation: Optional[str] = None
    points: float = 1.0


class Question(QuestionCreate):
    id: int
    assessment_id: int
    created_by: int = 0

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

# ---------------- Assessments & Questions (mock, in-memory) ---------------- #
_assessments: Dict[int, Assessment] = {}
_questions_by_assessment: Dict[int, Dict[int, Question]] = {}
_assessment_id_seq = 1
_question_id_seq = 1


@app.get("/api/v1/assessments", response_model=List[Assessment])
def list_assessments():
    return list(_assessments.values())


@app.post("/api/v1/assessments", response_model=Assessment)
def create_assessment(payload: AssessmentCreate):
    global _assessment_id_seq
    new_id = _assessment_id_seq
    _assessment_id_seq += 1
    assessment = Assessment(id=new_id, **payload.model_dump(), is_published=False)
    _assessments[new_id] = assessment
    _questions_by_assessment[new_id] = {}
    return assessment


@app.get("/api/v1/assessments/{assessment_id}", response_model=Assessment)
def get_assessment(assessment_id: int):
    assessment = _assessments.get(assessment_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return assessment


@app.get("/api/v1/assessments/{assessment_id}/questions", response_model=List[Question])
def list_questions(assessment_id: int):
    if assessment_id not in _assessments:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return list(_questions_by_assessment.get(assessment_id, {}).values())


@app.post("/api/v1/assessments/{assessment_id}/questions", response_model=Question)
def add_question(assessment_id: int, payload: QuestionCreate):
    global _question_id_seq
    if assessment_id not in _assessments:
        raise HTTPException(status_code=404, detail="Assessment not found")
    new_qid = _question_id_seq
    _question_id_seq += 1
    q = Question(id=new_qid, assessment_id=assessment_id, created_by=0, **payload.model_dump())
    _questions_by_assessment[assessment_id][new_qid] = q
    return q

# Test Results and Statistics Endpoints
class TestResultCreate(BaseModel):
    test_id: str
    test_title: str
    subject_id: Optional[str] = None
    subject_name: Optional[str] = None
    total_questions: int
    time_limit: Optional[int] = None
    max_attempts: Optional[int] = None
    passing_score: float = 60.0

class TestAnswer(BaseModel):
    question_id: str
    question_text: str
    selected_answer: Optional[str] = None
    selected_answers: List[str] = []
    is_correct: bool = False
    points_earned: float = 0.0
    time_spent: Optional[int] = None

class TestResultUpdate(BaseModel):
    answers: List[TestAnswer]
    time_taken: int
    status: str = "completed"

class TestResultResponse(BaseModel):
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

# Mock storage for test results
_test_results = {}
_test_result_id_seq = 1

@app.post("/api/v1/test-results/start", response_model=TestResultResponse)
def start_test(test_data: TestResultCreate):
    """Start a new test attempt"""
    global _test_result_id_seq
    
    # Mock user (in real app, get from authentication)
    user_id = "1"  # Mock user ID
    
    # Check max attempts (simplified)
    user_attempts = [r for r in _test_results.values() 
                    if r.user_id == user_id and r.test_id == test_data.test_id]
    
    if test_data.max_attempts and len(user_attempts) >= test_data.max_attempts:
        raise HTTPException(
            status_code=400,
            detail=f"Maximum attempts ({test_data.max_attempts}) exceeded"
        )
    
    # Create new test result
    result_id = str(_test_result_id_seq)
    _test_result_id_seq += 1
    
    test_result = TestResultResponse(
        id=result_id,
        user_id=user_id,
        test_id=test_data.test_id,
        test_title=test_data.test_title,
        subject_name=test_data.subject_name,
        total_questions=test_data.total_questions,
        answered_questions=0,
        correct_answers=0,
        total_points=float(test_data.total_questions),
        earned_points=0.0,
        percentage=0.0,
        time_taken=0,
        time_limit=test_data.time_limit,
        status="in_progress",
        is_passed=False,
        attempt_number=len(user_attempts) + 1,
        started_at=datetime.now()
    )
    
    _test_results[result_id] = test_result
    return test_result

@app.put("/api/v1/test-results/{result_id}/submit", response_model=TestResultResponse)
def submit_test(result_id: str, test_update: TestResultUpdate):
    """Submit test answers and calculate score"""
    if result_id not in _test_results:
        raise HTTPException(status_code=404, detail="Test result not found")
    
    test_result = _test_results[result_id]
    
    # Calculate score
    correct_answers = sum(1 for answer in test_update.answers if answer.is_correct)
    earned_points = sum(answer.points_earned for answer in test_update.answers)
    percentage = (earned_points / test_result.total_points) * 100 if test_result.total_points > 0 else 0
    is_passed = percentage >= 60.0  # Default passing score
    
    # Determine grade
    grade = "F"
    if percentage >= 90:
        grade = "A"
    elif percentage >= 80:
        grade = "B"
    elif percentage >= 70:
        grade = "C"
    elif percentage >= 60:
        grade = "D"
    
    # Update test result
    test_result.answers = test_update.answers
    test_result.answered_questions = len(test_update.answers)
    test_result.correct_answers = correct_answers
    test_result.earned_points = earned_points
    test_result.percentage = percentage
    test_result.grade = grade
    test_result.time_taken = test_update.time_taken
    test_result.completed_at = datetime.now()
    test_result.status = test_update.status
    test_result.is_passed = is_passed
    
    return test_result

@app.get("/api/v1/test-results/my-results", response_model=List[TestResultResponse])
def get_my_test_results(subject_id: Optional[str] = None):
    """Get current user's test results"""
    user_id = "1"  # Mock user ID
    
    results = [r for r in _test_results.values() if r.user_id == user_id]
    
    if subject_id:
        results = [r for r in results if r.subject_name == subject_id]
    
    # Sort by completion date (newest first)
    results.sort(key=lambda x: x.completed_at or x.started_at, reverse=True)
    
    return results

class StudentProgressResponse(BaseModel):
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

@app.get("/api/v1/test-results/my-progress", response_model=List[StudentProgressResponse])
def get_my_progress():
    """Get current user's learning progress"""
    user_id = "1"  # Mock user ID
    
    # Get user's completed tests
    user_results = [r for r in _test_results.values() 
                   if r.user_id == user_id and r.status == "completed"]
    
    # Group by subject
    subjects = {}
    for result in user_results:
        subject = result.subject_name or "General"
        if subject not in subjects:
            subjects[subject] = []
        subjects[subject].append(result)
    
    # Calculate progress for each subject
    progress_list = []
    for subject_name, results in subjects.items():
        scores = [r.percentage for r in results]
        
        progress = StudentProgressResponse(
            user_id=user_id,
            subject_id=subject_name.lower().replace(" ", "_"),
            subject_name=subject_name,
            total_tests=len(results),
            completed_tests=len(results),
            passed_tests=sum(1 for r in results if r.is_passed),
            average_score=sum(scores) / len(scores) if scores else 0,
            best_score=max(scores) if scores else 0,
            latest_score=scores[-1] if scores else 0,
            improvement_trend=0.0,  # Simplified
            total_study_time=sum(r.time_taken for r in results) // 60,  # Convert to minutes
            last_attempt=max(r.completed_at for r in results if r.completed_at) if results else None,
            weak_topics=[],
            strong_topics=[]
        )
        progress_list.append(progress)
    
    return progress_list

class InstructorStatsResponse(BaseModel):
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

@app.get("/api/v1/test-results/instructor-stats", response_model=InstructorStatsResponse)
def get_instructor_stats():
    """Get instructor statistics"""
    # Mock instructor stats
    completed_results = [r for r in _test_results.values() if r.status == "completed"]
    
    if completed_results:
        scores = [r.percentage for r in completed_results]
        average_score = sum(scores) / len(scores)
        pass_rate = (sum(1 for r in completed_results if r.is_passed) / len(completed_results)) * 100
    else:
        average_score = 0.0
        pass_rate = 0.0
    
    return InstructorStatsResponse(
        instructor_id="instructor_1",
        total_students=len(set(r.user_id for r in completed_results)),
        total_tests=len(set(r.test_id for r in completed_results)),
        total_attempts=len(completed_results),
        average_class_score=average_score,
        pass_rate=pass_rate,
        active_students_today=1,  # Mock
        active_students_week=3,   # Mock
        top_performers=[
            {"user_id": "1", "average_score": 95.0, "total_attempts": 5},
            {"user_id": "2", "average_score": 88.0, "total_attempts": 3}
        ],
        struggling_students=[
            {"user_id": "3", "average_score": 45.0, "total_attempts": 2}
        ],
        subject_performance=[
            {"subject": "Soft Skills", "average_score": 78.5, "total_attempts": 10}
        ]
    )

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
