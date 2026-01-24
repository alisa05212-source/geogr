from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuth, OAuthError
from starlette.config import Config
import uvicorn
import secrets
import os
import logging
from contextlib import asynccontextmanager

# Configure Logging IMMEDIATELY to capture startup errors
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database Imports
from sqlalchemy.orm import Session
from database import init_db, get_db, User

# CONFIGURATION
# Security: Read ONLY from environment variables. Hardcoding here is a security risk.
raw_client_id = os.getenv("GOOGLE_CLIENT_ID", "")
raw_client_secret = os.getenv("GOOGLE_CLIENT_SECRET", "")

GOOGLE_CLIENT_ID = raw_client_id.strip()
GOOGLE_CLIENT_SECRET = raw_client_secret.strip()
SECRET_KEY = os.getenv("SECRET_KEY", secrets.token_hex(32)).strip()

# Defensive check for production
if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
    logger.error("GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set in environment!")
else:
    # Senior practice: Log masked ID to verify the correct project is used
    logger.info(f"OAuth configured with Client ID: {GOOGLE_CLIENT_ID[:10]}...{GOOGLE_CLIENT_ID[-10:]}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    logger.info("Checking database connectivity...")
    try:
        init_db()
        logger.info("DATABASE: Connected successfully. All tables verified.")
    except Exception as e:
        logger.error(f"DATABASE: Connection failed at startup!")
        logger.error(f"Error Detail: {str(e)}")
        # In a senior environment, we might want to crash here if the DB is critical
        # raise e 
    yield
    # Shutdown logic (if needed)

app = FastAPI(lifespan=lifespan)

# Global Exception Handler for debugging production 500s
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"GLOBAL ERROR: {type(exc).__name__}: {str(exc)}")
    return HTMLResponse(
        content=f"""
        <div style='font-family: sans-serif; padding: 20px;'>
            <h1 style='color: #d9534f;'>Internal Server Error</h1>
            <p>Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.</p>
            <a href='/'>Вернуться на главную</a>
        </div>
        """,
        status_code=500
    )

# Session Middleware
# Refactored for custom domain: session security automatically scales based on RENDER env var
app.add_middleware(
    SessionMiddleware, 
    secret_key=SECRET_KEY,
    session_cookie="geogr_session",
    max_age=3600,
    same_site="lax",
    https_only=True if os.getenv("RENDER") else False
)

# Static Files & Templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# OAuth Setup
oauth = OAuth()
oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)

# ROUTES
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    user = request.session.get('user')
    return templates.TemplateResponse("index.html", {"request": request, "user": user})

@app.get('/login/google')
async def login_google(request: Request):
    # Redirect URL must match what you set in Google Console
    redirect_uri = request.url_for('auth_google')
    
    # Senior fix: Render/Cloud proxies often report 'http' to FastAPI.
    # Google OAuth strictly requires 'https' for production redirects.
    if 'localhost' not in str(request.base_url):
        redirect_uri = str(redirect_uri).replace('http://', 'https://')
    
    logger.info(f"OAuth request redirect_uri: {redirect_uri}")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get('/auth/google')
async def auth_google(request: Request, db: Session = Depends(get_db)):
    try:
        logger.info("Handling Google OAuth callback...")
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get('userinfo')
        if not user_info:
             user_info = await oauth.google.parse_id_token(request, token)
        
        logger.info(f"User authenticated: {user_info.get('email')}")
        
        # Check if user exists in DB
        db_user = db.query(User).filter(User.google_id == user_info['sub']).first()
        
        if not db_user:
            logger.info("Creating new user in database...")
            new_user = User(
                google_id=user_info['sub'],
                email=user_info.get('email'),
                name=user_info.get('name'),
                picture=user_info.get('picture')
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            db_user = new_user
            
        # Store essential info in session
        request.session['user'] = {
            'name': db_user.name,
            'picture': db_user.picture,
            'email': db_user.email,
            'id': db_user.id
        }
        logger.info("Session stored successfully.")
        return RedirectResponse(url='/')

    except Exception as e:
        logger.error(f"Error during OAuth callback: {str(e)}")
        # Senior move: return the error to the screen for easy debugging in production
        return HTMLResponse(f"""
            <h1>Internal Server Error</h1>
            <p>Something went wrong during login.</p>
            <pre style='background: #eee; padding: 10px;'>{type(e).__name__}: {str(e)}</pre>
            <a href='/'>Return to Home</a>
        """)

@app.get('/logout')
async def logout(request: Request):
    request.session.pop('user', None)
    return RedirectResponse(url='/')

@app.get('/admin/users', response_class=HTMLResponse)
async def admin_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    html_content = "<h1>Registered Users</h1><ul>"
    for user in users:
        html_content += f"<li>ID: {user.id} | Name: {user.name} | Email: {user.email}</li>"
    html_content += "</ul>"
    return html_content


if __name__ == "__main__":
    print("Starting server at http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
