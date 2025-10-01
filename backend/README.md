# E-Learning Platform Backend

Backend API cho nền tảng học trực tuyến được xây dựng với FastAPI.

## Cài đặt

1. Tạo virtual environment:
```bash
python -m venv venv
```

2. Kích hoạt virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Cài đặt dependencies:
```bash
pip install -r requirements.txt
```

4. Tạo file `.env` từ `env.example`:
```bash
cp env.example .env
```

5. Chỉnh sửa file `.env` với thông tin cấu hình của bạn.

## Chạy ứng dụng

```bash
python run.py
```

Hoặc sử dụng uvicorn trực tiếp:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API sẽ chạy tại: http://localhost:8000

## API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Cấu trúc dự án

```
backend/
├── app/
│   ├── api/
│   │   └── api_v1/
│   │       ├── endpoints/
│   │       │   ├── auth.py
│   │       │   ├── users.py
│   │       │   └── courses.py
│   │       └── api.py
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   ├── models/
│   │   ├── user.py
│   │   └── course.py
│   ├── schemas/
│   │   ├── user.py
│   │   └── course.py
│   └── main.py
├── requirements.txt
├── env.example
└── run.py
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Đăng ký tài khoản
- `POST /api/v1/auth/login` - Đăng nhập

### Users
- `GET /api/v1/users/` - Lấy danh sách người dùng
- `GET /api/v1/users/{user_id}` - Lấy thông tin người dùng
- `PUT /api/v1/users/{user_id}` - Cập nhật thông tin người dùng
- `DELETE /api/v1/users/{user_id}` - Xóa người dùng

### Courses
- `GET /api/v1/courses/` - Lấy danh sách khóa học
- `GET /api/v1/courses/{course_id}` - Lấy thông tin khóa học
- `POST /api/v1/courses/` - Tạo khóa học mới
- `PUT /api/v1/courses/{course_id}` - Cập nhật khóa học
- `GET /api/v1/courses/{course_id}/lessons` - Lấy danh sách bài học
- `POST /api/v1/courses/{course_id}/lessons` - Tạo bài học mới
- `GET /api/v1/lessons/{lesson_id}/exercises` - Lấy danh sách bài tập
- `POST /api/v1/lessons/{lesson_id}/exercises` - Tạo bài tập mới
- `POST /api/v1/courses/{course_id}/enroll` - Đăng ký khóa học

## Database

Ứng dụng sử dụng SQLite mặc định. Để sử dụng PostgreSQL, cập nhật `DATABASE_URL` trong file `.env`:

```
DATABASE_URL=postgresql://username:password@localhost:5432/elearning_db
```
