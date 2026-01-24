from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

import os

# Database Setup
import logging
logger = logging.getLogger(__name__)

# Check for DATABASE_URL environment variable (from Render/Railway)
# If not found or empty, fallback to local SQLite
raw_url = os.getenv("DATABASE_URL", "")
DATABASE_URL = raw_url.strip() if raw_url else "sqlite:///./users.db"

# Second fallback if the stripped URL is empty
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///./users.db"

# Fix for Render's Postgres URL start with "postgres://" which SQLAlchemy doesn't like (wants "postgresql://")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Masking password for safe logging
if "@" in DATABASE_URL:
    try:
        # Better extraction of hostname for debugging
        parts = DATABASE_URL.split("@")
        if len(parts) > 1:
            host_part = parts[-1].split("/")[0]
            logger.info(f"Connecting to database host: {host_part} (Length: {len(host_part)})")
        else:
            logger.warning("DATABASE_URL has '@' but is malformed.")
    except Exception as e:
        logger.error(f"Failed to parse DATABASE_URL for logging: {e}")
else:
    logger.info(f"Connecting to database: {DATABASE_URL}")

# Senior fix: Ensure we don't try to connect if the URL is literally "..." or too short
if len(DATABASE_URL) < 20 and "sqlite" not in DATABASE_URL:
    logger.error("DANGER: DATABASE_URL looks corrupted or incomplete!")
    # Fallback to sqlite to at least allow the app to start
    DATABASE_URL = "sqlite:///./users.db"

connect_args = {}
if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}
else:
    # Render (and most cloud Postgres) requires SSL
    connect_args = {"sslmode": "require"}

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
