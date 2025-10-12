#!/usr/bin/env python3
"""
Test Chat API endpoint with Gemini
"""

import requests
import json

def test_chat_api():
    """Test the chat API endpoint"""
    
    url = "http://127.0.0.1:8000/api/v1/chat/test"
    
    # Test message
    test_message = {
        "message": "Xin chào! Bạn có thể giúp tôi học kỹ năng mềm không?"
    }
    
    try:
        print("Testing Chat API endpoint...")
        print(f"URL: {url}")
        print(f"Message: {test_message['message']}")
        
        response = requests.post(url, json=test_message)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Chat API Test Successful!")
            print(f"Success: {data.get('success')}")
            print(f"Message: {data.get('message')}")
            print(f"Response: {data.get('response', '')[:200]}...")
            return True
        else:
            print(f"❌ Chat API Test Failed!")
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Chat API Test Error: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Testing Chat API...")
    success = test_chat_api()
    
    if success:
        print("\n🎉 Chat API is working correctly!")
    else:
        print("\n💥 Chat API test failed!")
