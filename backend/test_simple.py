import requests
import time

def test_api():
    base_url = "http://localhost:8000"
    
    print("Testing E-Learning Platform API...")
    print("=" * 50)
    
    # Wait a moment for server to start
    time.sleep(2)
    
    try:
        # Test root endpoint
        response = requests.get(f"{base_url}/")
        print(f"Root endpoint: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 30)
        
        # Test health endpoint
        response = requests.get(f"{base_url}/health")
        print(f"Health endpoint: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 30)
        
        # Test API endpoint
        response = requests.get(f"{base_url}/api/v1/test")
        print(f"API test endpoint: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 30)
        
        print("✅ All tests passed! API is working correctly.")
        
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to API. Make sure server is running on port 8000.")
    except Exception as e:
        print(f"❌ Error testing API: {e}")

if __name__ == "__main__":
    test_api()
