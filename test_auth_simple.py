#!/usr/bin/env python3
"""
Test authentication API (no emoji version)
"""
import requests
import json

def test_auth_api():
    base_url = "http://127.0.0.1:8000"
    
    print("Testing E-Learning Auth API")
    print("=" * 40)
    
    # Test root endpoint
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        if response.status_code == 200:
            print("[OK] Root endpoint working")
            print(f"Response: {response.json()}")
        else:
            print(f"[ERROR] Root endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"[ERROR] Root endpoint error: {e}")
    
    print("-" * 30)
    
    # Test login endpoint
    try:
        login_data = {
            "email": "admin@demo.com",
            "password": "admin123"
        }
        response = requests.post(
            f"{base_url}/api/v1/auth/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        
        if response.status_code == 200:
            print("[OK] Login endpoint working")
            data = response.json()
            print(f"Token: {data['access_token']}")
            print(f"User: {data['user']['full_name']} ({data['user']['email']})")
        else:
            print(f"[ERROR] Login failed: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"[ERROR] Login error: {e}")
    
    print("-" * 30)
    
    # Test register endpoint
    try:
        register_data = {
            "full_name": "Test User",
            "email": "test@example.com",
            "username": "testuser",
            "password": "test123",
            "is_instructor": False
        }
        response = requests.post(
            f"{base_url}/api/v1/auth/register",
            json=register_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        
        if response.status_code == 200:
            print("[OK] Register endpoint working")
            print(f"Response: {response.json()}")
        else:
            print(f"[ERROR] Register failed: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"[ERROR] Register error: {e}")

if __name__ == "__main__":
    test_auth_api()
