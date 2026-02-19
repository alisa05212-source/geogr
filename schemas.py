from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Literal, Any, Dict, Union

# --- BASE MODELS ---

class GeoProperties(BaseModel):
    """
    Standardized properties for all geographical objects.
    Uses strict typing where possible, fallback to Optional for legacy flexibility.
    """
    name: str = Field(..., description="Official name of the object")
    description: Optional[str] = None
    category: str = Field(..., description="Sphere: hydrosphere, lithosphere, etc.")
    type: str = Field(..., description="Specific type: river, lake, mountain, etc.")
    
    # Extended Metadata
    origin: Optional[str] = None
    legend: Optional[str] = None
    wildlife: Optional[str] = None
    ecology: Optional[str] = None
    
    # Lists
    facts: List[str] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)
    
    # Legacy Attributes (kept for backward compatibility, but can be moved to 'attributes')
    length: Optional[str] = None
    area: Optional[str] = None
    depth: Optional[str] = None
    basin: Optional[str] = None
    source: Optional[str] = None
    mouth: Optional[str] = None
    
    # Visuals
    color: Optional[str] = None
    radius: Optional[int] = None
    image: Optional[str] = None
    
    # Flexible container for extra data (wind speed, temperature, etc.)
    attributes: Dict[str, Any] = Field(default_factory=dict)
    
    model_config = ConfigDict(from_attributes=True)


class GeometryPoint(BaseModel):
    type: Literal["Point"]
    coordinates: List[float] # [lat, lng] for now, but GeoJSON standard is [lng, lat]. We will stick to [lat, lng] for internal consistency if needed, or convert.
    # NOTE: Leaflet uses [Lat, Lng]. GeoJSON uses [Lng, Lat]. 
    # To keep it simple for now, we will assume coordinates are passed as they are in DB (Leaflet format).
    # But for TRUE GeoJSON, we might need a stressful conversion. 
    # Let's keep it as is for internal API, front-end knows how to handle it.

class GeometryLineString(BaseModel):
    type: Literal["LineString"]
    coordinates: List[List[float]] # [[lat, lng], ...]

class GeometryPolygon(BaseModel):
    type: Literal["Polygon"]
    coordinates: List[List[List[float]]] # [[[lat, lng], ...]]

# Union of all geometry types
Geometry = Union[GeometryPoint, GeometryLineString, GeometryPolygon]


class GeoFeature(BaseModel):
    """
    Standard GeoJSON Feature.
    """
    type: Literal["Feature"] = "Feature"
    id: str
    geometry: Optional[Dict[str, Any]] = None # Flexible to allow internal formats or standard GeoJSON
    properties: GeoProperties

    model_config = ConfigDict(from_attributes=True)


class GeoFeatureCollection(BaseModel):
    """
    Root API Response.
    """
    type: Literal["FeatureCollection"] = "FeatureCollection"
    features: List[GeoFeature]
