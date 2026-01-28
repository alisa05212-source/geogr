from sqlalchemy import Column, Integer, String, JSON, Text
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    google_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    picture = Column(String)

class Place(Base):
    __tablename__ = "places"

    id = Column(String, primary_key=True, index=True) # e.g. "dnipro"
    type = Column(String, index=True) # river, lake, reservoir, marsh
    name = Column(String)
    description = Column(Text, nullable=True)
    
    # Extended Metadata
    origin = Column(Text, nullable=True)
    legend = Column(Text, nullable=True)
    wildlife = Column(Text, nullable=True)
    ecology = Column(Text, nullable=True)
    facts = Column(JSON, nullable=True) # List of strings
    tags = Column(JSON, nullable=True)  # List of strings e.g. ["top"]
    
    # Stats
    length = Column(String, nullable=True)
    area = Column(String, nullable=True)
    depth = Column(String, nullable=True)
    basin = Column(String, nullable=True)
    source = Column(String, nullable=True)
    mouth = Column(String, nullable=True)
    
    # Geometry & Display
    color = Column(String, nullable=True)
    radius = Column(Integer, nullable=True)
    center = Column(JSON, nullable=True) # [lat, lng]
    path = Column(JSON, nullable=True)   # [[lat, lng], ...]
    image = Column(String, nullable=True)
