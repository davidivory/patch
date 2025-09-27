# PATCH – Practical App for Training Cybersecurity Hardening

PATCH is a modern, minimalist web application designed to help cybersecurity students practice blue-team skills through hands-on hardening. Inspired by DVWA but flipped for defense, PATCH guides learners through scanning, patching, and documenting real-world vulnerabilities in a safe, self-paced environment.

## What It Offers

- A deliberately vulnerable frontend and backend
- Guided walkthroughs with fill-in-the-blank journaling
- Markdown-based documentation for easy export
- Light/dark mode toggle for accessibility
- Modular structure for future expansion (network scanning, SIEM, etc.)

## Who It's For

- Cybersecurity students and job seekers
- Blue-team practitioners looking to sharpen skills
- Educators building hands-on curriculum
- Anyone preparing for SOC, GRC, or AppSec roles

## Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB Community Server
- Yarn or npm

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/davidivory/patch.git
cd patch
```

### 2. Set up MongoDB

1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB (it runs on port 27017 by default)
3. The application will create databases automatically when you run it

### 3. Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn server:app --host 0.0.0.0 --port 8000 --reload
   ```

The backend will be available at `http://localhost:8000`

### 4. Frontend Setup (React)

1. In a separate terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   yarn start
   # or
   npm start
   ```

The frontend will be available at `http://localhost:3000`

### Environment Variables

The backend uses environment variables defined in `backend/.env`:
- `MONGO_URL`: MongoDB connection string (default: `mongodb://localhost:27017`)
- `DB_NAME`: Database name (default: `patch_db`)

The frontend uses `frontend/.env`:
- `REACT_APP_BACKEND_URL`: Backend API URL (default: `http://localhost:8000`)


## Vulnerabilities Covered (Phase 1)
SQL Injection

Cross-Site Scripting (XSS)

Insecure Direct Object References (IDOR)

Security Misconfigurations

CSRF Risks

Open Redirects

Hardcoded Secrets

Log Injection

Weak Authentication & Session Handling

## Walkthrough Modules
Each module includes:

A brief intro to the vulnerability

Step-by-step scan instructions

A patch challenge

Fill-in-the-blank reflection

Exportable journal entry

## Repo Structure
PATCH-lab/
├── frontend/              # UI components and walkthrough renderer
├── backend/               # Vulnerable endpoints and logic
├── hardening-guide/       # Markdown walkthroughs
├── student-journal-template/ # Fill-in-the-blank journal
├── README.md              # You're here

## Future Plans
Add more vulnerabilities (e.g., insecure deserialization, broken access control)

Introduce network scanning modules (Nmap, Netcat, etc.)

Simulate SIEM and incident response workflows

Gamify progress and patch scoring

## License
MIT License. See LICENSE file for details.

Built with ❤️ by David and contributors. PATCH is open to collaboration—feel free to fork, contribute, or reach out.
