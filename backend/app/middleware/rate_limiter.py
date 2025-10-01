from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from typing import Callable
import time
import logging
from ..services.redis_service import redis_service
from ..core.config import settings

logger = logging.getLogger(__name__)


class RateLimiter:
    def __init__(self, requests: int = 100, window: int = 3600):
        self.requests = requests
        self.window = window

    def __call__(self, request: Request, call_next: Callable):
        # Get client identifier
        client_id = self._get_client_id(request)
        
        # Check rate limit
        rate_limit_key = f"rate_limit:{client_id}"
        rate_limit_result = redis_service.check_rate_limit(
            rate_limit_key, 
            self.requests, 
            self.window
        )
        
        if not rate_limit_result["allowed"]:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "detail": "Rate limit exceeded",
                    "limit": rate_limit_result["limit"],
                    "remaining": rate_limit_result["remaining"],
                    "reset_time": rate_limit_result["reset_time"]
                },
                headers={
                    "X-RateLimit-Limit": str(rate_limit_result["limit"]),
                    "X-RateLimit-Remaining": str(rate_limit_result["remaining"]),
                    "X-RateLimit-Reset": str(rate_limit_result["reset_time"])
                }
            )
        
        # Add rate limit headers to response
        response = call_next(request)
        response.headers["X-RateLimit-Limit"] = str(rate_limit_result["limit"])
        response.headers["X-RateLimit-Remaining"] = str(rate_limit_result["remaining"])
        response.headers["X-RateLimit-Reset"] = str(rate_limit_result["reset_time"])
        
        return response

    def _get_client_id(self, request: Request) -> str:
        """Get unique client identifier"""
        # Try to get user ID from token first
        user_id = getattr(request.state, "user_id", None)
        if user_id:
            return f"user:{user_id}"
        
        # Fall back to IP address
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            client_ip = forwarded_for.split(",")[0].strip()
        else:
            client_ip = request.client.host if request.client else "unknown"
        
        return f"ip:{client_ip}"


class ChatRateLimiter:
    def __init__(self, requests: int = 50, window: int = 3600):
        self.requests = requests
        self.window = window

    def __call__(self, request: Request, call_next: Callable):
        # Only apply to chat endpoints
        if not request.url.path.startswith("/api/v1/chat"):
            return call_next(request)
        
        # Get user ID (should be available from auth middleware)
        user_id = getattr(request.state, "user_id", None)
        if not user_id:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Authentication required"}
            )
        
        # Check chat rate limit
        rate_limit_key = f"chat_rate_limit:user:{user_id}"
        rate_limit_result = redis_service.check_rate_limit(
            rate_limit_key, 
            self.requests, 
            self.window
        )
        
        if not rate_limit_result["allowed"]:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "detail": "Chat rate limit exceeded",
                    "limit": rate_limit_result["limit"],
                    "remaining": rate_limit_result["remaining"],
                    "reset_time": rate_limit_result["reset_time"]
                }
            )
        
        return call_next(request)


class AIRateLimiter:
    def __init__(self, requests: int = 20, window: int = 3600):
        self.requests = requests
        self.window = window

    def __call__(self, request: Request, call_next: Callable):
        # Only apply to AI endpoints
        if not any(request.url.path.startswith(path) for path in ["/api/v1/chat", "/api/v1/ai"]):
            return call_next(request)
        
        # Get user ID
        user_id = getattr(request.state, "user_id", None)
        if not user_id:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Authentication required"}
            )
        
        # Check AI rate limit
        rate_limit_key = f"ai_rate_limit:user:{user_id}"
        rate_limit_result = redis_service.check_rate_limit(
            rate_limit_key, 
            self.requests, 
            self.window
        )
        
        if not rate_limit_result["allowed"]:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "detail": "AI request rate limit exceeded",
                    "limit": rate_limit_result["limit"],
                    "remaining": rate_limit_result["remaining"],
                    "reset_time": rate_limit_result["reset_time"]
                }
            )
        
        return call_next(request)


# Rate limiter instances
rate_limiter = RateLimiter(
    requests=settings.RATE_LIMIT_REQUESTS,
    window=settings.RATE_LIMIT_WINDOW
)

chat_rate_limiter = ChatRateLimiter(
    requests=settings.CHAT_RATE_LIMIT,
    window=settings.RATE_LIMIT_WINDOW
)

ai_rate_limiter = AIRateLimiter(
    requests=settings.AI_RATE_LIMIT,
    window=settings.RATE_LIMIT_WINDOW
)
