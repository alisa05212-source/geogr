from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

import os

# Database Setup
import logging
logger = logging.getLogger(__name__)

# Get and clean the DATABASE_URL
raw_url = os.getenv("DATABASE_URL", "sqlite:///./users.db")
DATABASE_URL = raw_url.strip() if raw_url else "sqlite:///./users.db"

# Format fix for SQLAlchemy
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Senior fix: Auto-patch Render's short hostnames to include regional suffix
# This prevents "could not resolve host" and ensures we use external access correctly
if "dpg-" in DATABASE_URL and ".render.com" not in DATABASE_URL:
    # Find the host part (after @ and before /)
    if "@" in DATABASE_URL:
        pre_host, post_host = DATABASE_URL.split("@", 1)
        host_and_path = post_host.split("/", 1)
        host = host_and_path[0]
        # Append Frankfurt suffix if it's a Render DB ID
        if host.startswith("dpg-") and ".frankfurt-postgres.render.com" not in host:
            new_host = host + ".frankfurt-postgres.render.com"
            DATABASE_URL = f"{pre_host}@{new_host}/{host_and_path[1]}"

# Senior fix: Ensure SSL is required for cloud databases
connect_args = {}
if "sqlite" not in DATABASE_URL:
    connect_args = {"sslmode": "require"}
    # Also add it to the URL query string for safety
    if "sslmode=" not in DATABASE_URL:
        DATABASE_URL += "?sslmode=require" if "?" not in DATABASE_URL else "&sslmode=require"

# Masking password for safe logging
def get_masked_url(url):
    try:
        if "@" in url:
            return url.split("@")[-1].split("?")[0] # Show host only
        return "sqlite"
    except: return "error"

logger.info(f"Connecting to DB: {get_masked_url(DATABASE_URL)}")

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
