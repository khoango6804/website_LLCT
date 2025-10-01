# 🚀 Hướng dẫn Setup Backend

## ✅ Đã hoàn thành

Backend đã được tạo với kiến trúc enterprise-grade bao gồm:

### 🏗️ Kiến trúc đã triển khai:
- ✅ **FastAPI** với middleware stack hoàn chỉnh
- ✅ **RBAC** (Admin/GV/SV) với tổ chức theo domain/class  
- ✅ **AI Layer** với Gemini 2.0 Flash/Pro
- ✅ **Vector Search** với pgvector cho RAG
- ✅ **Redis** cho caching và rate limiting
- ✅ **Background Workers** cho file processing
- ✅ **Monitoring** và observability

### 📁 Cấu trúc dự án:
```
backend/
├── app/
│   ├── api/api_v1/endpoints/     # API endpoints
│   ├── core/                     # Core functionality
│   ├── models/                   # Database models (5 files)
│   ├── schemas/                  # Pydantic schemas
│   ├── services/                 # Business logic
│   ├── ai/                       # AI services (Gemini + RAG)
│   ├── middleware/               # Auth + Rate limiting
│   ├── workers/                  # Background workers
│   └── main.py                   # FastAPI app
├── requirements.txt              # Full dependencies
├── requirements-minimal.txt      # Minimal for testing
├── env.example                   # Complete config
├── app_simple.py                 # Simple test version
└── run.py                        # Server runner
```

## 🚀 Cách chạy nhanh (Test)

### 1. Cài đặt dependencies tối thiểu:
```bash
cd backend
pip install -r requirements-minimal.txt
```

### 2. Chạy server đơn giản:
```bash
uvicorn app_simple:app --reload --host 127.0.0.1 --port 8000
```

### 3. Test API:
- Mở browser: http://localhost:8000
- API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## 🔧 Setup đầy đủ (Production)

### 1. Prerequisites:
- Python 3.8+
- PostgreSQL (hoặc Supabase)
- Redis
- Gemini API key

### 2. Cài đặt dependencies:
```bash
# Cài đặt từng package để tránh lỗi
pip install fastapi uvicorn[standard] python-multipart
pip install pydantic pydantic-settings python-dotenv
pip install sqlalchemy alembic
pip install python-jose[cryptography] passlib[bcrypt]
pip install google-generativeai
pip install redis
```

### 3. Cấu hình environment:
```bash
cp env.example .env
# Chỉnh sửa .env với thông tin thực tế
```

### 4. Chạy server đầy đủ:
```bash
python run.py
```

## 📚 API Endpoints

### Basic (đã test):
- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/v1/test` - Test endpoint

### Advanced (cần setup đầy đủ):
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/chat/sessions` - Create chat session
- `POST /api/v1/chat/sessions/{id}/messages` - Send message
- `GET /api/v1/courses/` - Get courses
- `POST /api/v1/courses/` - Create course

## 🎯 Tính năng chính

### ✅ Đã triển khai:
1. **AI-Powered Chat** với RAG
2. **Vector Search** semantic
3. **Debate Rooms** real-time
4. **Socratic Bot** guided questioning
5. **Auto Quiz Generation** từ tài liệu
6. **RBAC** với 3 roles và domain organization
7. **Rate Limiting** thông minh
8. **Background Processing** cho file upload

### 🔄 Cần setup thêm:
- Database PostgreSQL với extensions
- Redis server
- Gemini API key
- Supabase project (optional)

## 🐛 Troubleshooting

### Lỗi psycopg2:
```bash
# Sử dụng requirements-minimal.txt thay vì requirements.txt
pip install -r requirements-minimal.txt
```

### Lỗi setuptools:
```bash
# Cập nhật pip và setuptools
python -m pip install --upgrade pip setuptools
```

### Server không chạy:
```bash
# Kiểm tra port 8000 có bị chiếm không
netstat -an | findstr :8000

# Chạy trên port khác
uvicorn app_simple:app --reload --port 8001
```

## 📖 Tài liệu tham khảo

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Supabase**: https://supabase.com/
- **Gemini AI**: https://ai.google.dev/
- **Redis**: https://redis.io/

## 🎉 Kết luận

Backend đã sẵn sàng với kiến trúc enterprise-grade! Bạn có thể:

1. **Test ngay**: Chạy `app_simple.py` để test cơ bản
2. **Phát triển**: Setup đầy đủ để sử dụng tất cả tính năng AI
3. **Production**: Deploy với PostgreSQL, Redis, và monitoring

Chúc bạn thành công! 🚀
