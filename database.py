from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

import os

# Database Setup
import logging
logger = logging.getLogger(__name__)

from urllib.parse import urlparse, urlunparse

# Get and clean the DATABASE_URL
raw_url = os.getenv("DATABASE_URL", "sqlite:///./users.db")
DATABASE_URL = raw_url.strip() if raw_url else "sqlite:///./users.db"

def build_stable_url(url):
    if "sqlite" in url:
        return url
    
    # Format fix for SQLAlchemy
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    
    try:
        parsed = urlparse(url)
        host = parsed.hostname or ""
        
        # Senior fix: Auto-patch Render's short hostnames to include regional suffix
        if host.startswith("dpg-") and "render.com" not in host:
            host = f"{host}.frankfurt-postgres.render.com"
        
        # Ensure SSL requirement for cloud
        query = parsed.query
        if "sslmode=" not in query:
            query = f"{query}&sslmode=require" if query else "sslmode=require"
            
        # Rebuild netloc carefully
        netloc = parsed.username or ""
        if parsed.password:
            netloc += f":{parsed.password}"
        if netloc:
            netloc += "@"
        netloc += host
        if parsed.port:
            netloc += f":{parsed.port}"
            
        return urlunparse((parsed.scheme, netloc, parsed.path, parsed.params, query, parsed.fragment))
    except Exception as e:
        logger.error(f"Critical URL parsing error: {e}")
        return url

DATABASE_URL = build_stable_url(DATABASE_URL)

# SSL configuration for SQLAlchemy engine
connect_args = {}
if "sqlite" not in DATABASE_URL:
    connect_args = {"sslmode": "require"}

# Masking for safety
def get_masked_url(url):
    try:
        p = urlparse(url)
        return f"{p.scheme}://***:***@{p.hostname}/{p.path.lstrip('/')}"
    except: return "error"

logger.info(f"Final Connection Target: {get_masked_url(DATABASE_URL)}")

# pool_pre_ping=True is essential for cloud DBs to handle dropped connections automatically
engine = create_engine(DATABASE_URL, connect_args=connect_args, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    google_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    picture = Column(String)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
