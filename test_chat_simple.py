# -*- coding: utf-8 -*-
import requests
import json
import sys
import os

# Set UTF-8 encoding for Windows
if sys.platform.startswith('win'):
    os.system('chcp 65001 > nul')

def test_chat_api():
    try:
        url = "http://127.0.0.1:8000/api/v1/chat/test"
        data = {
            "message": "Kỹ năng mềm là gì?",
            "type": "learning"
        }
        
        response = requests.post(url, json=data)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Success: {result.get('success', False)}")
            response_text = result.get('response', 'No response')
            try:
                print(f"Response: {response_text}")
            except UnicodeEncodeError:
                print(f"Response: {response_text.encode('utf-8', 'ignore').decode('utf-8')}")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_chat_api()