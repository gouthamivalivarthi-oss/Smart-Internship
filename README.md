# 🚀 Smart Internship Tracker with AI-Powered Application Management

A full-stack production-ready **MERN** web application engineered to help university and college students discover, manage, and track internship applications, prepare for interviews, and optimize resumes with artificial intelligence.

---

## 🌟 Key Features

### 1. 📋 Application Lifecycle & Kanban Tracker
* **Interactive Kanban Board**: Categorize applications across stages: `Wishlist`, `Applied`, `In Review`, `Interviewing`, `Offered 🎉`, and `Rejected/Archived`.
* **Real-time Status Synchronization**: Immediate database updates with timeline audit logging.
* **Metadata Tracking**: Track stipends, company names, role titles, application URLs, personal preparation notes, priority tags (`High`, `Medium`, `Low`), and approaching deadlines.

### 2. 🧠 Dedicated AI Service Layer (with Zero-Failure Safe Fallback)
* **AI Resume ATS Analyzer**: Upload resumes (PDF, DOCX, TXT) to compute an ATS benchmark score (0-100), extract core technical proficiencies, identify strengths, and uncover high-impact resume improvements.
* **AI Resume / Internship Matching**: Calculates semantic compatibility percentage between student skills and job requirements. Shows matched skills, missing skills, and strategic advice.
* **AI Skill-Gap & Career Roadmaps**: Analyzes readiness for roles like *Frontend Engineer*, *Backend Engineer*, *Full Stack Developer*, *Data Scientist / AI Engineer*, and *DevOps*. Outlines a week-by-week learning roadmap.
* **AI Interview Question Generator**: Generates 5 tailored technical, behavioral, and architectural questions for any company and role, complete with STAR hints and model answer outlines.
* **AI Tailored Cover Letter Generator**: Generates personalized outreach pitches and cover letters tailored to specific companies.
* **Fallback Guarantee**: If `AI_API_KEY` is not provided or network is offline, the embedded heuristic AI engine produces realistic evaluations without breaking any part of the application.

### 3. 🎯 Centralized Internship Directory
* Filter by Category (`Software Engineering`, `Data Science & AI`, `UI/UX Design`, `DevOps & Cloud`, `Mobile Development`).
* Filter by Work Mode (`Remote`, `Hybrid`, `On-site`) and sort by date, deadline, or stipend.
* 1-Click "AI Match" and "Track to Dashboard".

### 4. 📅 Interview Tracker & Planner
* Manage technical rounds, panel interviews, and HR screens.
* Store Google Meet / Zoom meeting links, scheduled dates, and durations.
* Direct access to AI-generated practice interview questions.

### 5. 📊 Interactive Analytics & Conversion Insights
* **Recharts Visualizations**:
  * Status Distribution Donut Chart.
  * 6-Month Application Velocity Area Chart.
  * In-Demand Skills vs Profile Match Bar Chart.
* Real-time metrics: Interview response rate, offer conversion rate, and average ATS score.

### 6. 🛡️ Admin & Recruiter Control Center
* Role-based access control (`student` vs `admin`).
* Platform-wide telemetry (Total users, active applications, top hiring categories).
* Post, edit, feature, and archive internship listings.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Axios, Recharts, React Icons, React Hot Toast, Context API |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer, express-validator, morgan, dotenv, cors |
| **AI Layer** | Dedicated AI Service Layer with Google Gemini API integration and heuristic fallback engine |
| **Database** | MongoDB with Mongoose ODM (Indexes, Schemas, Pre-save hooks, Aggregations) |

---

## 📂 Project Architecture

