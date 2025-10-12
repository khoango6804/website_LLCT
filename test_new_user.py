#!/usr/bin/env python3
"""
Test new user registration and login
"""
import requests
import json

def test_new_user():
    base_url = "http://127.0.0.1:8000"
    
    print("Testing new user registration and login...")
    
    # Test with new email
    import time
    timestamp = str(int(time.time()))
    test_user = {
        "email": f"newuser{timestamp}@mongodb.com",
        "username": f"newuser{timestamp}",
        "password": "newpass123",
        "full_name": "New Test User",
        "is_instructor": False
    }
    
    print(f"Testing with email: {test_user['email']}")
    
    # Test 1: Register new user
    try:
        response = requests.post(
            f"{base_url}/api/v1/auth/register",
            json=test_user,
            timeout=10
        )
        print(f"Register test: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Registration successful!")
        else:
            print("❌ Registration failed")
            return
            
    except Exception as e:
        print(f"❌ Register test failed: {e}")
        return
    
    # Test 2: Login with new user
    try:
        login_data = {
            "email": test_user["email"],
            "password": test_user["password"]
        }
        response = requests.post(
            f"{base_url}/api/v1/auth/login",
            json=login_data,
            timeout=10
        )
        print(f"Login test: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Login successful!")
            data = response.json()
            print(f"User ID: {data['user']['id']}")
            print(f"User Email: {data['user']['email']}")
        else:
            print("❌ Login failed")
            
    except Exception as e:
        print(f"❌ Login test failed: {e}")

if __name__ == "__main__":
    test_new_user()
