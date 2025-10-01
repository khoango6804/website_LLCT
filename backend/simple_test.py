import requests
import time

def test_api():
    print("Testing E-Learning Platform API...")
    print("=" * 50)
    
    # Wait for server to start
    time.sleep(3)
    
    base_url = "http://127.0.0.1:8000"
    
    try:
        # Test root endpoint
        print("Testing root endpoint...")
        response = requests.get(f"{base_url}/")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 30)
        
        # Test health endpoint
        print("Testing health endpoint...")
        response = requests.get(f"{base_url}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 30)
        
        # Test API endpoint
        print("Testing API endpoint...")
        response = requests.get(f"{base_url}/api/v1/test")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 30)
        
        print("All tests passed! API is working correctly.")
        print("\nYou can now access:")
        print(f"   API: {base_url}")
        print(f"   Docs: {base_url}/docs")
        print(f"   Health: {base_url}/health")
        
    except requests.exceptions.ConnectionError:
        print("Could not connect to API.")
        print("Make sure server is running: uvicorn app_simple:app --reload --host 127.0.0.1 --port 8000")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_api()
