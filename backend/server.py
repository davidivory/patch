from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password: str  # Stored in plain text for vulnerability
    email: str
    profile: str = ""  # For stored XSS
    is_admin: bool = False

class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class Session(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class File(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    filename: str
    content: str  # Base64 or something, but for vuln, no validation

class LogEntry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Authentication & Session Vulnerabilities
@api_router.post("/login")
async def login(username: str, password: str):
    # Vulnerable to NoSQL Injection via eval
    query_str = f"{{'username': '{username}', 'password': '{password}'}}"
    query = eval(query_str)
    user = await db.users.find_one(query)
    if user:
        session = Session(user_id=user['id'])
        await db.sessions.insert_one(session.dict())
        return {"session_id": session.id, "user": User(**user)}
    return {"error": "Invalid credentials"}

@api_router.post("/register", response_model=User)
async def register(user: UserCreate):
    # Weak password policy: no enforcement
    user_obj = User(**user.dict())
    await db.users.insert_one(user_obj.dict())
    return user_obj

@api_router.post("/logout")
async def logout(session_id: str):
    # Missing session invalidation: session persists
    return {"message": "Logged out"}

@api_router.get("/session/{session_id}", response_model=Session)
async def get_session(session_id: str):
    # IDOR: can access any session by guessing/changing ID
    session = await db.sessions.find_one({"id": session_id})
    if session:
        return Session(**session)
    return {"error": "Session not found"}

# User & File Handling Vulnerabilities
@api_router.get("/search")
async def search(q: str):
    # Reflected XSS: unsanitized output
    return {"results": f"<div>Search results for {q}</div>"}

@api_router.get("/profile/{username}", response_model=User)
async def get_profile(username: str):
    user = await db.users.find_one({"username": username})
    if user:
        return User(**user)
    return {"error": "User not found"}

@api_router.put("/profile/{username}")
async def update_profile(username: str, profile: str):
    # CSRF risk: no token
    # Stored XSS: profile not sanitized
    await db.users.update_one({"username": username}, {"$set": {"profile": profile}})
    return {"message": "Profile updated"}

@api_router.post("/upload", response_model=File)
async def upload_file(user_id: str, filename: str, content: str):
    # Unvalidated file upload: no MIME/type check
    file_obj = File(user_id=user_id, filename=filename, content=content)
    await db.files.insert_one(file_obj.dict())
    return file_obj

@api_router.get("/files/{file_id}", response_model=File)
async def get_file(file_id: str):
    # IDOR: can access any file
    file = await db.files.find_one({"id": file_id})
    if file:
        return File(**file)
    return {"error": "File not found"}

@api_router.delete("/delete")
async def delete_file(file_id: str):
    # Improper access control: can delete any
    await db.files.delete_one({"id": file_id})
    return {"message": "Deleted"}

# Configuration & Exposure Vulnerabilities
@api_router.get("/admin/config")
async def get_config():
    # Hardcoded secrets, exposed config
    return {
        "db_url": mongo_url,
        "db_name": os.environ['DB_NAME'],
        "secret_key": "hardcoded_secret",
        "api_key": "exposed_api_key"
    }

@api_router.get("/redirect")
async def redirect(url: str):
    # Open redirect
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url)

@api_router.get("/debug")
async def debug():
    # Exposed debug info
    import traceback
    return {
        "env": dict(os.environ),
        "stack": traceback.format_stack()
    }

@api_router.get("/admin/logs", response_model=List[LogEntry])
async def get_logs():
    logs = await db.logs.find().to_list(1000)
    return [LogEntry(**log) for log in logs]

@api_router.post("/admin/logs", response_model=LogEntry)
async def add_log(message: str):
    # Log injection: unsanitized input
    log_obj = LogEntry(message=message)
    await db.logs.insert_one(log_obj.dict())
    logger.info(message)
    return log_obj

@api_router.get("/admin/users", response_model=List[User])
async def get_users():
    # Improper access control: can list all users
    users = await db.users.find().to_list(1000)
    return [User(**user) for user in users]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
