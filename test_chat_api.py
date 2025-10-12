import requests
import json

def test_chat_api():
    try:
        url = "http://127.0.0.1:8000/api/v1/chat/test"
        data = {
            "message": "Hello, how are you?",
            "type": "learning"
        }
        
        response = requests.post(url, json=data)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Success: {result.get('success', False)}")
            print(f"Response: {result.get('response', 'No response')}")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_chat_api()
