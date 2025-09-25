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

##  Getting Started

bash
git clone https://github.com/yourusername/PATCH-lab.git
cd PATCH-lab
# Follow setup instructions in /frontend and /backend folders

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