```text
smart-internship-tracker/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/            # Navbar, Footer, StatCard, Badge, Modal, Spinner, EmptyState
│   │   │   ├── applications/      # KanbanBoard, ApplicationCard, ApplicationModal
│   │   │   ├── internships/       # InternshipCard, InternshipFilter, InternshipDetailModal
│   │   │   ├── ai/                # ResumeAnalyzerCard, SkillGapChart, AiMatchModal, InterviewQuestionsModal
│   │   │   ├── interviews/        # InterviewCard, ScheduleInterviewModal
│   │   │   └── notifications/     # NotificationDropdown
│   │   ├── context/               # AuthContext, ThemeContext
│   │   ├── services/              # Axios API client & endpoints
│   │   ├── utils/                 # Formatting & badge helpers
│   │   ├── pages/                 # Landing, Login, Register, Dashboard, Tracker, Directory, AI Hub, Analytics, Admin
│   │   ├── layouts/               # MainLayout
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── config/                    # db.js (Mongoose connection)
│   ├── controllers/               # Auth, Internships, Applications, AI, Interviews, Analytics, Notifications
│   ├── middleware/                # Protect, AdminOnly, Multer Upload, ErrorHandler
│   ├── models/                    # User, Internship, Application, Interview, Notification
│   ├── routes/                    # Express route routers
│   ├── services/                  # aiService.js (AI layer with fallback)
│   ├── utils/                     # resumeExtractor.js, seeder.js
│   ├── uploads/                   # Uploaded resume files
│   ├── server.js                  # Main server entry point
│   ├── package.json
│   └── .env
│
├── .env.example
├── .gitignore
├── README.md
└── package.json                   # Root orchestrator (concurrently dev runner)
```

---

## ⚡ Quick Start Guide

### Prerequisites
* **Node.js** (v18+ recommended)
* **MongoDB** (running locally on port 27017 or a MongoDB Atlas URI)

### 1. Installation
Install all dependencies for root, backend, and frontend with a single command:
```bash
npm run install:all
```

### 2. Seed Initial Realistic Data
Populates 8+ tech internships (Stripe, Google, Spotify, Microsoft, Datadog, Figma, etc.), student and admin demo accounts, sample applications in multiple stages, scheduled interviews, and notifications:
```bash
npm run seed
```

### 3. Start Development Servers
Run both backend (`http://localhost:5000`) and frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Student** | `student@demo.com` | `Password123!` | Dashboard, Kanban Tracker, AI Hub, Interviews, Analytics |
| **Admin / Recruiter** | `admin@demo.com` | `Password123!` | Full Student access + Admin Control Center |

*(1-click demo login buttons are also available directly on the login page!)*

---

## 📡 API Endpoint Reference

### Authentication (`/api/auth`)
* `POST /api/auth/register` - Create student or recruiter account
* `POST /api/auth/login` - Authenticate and obtain JWT token
* `GET /api/auth/me` - Get active session user profile
* `PUT /api/auth/profile` - Update bio, target roles, headline, and skills
* `POST /api/auth/upload-resume` - Upload resume (Multer) & parse skills

### Internships (`/api/internships`)
* `GET /api/internships` - Query with search keyword, category, mode & sorting
* `GET /api/internships/:id` - Get specific internship details
* `POST /api/internships` - Post new listing *(Admin only)*
* `PUT /api/internships/:id` - Update listing *(Admin only)*
* `DELETE /api/internships/:id` - Remove listing *(Admin only)*

### Applications (`/api/applications`)
* `GET /api/applications` - Get student's tracked applications
* `POST /api/applications` - Track a new internship application
* `PATCH /api/applications/:id/status` - Move application across Kanban stages
* `PUT /api/applications/:id` - Edit application details
* `DELETE /api/applications/:id` - Remove application

### AI Career Suite (`/api/ai`)
* `POST /api/ai/analyze-resume` - ATS score calculation & improvement suggestions
* `POST /api/ai/match-internship` - Match student profile against job requirements
* `POST /api/ai/skill-gap` - Identify missing skills & generate weekly roadmap
* `POST /api/ai/interview-questions` - Generate 5 tailored technical/behavioral questions
* `POST /api/ai/generate-cover-letter` - Draft custom cover letter
* `GET /api/ai/recommendations` - Skill-ranked internship recommendations

### Analytics & Notifications (`/api/analytics`, `/api/notifications`)
* `GET /api/analytics/student` - KPIs, status distribution, 6-month velocity
* `GET /api/analytics/admin` - Platform-wide telemetry & recent applications
* `GET /api/notifications` - Get unread deadline & interview alerts
* `PATCH /api/notifications/read-all` - Mark notifications as read
