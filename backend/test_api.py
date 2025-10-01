import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000/api/v1"

def test_health():
    """Test health endpoint"""
    response = requests.get("http://localhost:8000/health")
    print(f"Health check: {response.status_code}")
    print(f"Response: {response.json()}")
    print("-" * 50)

def test_register_user():
    """Test user registration"""
    user_data = {
        "email": "test@example.com",
        "username": "testuser",
        "full_name": "Test User",
        "password": "testpassword123",
        "is_instructor": False
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=user_data)
    print(f"Register user: {response.status_code}")
    print(f"Response: {response.json()}")
    print("-" * 50)
    return response.json() if response.status_code == 200 else None

def test_login():
    """Test user login"""
    login_data = {
        "username": "test@example.com",  # OAuth2 uses username field for email
        "password": "testpassword123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", data=login_data)
    print(f"Login: {response.status_code}")
    print(f"Response: {response.json()}")
    print("-" * 50)
    return response.json() if response.status_code == 200 else None

def test_create_course(token):
    """Test course creation"""
    headers = {"Authorization": f"Bearer {token}"}
    course_data = {
        "title": "Python Programming Basics",
        "description": "Learn Python programming from scratch",
        "category": "Programming",
        "level": "beginner",
        "price": 0.0,
        "instructor_id": 1
    }
    
    response = requests.post(f"{BASE_URL}/courses/", json=course_data, headers=headers)
    print(f"Create course: {response.status_code}")
    print(f"Response: {response.json()}")
    print("-" * 50)
    return response.json() if response.status_code == 200 else None

def test_get_courses():
    """Test getting courses"""
    response = requests.get(f"{BASE_URL}/courses/")
    print(f"Get courses: {response.status_code}")
    print(f"Response: {response.json()}")
    print("-" * 50)

if __name__ == "__main__":
    print("Testing E-Learning Platform API")
    print("=" * 50)
    
    # Test health endpoint
    test_health()
    
    # Test user registration
    user = test_register_user()
    
    # Test user login
    login_result = test_login()
    token = login_result.get("access_token") if login_result else None
    
    # Test getting courses
    test_get_courses()
    
    # Test creating course (if we have a token)
    if token:
        test_create_course(token)
    
    print("API testing completed!")
