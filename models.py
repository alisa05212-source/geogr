from sqlalchemy import Column, Integer, String, JSON, Text
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    google_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    picture = Column(String)

class GeoObject(Base):
    __tablename__ = "geo_objects" # Renamed table for clarity

    id = Column(String, primary_key=True, index=True) # e.g. "dnipro"
    category = Column(String, index=True, default="hydrosphere") # lithosphere, atmosphere, biosphere, hydrosphere
    layer_type = Column(String, default="path") # point, path, polygon, heatmap, wind
    
    type = Column(String, index=True) # Specific type: river, lake, mountain, wind_arrow
    name = Column(String)
    description = Column(Text, nullable=True)
    
    # Extended Metadata
    origin = Column(Text, nullable=True)
    legend = Column(Text, nullable=True)
    wildlife = Column(Text, nullable=True)
    ecology = Column(Text, nullable=True)
    facts = Column(JSON, nullable=True) # List of strings
    tags = Column(JSON, nullable=True)  # List of strings
    
    # Universal Attributes (Flexible storage for specific fields like wind speed, height, etc)
    attributes = Column(JSON, nullable=True) 

    # Legacy Water Stats (Can be moved to attributes later, kept for now)
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
    coordinates = Column(JSON, nullable=True) # Unified geometry field (future proofing)
    image = Column(String, nullable=True)

