import subprocess
import time
import requests
import sys
import os

def run_server():
    """Run the FastAPI server"""
    print("Starting FastAPI server...")
    try:
        # Run uvicorn in background
        process = subprocess.Popen([
            sys.executable, "-m", "uvicorn", 
            "app_simple:app", 
            "--reload", 
            "--host", "127.0.0.1", 
            "--port", "8000"
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Wait for server to start
        print("Waiting for server to start...")
        time.sleep(5)
        
        return process
    except Exception as e:
        print(f"Error starting server: {e}")
        return None

def test_api():
    """Test the API endpoints"""
    print("Testing API endpoints...")
    base_url = "http://127.0.0.1:8000"
    
    try:
        # Test root endpoint
        print("Testing root endpoint...")
        response = requests.get(f"{base_url}/", timeout=5)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 30)
        
        # Test health endpoint
        print("Testing health endpoint...")
        response = requests.get(f"{base_url}/health", timeout=5)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 30)
        
        # Test API endpoint
        print("Testing API endpoint...")
        response = requests.get(f"{base_url}/api/v1/test", timeout=5)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 30)
        
        print("SUCCESS: All tests passed! API is working correctly.")
        print("\nYou can now access:")
        print(f"   API: {base_url}")
        print(f"   Docs: {base_url}/docs")
        print(f"   Health: {base_url}/health")
        
        return True
        
    except requests.exceptions.ConnectionError:
        print("ERROR: Could not connect to API.")
        return False
    except Exception as e:
        print(f"ERROR: {e}")
        return False

def main():
    print("E-Learning Platform Backend Test")
    print("=" * 50)
    
    # Check if app_simple.py exists
    if not os.path.exists("app_simple.py"):
        print("ERROR: app_simple.py not found!")
        return
    
    # Run server
    server_process = run_server()
    if not server_process:
        return
    
    try:
        # Test API
        success = test_api()
        
        if success:
            print("\nServer is running in background.")
            print("Press Ctrl+C to stop the server.")
            
            # Keep server running
            try:
                server_process.wait()
            except KeyboardInterrupt:
                print("\nStopping server...")
                server_process.terminate()
        else:
            print("Tests failed. Stopping server...")
            server_process.terminate()
            
    except KeyboardInterrupt:
        print("\nStopping server...")
        server_process.terminate()

if __name__ == "__main__":
    main()
