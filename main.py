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
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware

# Database Imports
from sqlalchemy.orm import Session
from database import init_db, get_db
# Models must be imported before init_db if they are not imported in database.py
import models 
from models import User, Place

# CONFIGURATION
# Security: Read ONLY from environment variables. Hardcoding here is a security risk.
raw_client_id = os.getenv("GOOGLE_CLIENT_ID", "")
raw_client_secret = os.getenv("GOOGLE_CLIENT_SECRET", "")

GOOGLE_CLIENT_ID = raw_client_id.strip()
GOOGLE_CLIENT_SECRET = raw_client_secret.strip()
SECRET_KEY = os.getenv("SECRET_KEY", "").strip()

# Senior check: If SECRET_KEY is missing in PRODUCTION, this is a critical failure.
if not SECRET_KEY:
    if os.getenv("RENDER"):
        logger.critical("SECRET_KEY IS MISSING IN RENDER ENVIRONMENT! Sessions will be unstable.")
    SECRET_KEY = "fallback-unstable-key-change-me" # Fallback for local dev only

# Defensive check for production
if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
    logger.error("GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set in environment!")
else:
    logger.info(f"OAuth configured with Client ID: {GOOGLE_CLIENT_ID[:5]}...{GOOGLE_CLIENT_ID[-5:]}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    logger.info("Checking database connectivity...")
    try:
        init_db()
        logger.info("DATABASE: Connected successfully. All tables verified.")
        
        # Check if DB is populated (Migration Check)
        db = next(get_db())
        count = db.query(Place).count()
        if count == 0:
            logger.warning("DATABASE IS EMPTY! Starting auto-population from data.js...")
            try:
                # Import migration script dynamically
                from scripts.import_data import import_data
                import_data()
                logger.info("AUTO-MIGRATION SUCCESSFUL! Data populated.")
            except Exception as e:
                logger.error(f"AUTO-MIGRATION FAILED: {e}")
        else:
            logger.info(f"DATABASE: Verified {count} objects present.")
            
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

# Middleware stack - Order matters: ProxyHeaders should be at the top
app.add_middleware(ProxyHeadersMiddleware, trusted_hosts="*")

# Session Middleware
# Renaming to v3 to force-clear any old/broken cookies in user browsers
app.add_middleware(
    SessionMiddleware, 
    secret_key=SECRET_KEY,
    session_cookie="geogr_session_v3",
    max_age=3600,
    same_site="lax",
    https_only=True if (os.getenv("RENDER") or os.getenv("SECURE_COOKIES")) else False,
    path="/"
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
    # Google OAuth strictly requires 'https' for production redirects.
    # High-level fix: ensure redirect_uri is absolutely consistent with what Google expects.
    base_url = str(request.base_url)
    
    # Force HTTPS for production/Render
    if os.getenv("RENDER") and base_url.startswith("http://"):
        base_url = base_url.replace("http://", "https://")
    
    redirect_uri = f"{base_url.rstrip('/')}/auth/google"
    
    logger.info(f"OAuth: Initiating login. base_url: {base_url} | redirect_uri: {redirect_uri}")
    
    # We clear the session BEFORE login to start fresh
    request.session.clear()
    
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
        logger.info(f"OAuth: Login successful for {db_user.email}. Session keys: {list(request.session.keys())}")
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

# API Endpoints
from models import Place

@app.get("/api/geo-data")
async def get_geo_data(db: Session = Depends(get_db)):
    places = db.query(Place).all()
    
    # Serialize manually to match exact JS structure expected by frontend
    data = []
    for p in places:
        # Reconstruct element
        item = {
            "id": p.id,
            "type": p.type,
            "name": p.name,
            "description": p.description,
            "origin": p.origin,
            "legend": p.legend,
            "wildlife": p.wildlife,
            "ecology": p.ecology,
            "facts": p.facts if p.facts else [],
            "tags": p.tags if p.tags else [],
            
            # Stats (only include if present)
            "length": p.length,
            "area": p.area,
            "depth": p.depth,
            "basin": p.basin,
            "source": p.source,
            "mouth": p.mouth,
            
            # Visuals
            "color": p.color,
            "radius": p.radius,
            
            # Geometry
            "center": p.center,
            "path": p.path
        }
        # Filter None values to keep payload clean/small? 
        # JS is fine with nulls, but cleaner to remove empty keys if originally not present
        data.append({k: v for k, v in item.items() if v is not None})
        
    return data

@app.get("/api/debug/reset-db")
async def reset_db(db: Session = Depends(get_db)):
    """Secret endpoint to force-repopulate the database."""
    try:
        from scripts.import_data import import_data
        import_data()
        return {"status": "success", "message": "Database re-populated from data.js"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

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
