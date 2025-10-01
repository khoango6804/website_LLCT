#!/usr/bin/env python3
"""
Script to run both Frontend and Backend for E-Learning Platform
"""
import subprocess
import sys
import time
import os
import threading
import requests

def run_backend():
    """Run FastAPI backend"""
    print("🚀 Starting Backend (FastAPI)...")
    try:
        # Change to backend directory and run uvicorn
        backend_cmd = [
            sys.executable, "-m", "uvicorn", 
            "app_simple:app", 
            "--reload", 
            "--host", "127.0.0.1", 
            "--port", "8000"
        ]
        
        # Run in backend directory
        process = subprocess.Popen(
            backend_cmd,
            cwd="backend",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Wait a bit for server to start
        time.sleep(3)
        
        # Test if server is running
        try:
            response = requests.get("http://127.0.0.1:8000/", timeout=5)
            if response.status_code == 200:
                print("✅ Backend is running at http://127.0.0.1:8000")
            else:
                print("❌ Backend failed to start properly")
        except:
            print("⚠️  Backend might be starting...")
        
        return process
    except Exception as e:
        print(f"❌ Error starting backend: {e}")
        return None

def run_frontend():
    """Run Next.js frontend"""
    print("🚀 Starting Frontend (Next.js)...")
    try:
        # Run npm run dev
        process = subprocess.Popen(
            ["npm", "run", "dev"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Wait a bit for server to start
        time.sleep(5)
        
        # Test if frontend is running
        try:
            response = requests.get("http://localhost:3000", timeout=5)
            if response.status_code == 200:
                print("✅ Frontend is running at http://localhost:3000")
            else:
                print("❌ Frontend failed to start properly")
        except:
            print("⚠️  Frontend might be starting...")
        
        return process
    except Exception as e:
        print(f"❌ Error starting frontend: {e}")
        return None

def main():
    print("🎓 E-Learning Platform Development Server")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not os.path.exists("backend") or not os.path.exists("package.json"):
        print("❌ Please run this script from the project root directory")
        return
    
    # Start backend
    backend_process = run_backend()
    if not backend_process:
        print("❌ Failed to start backend")
        return
    
    # Start frontend
    frontend_process = run_frontend()
    if not frontend_process:
        print("❌ Failed to start frontend")
        backend_process.terminate()
        return
    
    print("\n🎉 Both servers are running!")
    print("📱 Frontend: http://localhost:3000")
    print("🔧 Backend:  http://127.0.0.1:8000")
    print("📚 API Docs: http://127.0.0.1:8000/docs")
    print("\nPress Ctrl+C to stop both servers...")
    
    try:
        # Keep both processes running
        while True:
            time.sleep(1)
            
            # Check if processes are still running
            if backend_process.poll() is not None:
                print("❌ Backend process stopped")
                break
            if frontend_process.poll() is not None:
                print("❌ Frontend process stopped")
                break
                
    except KeyboardInterrupt:
        print("\n🛑 Stopping servers...")
        
        # Terminate both processes
        if backend_process:
            backend_process.terminate()
        if frontend_process:
            frontend_process.terminate()
        
        print("✅ Servers stopped")

if __name__ == "__main__":
    main()
