## E‑Learning Platform

E‑learning platform built with Next.js App Router, Tailwind CSS, and FastAPI backend with MongoDB. It provides pages for courses, exercises, instructors, a chatbot, and an admin area.

### Demo (local)
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`

### Demo Accounts
- **Admin**: `admin@demo.com` hoặc `admin` / `demo123`
- **Instructor**: `instructor@demo.com` hoặc `instructor` / `demo123`
- **Student**: `student@demo.com` hoặc `student` / `demo123`

---

### Tech Stack
- **Frontend**: Next.js `15.x` (App Router, Turbopack), TypeScript `^5`, React `19`
- **UI**: Tailwind CSS `^4`, Headless UI, Lucide Icons, `clsx`, `tailwind-merge`
- **Backend**: FastAPI, MongoDB (Atlas), Beanie ODM, Motor
- **Authentication**: JWT tokens, bcrypt password hashing
- **AI**: Google Gemini AI for chatbot and RAG

---

### Project Structure
Key files and folders:

```
├── src/                    # Frontend (Next.js)
│   ├── app/
│   │   ├── page.tsx        // Landing page
│   │   ├── admin/page.tsx  // Admin dashboard
│   │   ├── chatbot/page.tsx // Chatbot interface
│   │   ├── community/page.tsx // Community page
│   │   ├── courses/page.tsx // Courses listing
│   │   ├── exercises/page.tsx // Exercises page
│   │   ├── instructors/page.tsx // Instructors page
│   │   ├── layout.tsx      // Root layout
│   │   └── globals.css     // Global styles (Tailwind)
│   └── components/
│       ├── Navigation.tsx  // Top navigation
│       └── Footer.tsx      // Footer
└── backend/                # Backend (FastAPI + MongoDB)
    ├── app/
    │   ├── api/            // API routes
    │   ├── core/           // Core functionality (MongoDB connection)
    │   ├── models/         // Database models (Beanie ODM)
    │   ├── schemas/        // Pydantic schemas
    │   ├── ai/             // AI services (Gemini, RAG)
    │   └── main_mongodb.py // FastAPI app with MongoDB
    ├── requirements.txt    // Python dependencies
    ├── simple_mongodb_server.py // Main server runner
    └── MONGODB_SETUP.md    // MongoDB setup guide
```

---

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd website_LLCT
```

2. **Start Frontend**
```bash
npm install
npm run dev
```

3. **Start Backend** (in another terminal)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python simple_mongodb_server.py
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

5. **Login with demo accounts**
- Admin: `admin@demo.com` / `demo123`
- Instructor: `instructor@demo.com` / `demo123`
- Student: `student@demo.com` / `demo123`

---

### Requirements
- Node.js 18+ (LTS recommended)
- Python 3.8+
- npm 9+ (or pnpm/yarn/bun if you prefer)

---

### Setup

#### Frontend (Next.js)
1) Install dependencies
```bash
npm install
```

2) Start the dev server
```bash
npm run dev
```

Open `http://localhost:3000`.

#### Backend (FastAPI + MongoDB)
1) Navigate to backend directory
```bash
cd backend
```

2) Create virtual environment
```bash
python -m venv venv
```

3) Activate virtual environment
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4) Install dependencies
```bash
pip install -r requirements.txt
```

5) Set up MongoDB connection (optional - uses default Atlas connection)
```bash
# Copy environment template
cp env_mongodb_example.txt .env

# Edit .env with your MongoDB credentials if needed
```

6) Start the MongoDB server
```bash
python simple_mongodb_server.py
```

Open `http://localhost:8000` for API and `http://localhost:8000/docs` for documentation.

**Note**: The server uses MongoDB Atlas by default. For local MongoDB setup, see `MONGODB_SETUP.md`.

---

### Available Scripts
- `npm run dev` — Start dev server with Turbopack
- `npm run build` — Production build (Turbopack)
- `npm run start` — Start production server (after build)
- `npm run lint` — Run ESLint

---

### Styling
- Tailwind CSS v4 is configured via `@tailwindcss/postcss` in `postcss.config.mjs`.
- Global styles live in `src/app/globals.css`.

---

### Conventions
- Use functional React components and hooks.
- Keep components small and colocate them under `src/components` or feature pages under `src/app/<feature>`.
- Prefer explicit, descriptive names. Avoid abbreviations.

---

### Deployment
You can deploy to any Node.js host. Common options:

- Vercel: push the repo and import the project. Framework preset: Next.js.
- Docker/Node host: build with `npm run build`, then run `npm run start`.

Environment variables (if added later) can be set in your host and consumed via Next.js runtime or build‑time according to the docs.

---

### Troubleshooting
- Windows line endings: Git may report CRLF/LF changes. Configure with `git config core.autocrlf true` (Windows) if needed.
- If Tailwind styles don’t apply, ensure `globals.css` is imported in `src/app/layout.tsx` and that PostCSS plugins are installed.

---

### API Endpoints

#### Authentication & Users
- `POST /api/v1/auth/register` - User registration (creates student by default)
- `POST /api/v1/auth/login` - User login (email or username)
- `GET /api/v1/auth/users` - Get users list (admin only)
- `PATCH /api/v1/auth/users/{id}` - Update user role (admin only)
- `DELETE /api/v1/auth/users/{id}` - Delete user (admin only)

#### Library & Documents
- `GET /api/v1/library/public/documents/` - Get published documents
- `GET /api/v1/library/public/subjects/` - Get active subjects
- `POST /api/v1/library/documents/upload` - Upload document (instructor)
- `GET /api/v1/library/documents/{id}` - Get document details

#### Assessments (MongoDB)
- `GET /api/v1/mongo/assessments/` - Get assessments
- `POST /api/v1/mongo/assessments/` - Create assessment
- `GET /api/v1/mongo/assessments/{id}/questions` - Get assessment questions
- `POST /api/v1/mongo/assessments/{id}/questions` - Add questions

#### News & Products
- `GET /api/v1/news/` - Get news articles
- `GET /api/v1/products/` - Get products
- `GET /api/v1/products/stats/summary` - Get product statistics

#### Results & Analytics
- `POST /api/v1/results/` - Submit assessment result
- `GET /api/v1/results/student/{id}` - Get student results
- `GET /api/v1/results/assessment/{id}` - Get assessment results

### Key Features
- **MongoDB Integration**: Full MongoDB Atlas integration with Beanie ODM
- **Role-Based Access Control**: Admin/Instructor/Student roles with proper permissions
- **AI-Powered Chat**: RAG-based Q&A with Google Gemini AI
- **Document Management**: Upload, organize, and share educational materials
- **Assessment System**: Create and manage quizzes with MongoDB storage
- **User Management**: Admin panel for user role management
- **Responsive Design**: Modern UI with Tailwind CSS
- **Authentication**: JWT-based auth with email/username login support

### Current Status
✅ **Working Features**:
- Frontend and backend connection established
- MongoDB Atlas integration
- User authentication and role management
- Document library with public access
- Assessment system with MongoDB storage
- Admin panel for user management
- Responsive UI with modern design

🔄 **In Development**:
- AI chatbot integration
- Real-time features
- Advanced assessment analytics
- File upload improvements

---

### License
MIT — feel free to use this as a starting point for your own projects.
