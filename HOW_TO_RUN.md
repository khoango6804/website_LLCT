# 🚀 Cách chạy Frontend + Backend

## ✅ Backend đã sẵn sàng!

Backend FastAPI đã chạy thành công tại: http://127.0.0.1:8000

## 📋 Hướng dẫn chạy cả hai:

### **Cách 1: Chạy thủ công (2 terminal)**

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn app_simple:app --reload --host 127.0.0.1 --port 8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### **Cách 2: Sử dụng script tự động**

```bash
python start_dev.py
```

## 🌐 Truy cập ứng dụng:

- **Frontend**: http://localhost:3000 (Next.js UI)
- **Backend**: http://127.0.0.1:8000 (FastAPI API)
- **API Docs**: http://127.0.0.1:8000/docs (Swagger UI)
- **Health Check**: http://127.0.0.1:8000/health

## 🔧 Troubleshooting:

### Backend không chạy:
```bash
# Cài đặt dependencies
pip install fastapi uvicorn

# Chạy với python -m
python -m uvicorn backend.app_simple:app --reload --host 127.0.0.1 --port 8000
```

### Frontend không chạy:
```bash
# Cài đặt Node.js dependencies
npm install

# Chạy development server
npm run dev
```

### Lỗi "npm not found":
- Cài đặt Node.js từ https://nodejs.org/
- Restart terminal sau khi cài đặt

## 📚 API Endpoints có sẵn:

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/v1/test` - Test endpoint
- `GET /docs` - API documentation

## 🎯 Kết nối Frontend với Backend:

Trong Next.js, bạn có thể gọi API như:
```javascript
const response = await fetch('http://127.0.0.1:8000/api/v1/test');
const data = await response.json();
console.log(data);
```

## 🎉 Kết luận:

Backend đã hoạt động hoàn hảo! Bạn chỉ cần:
1. Chạy backend: `python -m uvicorn backend.app_simple:app --reload --host 127.0.0.1 --port 8000`
2. Chạy frontend: `npm run dev`
3. Truy cập http://localhost:3000 và http://127.0.0.1:8000

Chúc bạn thành công! 🚀
