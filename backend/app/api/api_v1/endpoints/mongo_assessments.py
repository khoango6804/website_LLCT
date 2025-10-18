from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional

from app.models.mongodb_models import Exercise
from app.api.api_v1.endpoints.mongodb_auth import get_current_user

router = APIRouter()


class AssessmentCreate(BaseModel):
    title: str
    description: Optional[str] = None
    course_id: Optional[str] = None
    lesson_id: Optional[str] = None
    exercise_type: str = "quiz"
    time_limit_minutes: Optional[int] = None
    max_attempts: int = 1
    passing_score: float = 0.0


class QuestionCreate(BaseModel):
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: str
    explanation: Optional[str] = None
    points: float = 1.0


@router.get("/", response_model=List[Exercise])
async def list_assessments(skip: int = 0, limit: int = 50, subject_code: Optional[str] = None, published_only: bool = False):
    query = {}
    if subject_code:
        query["subject_code"] = subject_code
    if published_only:
        query["is_published"] = True
    
    if query:
        return await Exercise.find(query).skip(skip).limit(limit).to_list()
    else:
        return await Exercise.find_all().skip(skip).limit(limit).to_list()


@router.post("/", response_model=Exercise)
async def create_assessment(payload: AssessmentCreate, current_user = Depends(get_current_user)):
    exercise = Exercise(
        title=payload.title,
        description=payload.description or "",
        course_id=payload.course_id or "",
        lesson_id=payload.lesson_id,
        exercise_type=payload.exercise_type,
        questions=[],
        time_limit_minutes=payload.time_limit_minutes,
        max_attempts=payload.max_attempts,
        passing_score=payload.passing_score,
        is_published=False,
    )
    await exercise.insert()
    return exercise

# Also expose the same handlers without trailing slash to avoid 404 from clients
@router.get("", response_model=List[Exercise])
async def list_assessments_no_slash(skip: int = 0, limit: int = 50, subject_code: Optional[str] = None, published_only: bool = False):
    return await list_assessments(skip, limit, subject_code, published_only)

@router.post("", response_model=Exercise)
async def create_assessment_no_slash(payload: AssessmentCreate, current_user = Depends(get_current_user)):
    return await create_assessment(payload, current_user)


@router.get("/{exercise_id}", response_model=Exercise)
async def get_assessment(exercise_id: str):
    exercise = await Exercise.get(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return exercise


@router.get("/{exercise_id}/questions", response_model=List[dict])
async def list_questions(exercise_id: str):
    exercise = await Exercise.get(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return exercise.questions or []


@router.post("/{exercise_id}/questions", response_model=dict)
async def add_question(exercise_id: str, payload: QuestionCreate):
    exercise = await Exercise.get(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Assessment not found")
    question = {
        "question_text": payload.question_text,
        "options": payload.options,
        "correct_answer": payload.correct_answer,
        "explanation": payload.explanation,
        "points": payload.points,
    }
    questions = exercise.questions or []
    questions.append(question)
    exercise.questions = questions
    await exercise.save()
    return question


class AssessmentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_published: Optional[bool] = None
    subject_code: Optional[str] = None
    subject_name: Optional[str] = None
    time_limit_minutes: Optional[int] = None
    max_attempts: Optional[int] = None


@router.patch("/{exercise_id}", response_model=Exercise)
async def update_assessment(exercise_id: str, payload: AssessmentUpdate):
    exercise = await Exercise.get(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Assessment not found")
    if payload.title is not None:
        exercise.title = payload.title
    if payload.description is not None:
        exercise.description = payload.description
    if payload.is_published is not None:
        exercise.is_published = payload.is_published
    if payload.subject_code is not None:
        exercise.subject_code = payload.subject_code
    if payload.subject_name is not None:
        exercise.subject_name = payload.subject_name
    if payload.time_limit_minutes is not None:
        exercise.time_limit_minutes = payload.time_limit_minutes
    if payload.max_attempts is not None:
        exercise.max_attempts = payload.max_attempts
    await exercise.save()
    return exercise


@router.delete("/{exercise_id}", response_model=dict)
async def delete_assessment(exercise_id: str):
    exercise = await Exercise.get(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Assessment not found")
    await exercise.delete()
    return {"ok": True}


class QuestionUpdate(BaseModel):
    question_text: Optional[str] = None
    options: Optional[List[str]] = None
    correct_answer: Optional[str] = None
    explanation: Optional[str] = None
    points: Optional[float] = None


@router.patch("/{exercise_id}/questions/{index}", response_model=dict)
async def update_question(exercise_id: str, index: int, payload: QuestionUpdate):
    exercise = await Exercise.get(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Assessment not found")
    questions = exercise.questions or []
    if index < 0 or index >= len(questions):
        raise HTTPException(status_code=404, detail="Question not found")
    q = questions[index]
    if payload.question_text is not None:
        q["question_text"] = payload.question_text
    if payload.options is not None:
        q["options"] = payload.options
    if payload.correct_answer is not None:
        q["correct_answer"] = payload.correct_answer
    if payload.explanation is not None:
        q["explanation"] = payload.explanation
    if payload.points is not None:
        q["points"] = payload.points
    questions[index] = q
    exercise.questions = questions
    await exercise.save()
    return q


@router.delete("/{exercise_id}/questions/{index}", response_model=dict)
async def delete_question(exercise_id: str, index: int):
    exercise = await Exercise.get(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Assessment not found")
    questions = exercise.questions or []
    if index < 0 or index >= len(questions):
        raise HTTPException(status_code=404, detail="Question not found")
    removed = questions.pop(index)
    exercise.questions = questions
    await exercise.save()
    return {"ok": True, "removed": removed}

