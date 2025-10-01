import redis
import json
import logging
from typing import Any, Optional, Dict, List
from datetime import timedelta
from ..core.config import settings

logger = logging.getLogger(__name__)


class RedisService:
    def __init__(self):
        try:
            self.redis_client = redis.from_url(
                settings.REDIS_URL,
                decode_responses=True,
                socket_connect_timeout=5,
                socket_timeout=5,
                retry_on_timeout=True
            )
            # Test connection
            self.redis_client.ping()
            logger.info("Redis connection established")
        except Exception as e:
            logger.error(f"Failed to connect to Redis: {e}")
            self.redis_client = None

    def is_connected(self) -> bool:
        """Check if Redis is connected"""
        if not self.redis_client:
            return False
        try:
            self.redis_client.ping()
            return True
        except:
            return False

    def set_cache(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Set cache value with optional TTL"""
        if not self.is_connected():
            return False
        
        try:
            ttl = ttl or settings.REDIS_CACHE_TTL
            serialized_value = json.dumps(value)
            self.redis_client.setex(key, ttl, serialized_value)
            return True
        except Exception as e:
            logger.error(f"Error setting cache {key}: {e}")
            return False

    def get_cache(self, key: str) -> Optional[Any]:
        """Get cache value"""
        if not self.is_connected():
            return None
        
        try:
            value = self.redis_client.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error(f"Error getting cache {key}: {e}")
            return None

    def delete_cache(self, key: str) -> bool:
        """Delete cache value"""
        if not self.is_connected():
            return False
        
        try:
            self.redis_client.delete(key)
            return True
        except Exception as e:
            logger.error(f"Error deleting cache {key}: {e}")
            return False

    def increment_rate_limit(self, key: str, window: int = 3600) -> int:
        """Increment rate limit counter"""
        if not self.is_connected():
            return 0
        
        try:
            # Use sliding window rate limiting
            current_time = int(self.redis_client.time()[0])
            window_start = current_time - window
            
            # Remove old entries
            self.redis_client.zremrangebyscore(key, 0, window_start)
            
            # Add current request
            self.redis_client.zadd(key, {str(current_time): current_time})
            
            # Set expiry
            self.redis_client.expire(key, window)
            
            # Count requests in window
            return self.redis_client.zcard(key)
            
        except Exception as e:
            logger.error(f"Error incrementing rate limit {key}: {e}")
            return 0

    def check_rate_limit(self, key: str, limit: int, window: int = 3600) -> Dict[str, Any]:
        """Check if rate limit is exceeded"""
        current_count = self.increment_rate_limit(key, window)
        
        return {
            "allowed": current_count <= limit,
            "current_count": current_count,
            "limit": limit,
            "remaining": max(0, limit - current_count),
            "reset_time": window
        }

    def set_user_session(self, user_id: int, session_data: Dict[str, Any], ttl: int = 3600) -> bool:
        """Set user session data"""
        key = f"session:user:{user_id}"
        return self.set_cache(key, session_data, ttl)

    def get_user_session(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Get user session data"""
        key = f"session:user:{user_id}"
        return self.get_cache(key)

    def delete_user_session(self, user_id: int) -> bool:
        """Delete user session"""
        key = f"session:user:{user_id}"
        return self.delete_cache(key)

    def set_chat_context(self, session_id: int, context: str, ttl: int = 1800) -> bool:
        """Set chat context for RAG"""
        key = f"chat_context:{session_id}"
        return self.set_cache(key, context, ttl)

    def get_chat_context(self, session_id: int) -> Optional[str]:
        """Get chat context"""
        key = f"chat_context:{session_id}"
        return self.get_cache(key)

    def set_debate_presence(self, room_id: int, user_id: int, presence_data: Dict[str, Any]) -> bool:
        """Set user presence in debate room"""
        key = f"debate_presence:{room_id}:{user_id}"
        return self.set_cache(key, presence_data, 300)  # 5 minutes TTL

    def get_debate_participants(self, room_id: int) -> List[Dict[str, Any]]:
        """Get all participants in debate room"""
        if not self.is_connected():
            return []
        
        try:
            pattern = f"debate_presence:{room_id}:*"
            keys = self.redis_client.keys(pattern)
            participants = []
            
            for key in keys:
                user_id = key.split(":")[-1]
                presence_data = self.get_cache(key)
                if presence_data:
                    presence_data["user_id"] = int(user_id)
                    participants.append(presence_data)
            
            return participants
        except Exception as e:
            logger.error(f"Error getting debate participants: {e}")
            return []

    def clear_debate_presence(self, room_id: int, user_id: int) -> bool:
        """Clear user presence from debate room"""
        key = f"debate_presence:{room_id}:{user_id}"
        return self.delete_cache(key)

    def set_search_cache(self, query: str, results: List[Dict[str, Any]], ttl: int = 600) -> bool:
        """Cache search results"""
        key = f"search:{hash(query)}"
        return self.set_cache(key, results, ttl)

    def get_search_cache(self, query: str) -> Optional[List[Dict[str, Any]]]:
        """Get cached search results"""
        key = f"search:{hash(query)}"
        return self.get_cache(key)

    def invalidate_user_cache(self, user_id: int) -> bool:
        """Invalidate all cache entries for a user"""
        if not self.is_connected():
            return False
        
        try:
            # Get all keys for user
            patterns = [
                f"session:user:{user_id}",
                f"user_data:{user_id}",
                f"user_permissions:{user_id}",
                f"debate_presence:*:{user_id}"
            ]
            
            for pattern in patterns:
                keys = self.redis_client.keys(pattern)
                if keys:
                    self.redis_client.delete(*keys)
            
            return True
        except Exception as e:
            logger.error(f"Error invalidating user cache: {e}")
            return False

    def get_cache_stats(self) -> Dict[str, Any]:
        """Get Redis cache statistics"""
        if not self.is_connected():
            return {"connected": False}
        
        try:
            info = self.redis_client.info()
            return {
                "connected": True,
                "used_memory": info.get("used_memory_human"),
                "connected_clients": info.get("connected_clients"),
                "total_commands_processed": info.get("total_commands_processed"),
                "keyspace_hits": info.get("keyspace_hits"),
                "keyspace_misses": info.get("keyspace_misses")
            }
        except Exception as e:
            logger.error(f"Error getting cache stats: {e}")
            return {"connected": False, "error": str(e)}


# Global instance
redis_service = RedisService()
