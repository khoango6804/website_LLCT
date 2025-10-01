#!/usr/bin/env python3
"""
Test both Frontend and Backend servers
"""
import requests
import time

def test_backend():
    """Test backend server"""
    print("Testing Backend (FastAPI)...")
    try:
        response = requests.get("http://127.0.0.1:8000/", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running at http://127.0.0.1:8000")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ Backend returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Backend is not running")
        return False
    except Exception as e:
        print(f"❌ Backend error: {e}")
        return False

def test_frontend():
    """Test frontend server"""
    print("Testing Frontend (Next.js)...")
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is running at http://localhost:3000")
            return True
        else:
            print(f"❌ Frontend returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Frontend is not running")
        return False
    except Exception as e:
        print(f"❌ Frontend error: {e}")
        return False

def main():
    print("E-Learning Platform Server Test")
    print("=" * 40)
    
    # Wait a moment for servers to start
    print("Waiting for servers to start...")
    time.sleep(3)
    
    # Test backend
    backend_ok = test_backend()
    print("-" * 30)
    
    # Test frontend
    frontend_ok = test_frontend()
    print("-" * 30)
    
    # Summary
    if backend_ok and frontend_ok:
        print("🎉 Both servers are running successfully!")
        print("\nYou can access:")
        print("  Frontend: http://localhost:3000")
        print("  Backend:  http://127.0.0.1:8000")
        print("  API Docs: http://127.0.0.1:8000/docs")
    elif backend_ok:
        print("✅ Backend is running, but Frontend is not")
        print("Try running: npm run dev")
    elif frontend_ok:
        print("✅ Frontend is running, but Backend is not")
        print("Try running: python -m uvicorn backend.app_simple:app --reload --host 127.0.0.1 --port 8000")
    else:
        print("❌ Neither server is running")
        print("Start them manually:")

if __name__ == "__main__":
    main()
