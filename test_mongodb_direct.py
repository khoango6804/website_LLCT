#!/usr/bin/env python3
"""
Direct MongoDB test
"""
import os
import sys
from pathlib import Path

# Add backend to path
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

# Set environment
os.environ["MONGODB_URL"] = "mongodb+srv://elearning_user:anhkhoadeptrai@cluster0.apfn5nb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
os.environ["MONGODB_DATABASE"] = "elearning_platform"
os.environ["SECRET_KEY"] = "your-secret-key-change-this-in-production-12345"

def test_mongodb_connection():
    try:
        print("Testing MongoDB connection...")
        
        # Test direct MongoDB connection
        from motor.motor_asyncio import AsyncIOMotorClient
        import asyncio
        
        async def test_connection():
            client = AsyncIOMotorClient(os.environ["MONGODB_URL"])
            db = client[os.environ["MONGODB_DATABASE"]]
            
            # Test connection
            await client.admin.command('ping')
            print("MongoDB connection successful!")
            
            # Test insert
            collection = db.users
            test_user = {
                "email": "test@direct.com",
                "username": "testuser",
                "full_name": "Test User",
                "is_instructor": False,
                "is_active": True
            }
            
            result = await collection.insert_one(test_user)
            print(f"Insert successful: {result.inserted_id}")
            
            # Test find
            user = await collection.find_one({"email": "test@direct.com"})
            print(f"Found user: {user}")
            
            # Clean up
            await collection.delete_one({"_id": result.inserted_id})
            print("Clean up successful")
            
            client.close()
        
        asyncio.run(test_connection())
        return True
        
    except Exception as e:
        print(f"MongoDB test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    test_mongodb_connection()
