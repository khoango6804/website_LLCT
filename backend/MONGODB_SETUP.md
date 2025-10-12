# MongoDB Setup Guide

## 🚀 Quick Start with MongoDB

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. MongoDB Setup Options

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb

# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Ubuntu: sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string

### 3. Environment Configuration

Create `.env` file in `backend/` directory:

```env
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017
MONGODB_DATABASE=elearning_platform
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_AUTH_SOURCE=admin

# For MongoDB Atlas, use:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
# MONGODB_DATABASE=elearning_platform
# MONGODB_USERNAME=your_username
# MONGODB_PASSWORD=your_password
# MONGODB_AUTH_SOURCE=admin

# Security
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000", "http://localhost:3001"]
```

### 4. Run MongoDB Server

```bash
# Run MongoDB FastAPI server
python run_mongodb.py

# Or with uvicorn directly
uvicorn app.main_mongodb:app --host 0.0.0.0 --port 8000 --reload
```

### 5. Test the API

```bash
# Health check
curl http://localhost:8000/health

# Test endpoint
curl http://localhost:8000/api/v1/test

# Register a new user
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@demo.com",
    "username": "admin",
    "full_name": "Admin User",
    "password": "admin123",
    "is_instructor": false
  }'

# Login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@demo.com&password=admin123"
```

## 📊 Database Models

### User Model
- **email**: Unique email address
- **username**: Unique username
- **full_name**: Full name
- **hashed_password**: Bcrypt hashed password
- **role**: admin, instructor, or student
- **is_active**: Account status
- **created_at**: Registration timestamp

### Course Model
- **title**: Course title
- **description**: Course description
- **subject_code**: e.g., MLN111, MLN122
- **instructor_id**: User ID of instructor
- **is_published**: Publication status

### Exercise Model
- **title**: Exercise title
- **course_id**: Associated course
- **exercise_type**: quiz, assignment, test
- **questions**: List of questions
- **time_limit_minutes**: Time limit
- **passing_score**: Minimum score to pass

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user info
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### User Management
- `GET /api/v1/auth/users` - Get all users (admin only)

## 🛠️ Development

### Database Operations
```python
from app.core.mongodb import get_database
from app.models.mongodb_models import User

# Get database
db = get_database()

# Create user
user = User(
    email="test@example.com",
    username="testuser",
    full_name="Test User",
    hashed_password="hashed_password",
    role="student"
)
await user.insert()

# Find user
user = await User.find_one(User.email == "test@example.com")

# Update user
user.full_name = "Updated Name"
await user.save()

# Delete user
await user.delete()
```

### Indexes
The following indexes are automatically created:
- **users**: email, username, role, is_active
- **courses**: subject_code, instructor_id, is_published
- **exercises**: course_id, exercise_type, is_published
- **chat_sessions**: user_id, session_type, is_active

## 🚨 Troubleshooting

### Connection Issues
1. **MongoDB not running**: Start MongoDB service
2. **Wrong connection string**: Check MONGODB_URL in .env
3. **Authentication failed**: Verify username/password
4. **Network issues**: Check firewall settings

### Common Errors
- **"Could not connect to MongoDB"**: Check if MongoDB is running
- **"Authentication failed"**: Verify credentials in .env
- **"Database not found"**: MongoDB will create database automatically
- **"Collection not found"**: Beanie will create collections automatically

## 📈 Production Considerations

1. **Security**: Use strong passwords and enable authentication
2. **Backup**: Set up regular MongoDB backups
3. **Monitoring**: Monitor database performance
4. **Scaling**: Consider MongoDB Atlas for production
5. **Indexes**: Add appropriate indexes for your queries

## 🔗 Useful Links

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Beanie ODM Documentation](https://beanie-odm.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
