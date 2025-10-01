@echo off
echo Starting E-Learning Platform (Frontend + Backend)
echo ================================================

echo Starting Backend (FastAPI)...
start "Backend" cmd /k "cd backend && uvicorn app_simple:app --reload --host 127.0.0.1 --port 8000"

echo Waiting 3 seconds...
timeout /t 3 /nobreak > nul

echo Starting Frontend (Next.js)...
start "Frontend" cmd /k "npm run dev"

echo Both servers are starting...
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo API Docs: http://127.0.0.1:8000/docs

pause
