# PATCH – Practical App for Training Cybersecurity Hardening

PATCH is a modern, minimalist web application designed to help cybersecurity students practice blue-team skills through hands-on hardening. Inspired by DVWA but flipped for defense, PATCH guides learners through scanning, patching, and documenting real-world vulnerabilities in a safe, self-paced environment.

## Learning Workflow

PATCH follows a Complete Vulnerability Assessment and Remediation Process:

1. **Scan the Application** - Use vulnerability scanners or manual testing to discover security flaws
2. **Review Vulnerabilities** - Examine scanner results and study identified weaknesses
3. **Learn Through Walkthroughs** - Access interactive tutorials explaining each vulnerability
4. **Implement Fixes** - Modify code to resolve security issues
5. **Rescan and Verify** - Retest to confirm vulnerabilities are resolved
6. **Document Your Journey** - Export your learning notes and achievements

## What It Offers

- A deliberately vulnerable frontend and backend with intentional security flaws
- Guided walkthroughs with fill-in-the-blank journaling
- Interactive vulnerability assessment process
- Before/after scanning to track progress
- Markdown-based documentation for easy export
- Light/dark mode toggle for accessibility
- Modular structure for future expansion (network scanning, SIEM, etc.)

## Who It's For

- Cybersecurity students learning vulnerability assessment
- Security professionals developing secure coding skills
- Blue-team practitioners practicing defense techniques
- Educators building interactive cybersecurity curriculum
- Anyone preparing for SOC, GRC, or AppSec certifications and roles

## Prerequisites

- Python 3.8+
- Node.js 16+
- Docker Desktop
- Yarn or npm

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/davidivory/patch.git
cd patch
```

### 2. Set up MongoDB with Docker

1. Ensure Docker Desktop is installed and running.
2. Run MongoDB in a Docker container:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```
3. The application will create databases automatically when you run it

### 3. Backend Setup (FastAPI)

1. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. Start the FastAPI server from the project root:
   ```bash
   python -m uvicorn backend.server:app --reload
   ```

The backend will be available at `http://localhost:8000`

### 4. Frontend Setup (React) [Optional - Currently has dependency conflicts]

⚠️ **Note**: The frontend currently has dependency compatibility issues (ajv/ajv-keywords) that prevent it from starting. The backend works fine for API testing, but the frontend UI won't start until compatibility is resolved.

**Recommended Solutions:**
```bash
# Option 1: Install compatible ajv versions
cd frontend
npm install ajv@8.6.3 ajv-keywords@5.1.0 --legacy-peer-deps

# Option 2: Clean reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Option 3: Use yarn (may have better dependency resolution)
cd frontend
yarn install --ignore-engines
```

**Installation Instructions:**
1. Install Node.js dependencies:
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   ```

2. If successful, start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000` (when working)

**Alternative**: Use the backend API directly via http://localhost:8000/docs (Swagger UI) for now

### 5. Scan the Application (Vulnerability Assessment)

Once the application is running, perform initial vulnerability assessment:

**Manual Testing Options:**
- Visit `http://localhost:3000` in your browser
- Register/test login functionality
- Check for insecure behaviors
- Test various inputs and edge cases

**Automated Scanning Tools:**
- **OWASP ZAP**: Open-source web application scanner
  ```bash
  # Start ZAP GUI
  zap.sh

  # Or use ZAP proxy for automated scanning
  ```

- **Burp Suite Community Edition**: Intercepting proxy and scanner
- **Nikto**: Web server scanner
  ```bash
  nikto -h http://localhost:3000
  ```

- **sqlmap**: SQL injection testing
  ```bash
  sqlmap -u "http://localhost:3000/search?q=test" --batch
  ```

**Recommended Initial Scan Commands:**
```bash
# Quick web server scan (when frontend is working)
nikto -h http://localhost:3000

# Scan for common API vulnerabilities (always available)
curl -s http://localhost:8000/api/debug  # Check for exposed debug info
curl -s http://localhost:8000/api/admin/config  # Check for exposed config
curl -s http://localhost:8000/api/admin/logs  # Check for log exposure
curl -s http://localhost:8000/api/admin/users  # Check for user enumeration

# Test SQL injection vulnerability in login
curl -X POST http://localhost:8000/api/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "password"}' || true'
```

### 6. Learn Through Interactive Walkthroughs

After scanning and identifying vulnerabilities, access the learning content:

- Visit `http://localhost:3000/walkthroughs` to browse available modules
- Complete interactive tutorials explaining each vulnerability
- Review prevention techniques and secure coding best practices
- Document your findings in guided journal entries

### 7. Implement Security Fixes

Modify the code to resolve vulnerabilities found in your scans:

**Example Fixes (from walkthroughs):**
```python
# backend/server.py - Fix weak authentication
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash passwords securely
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
```

**Key Areas to Harden:**
- Replace plaintext password storage with bcrypt hashing
- Add input validation to all endpoints
- Implement proper session management
- Add email verification requirements
- Remove hard-coded secrets and exposed debug endpoints

### 8. Rescan and Verify Fixes

After implementing fixes, repeat your vulnerability assessment:

```bash
# Rescan with Nikto
nikto -h http://localhost:3000

# Check if debug endpoint is removed
curl http://localhost:3000/api/debug  # Should return 403/404

# Test registration with password policy
# User enumeration should be mitigated
# Hashed passwords in database
```

**Track Your Progress:**
- Compare scanner results before/after fixes
- Verify vulnerabilities are resolved
- Export your learning documentation
- Celebrate your security hardening achievements!

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
