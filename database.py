from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

import os

# Database Setup
import logging
logger = logging.getLogger(__name__)

# Get the DATABASE_URL and strip any potential whitespace/newlines
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./users.db").strip()

# Senior fix: Mandatoy format adjustments for SQLAlchemy
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Senior fix: Auto-patch Render's short hostnames
# We use simple string replacement to avoid mangling passwords with special characters (@, :, etc)
if "dpg-" in DATABASE_URL and ".render.com" not in DATABASE_URL:
    # Find the part after '@' and replace it with its full version
    parts = DATABASE_URL.split("@")
    if len(parts) > 1:
        # parts[0] is postgresql://user:pass
        # parts[1] is host/db
        host_info = parts[-1].split("/")
        host = host_info[0]
        if host.startswith("dpg-"):
            new_host = host + ".frankfurt-postgres.render.com"
            DATABASE_URL = DATABASE_URL.replace(f"@{host}/", f"@{new_host}/")

# Enforce SSL for any non-sqlite connection
connect_args = {}
if "sqlite" not in DATABASE_URL:
    connect_args = {"sslmode": "require"}
    # Ensure it's in the query params too
    if "sslmode=" not in DATABASE_URL:
        DATABASE_URL += "?sslmode=require" if "?" not in DATABASE_URL else "&sslmode=require"

# Masking for safe logging (minimal)
def get_masked_url(url):
    try:
        # Just show the hostname
        return url.split("@")[-1].split("/")[0] if "@" in url else "sqlite"
    except: return "parsing-error"

logger.info(f"Connecting to: {get_masked_url(DATABASE_URL)}")

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
