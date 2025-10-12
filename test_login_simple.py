#!/usr/bin/env python3
"""
Test login with the newly registered user
"""
import requests
import json

def test_login():
    base_url = "http://127.0.0.1:8000"
    
    print("Testing login with newly registered user...")
    
    # Use the email from the successful registration
    login_data = {
        "email": "newuser1760284053@mongodb.com",
        "password": "newpass123"
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/v1/auth/login",
            json=login_data,
            timeout=10
        )
        print(f"Login test: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("SUCCESS: Login successful!")
            data = response.json()
            print(f"User ID: {data['user']['id']}")
            print(f"User Email: {data['user']['email']}")
            print(f"Access Token: {data['access_token']}")
        else:
            print("FAILED: Login failed")
            
    except Exception as e:
        print(f"ERROR: Login test failed: {e}")

if __name__ == "__main__":
    test_login()
