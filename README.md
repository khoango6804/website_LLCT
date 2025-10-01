## E‑Learning Platform

E‑learning platform built with Next.js App Router, Tailwind CSS, and FastAPI backend. It provides pages for courses, exercises, instructors, a chatbot, and an admin area.

### Demo (local)
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`

---

### Tech Stack
- **Frontend**: Next.js `15.x` (App Router, Turbopack), TypeScript `^5`, React `19`
- **UI**: Tailwind CSS `^4`, Headless UI, Lucide Icons, `clsx`, `tailwind-merge`
- **Backend**: FastAPI, SQLAlchemy, SQLite/PostgreSQL
- **Authentication**: JWT tokens, bcrypt password hashing

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
└── backend/                # Backend (FastAPI)
    ├── app/
    │   ├── api/            // API routes
    │   ├── core/           // Core functionality
    │   ├── models/         // Database models
    │   ├── schemas/        // Pydantic schemas
    │   └── main.py         // FastAPI app
    ├── requirements.txt    // Python dependencies
    └── run.py             // Server runner
```

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

#### Backend (FastAPI)
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

5) Start the server
```bash
python run.py
```

Open `http://localhost:8000` for API and `http://localhost:8000/docs` for documentation.

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
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/users/` - Get users list
- `GET /api/v1/courses/` - Get courses list
- `POST /api/v1/courses/` - Create course
- `GET /api/v1/courses/{id}/lessons` - Get course lessons
- `POST /api/v1/courses/{id}/enroll` - Enroll in course

### Roadmap (next steps)
- Connect frontend to backend API
- Implement authentication/authorization
- Add file upload for course materials
- Implement real-time chat for chatbot
- Add unit/integration tests
- Add database migrations with Alembic

---

### License
MIT — feel free to use this as a starting point for your own projects.
