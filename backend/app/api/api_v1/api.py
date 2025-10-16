from fastapi import APIRouter
from .endpoints import users, courses, auth, chat, assessments
from .endpoints import mongo_assessments

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(courses.router, prefix="/courses", tags=["courses"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat & ai"])
api_router.include_router(assessments.router, prefix="/assessments", tags=["assessments"])
api_router.include_router(mongo_assessments.router, prefix="/mongo/assessments", tags=["mongo-assessments"])
