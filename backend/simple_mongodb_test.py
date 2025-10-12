"""
Simple MongoDB connection test
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient

async def test_mongodb():
    """Test MongoDB connection"""
    try:
        # Connection string from MongoDB Atlas
        connection_string = "mongodb+srv://elearning_user:anhkhoadeptrai@cluster0.apfn5nb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        
        print("🔗 Testing MongoDB Atlas connection...")
        print(f"Connection string: {connection_string.replace('anhkhoadeptrai', '***')}")
        
        # Create client
        client = AsyncIOMotorClient(connection_string)
        database = client.elearning_platform
        
        # Test connection
        await client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        # Test database operations
        collection = database.test_collection
        test_doc = {"test": "Hello MongoDB Atlas!", "timestamp": "2024-01-01"}
        
        # Insert test document
        result = await collection.insert_one(test_doc)
        print(f"✅ Insert test document: {result.inserted_id}")
        
        # Find test document
        found_doc = await collection.find_one({"test": "Hello MongoDB Atlas!"})
        print(f"✅ Found test document: {found_doc}")
        
        # Clean up
        await collection.delete_one({"_id": result.inserted_id})
        print("✅ Cleaned up test document")
        
        # Close connection
        client.close()
        print("✅ MongoDB connection test completed successfully!")
        
        return True
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        print("\n🔧 Troubleshooting tips:")
        print("1. Check if MongoDB Atlas cluster is running")
        print("2. Verify username/password")
        print("3. Check network access in Atlas (IP whitelist)")
        print("4. Ensure cluster is accessible from your IP")
        return False

if __name__ == "__main__":
    asyncio.run(test_mongodb())
