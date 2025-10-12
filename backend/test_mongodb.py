"""
Test MongoDB connection
"""
import asyncio
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Load environment variables
load_dotenv()

async def test_mongodb_connection():
    """Test MongoDB connection"""
    try:
        # Get MongoDB configuration
        mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        database_name = os.getenv("MONGODB_DATABASE", "elearning_platform")
        username = os.getenv("MONGODB_USERNAME")
        password = os.getenv("MONGODB_PASSWORD")
        auth_source = os.getenv("MONGODB_AUTH_SOURCE", "admin")
        
        print(f"🔗 Testing MongoDB connection...")
        print(f"URL: {mongodb_url}")
        print(f"Database: {database_name}")
        
        # Build connection string
        if username and password:
            connection_string = f"mongodb://{username}:{password}@{mongodb_url.split('://')[1]}/{database_name}?authSource={auth_source}"
        else:
            connection_string = f"{mongodb_url}/{database_name}"
        
        # Create client
        client = AsyncIOMotorClient(connection_string)
        database = client[database_name]
        
        # Test connection
        await client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        # Test database operations
        collection = database.test_collection
        test_doc = {"test": "Hello MongoDB!", "timestamp": "2024-01-01"}
        
        # Insert test document
        result = await collection.insert_one(test_doc)
        print(f"✅ Insert test document: {result.inserted_id}")
        
        # Find test document
        found_doc = await collection.find_one({"test": "Hello MongoDB!"})
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
        print("1. Check if MongoDB is running")
        print("2. Verify connection string in .env file")
        print("3. Check username/password if using authentication")
        print("4. Ensure network connectivity for Atlas")
        return False

if __name__ == "__main__":
    asyncio.run(test_mongodb_connection())
