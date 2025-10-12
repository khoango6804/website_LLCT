#!/usr/bin/env python3
"""
Test MongoDB API endpoints
"""
import requests
import json

def test_mongodb_api():
    base_url = "http://127.0.0.1:8000"
    
    print("🧪 Testing MongoDB API...")
    
    # Test 1: Health check
    try:
        response = requests.get(f"{base_url}/health", timeout=5)
        print(f"✅ Health check: {response.status_code}")
        print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return
    
    # Test 2: Register a new user
    test_user = {
        "email": "test@mongodb.com",
        "username": "testuser",
        "password": "testpass123",
        "full_name": "Test User",
        "is_instructor": False
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/v1/auth/register",
            json=test_user,
            timeout=10
        )
        print(f"✅ Register test: {response.status_code}")
        print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Register test failed: {e}")
    
    # Test 3: Login with the user
    try:
        login_data = {
            "email": "test@mongodb.com",
            "password": "testpass123"
        }
        response = requests.post(
            f"{base_url}/api/v1/auth/login",
            json=login_data,
            timeout=10
        )
        print(f"✅ Login test: {response.status_code}")
        print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Login test failed: {e}")

if __name__ == "__main__":
    test_mongodb_api()
