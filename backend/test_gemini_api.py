#!/usr/bin/env python3
"""
Test Gemini API with your API key
"""

import google.generativeai as genai
import sys

def test_gemini_api():
    """Test Gemini API connection and basic functionality"""
    
    # Your API key
    api_key = "AIzaSyB7PFhFYDIxqZ9FYEzU0AmWJbLNfl3wFcE"
    
    try:
        print("🔑 Configuring Gemini API...")
        genai.configure(api_key=api_key)
        
        print("🤖 Creating GenerativeModel...")
        model = genai.GenerativeModel("gemini-2.0-flash-exp")
        
        print("💬 Testing basic chat...")
        response = model.generate_content("Xin chào! Bạn có thể giúp tôi học kỹ năng mềm không?")
        
        print("✅ API Test Successful!")
        print(f"📝 Response: {response.text}")
        
        return True
        
    except Exception as e:
        print(f"❌ API Test Failed: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Testing Gemini API...")
    success = test_gemini_api()
    
    if success:
        print("\n🎉 Gemini API is working correctly!")
        sys.exit(0)
    else:
        print("\n💥 Gemini API test failed!")
        sys.exit(1)
