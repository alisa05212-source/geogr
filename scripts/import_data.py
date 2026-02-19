import sys
import os
import json
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import Base, engine, SessionLocal, init_db
from models import GeoObject

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def import_data():
    logger.info("Initializing DB...")
    init_db()
    session = SessionLocal()
    
    # Path to the new clean JSON file
    data_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'static', 'data.json')
    
    if not os.path.exists(data_path):
        logger.error(f"CRITICAL: {data_path} not found! Run the conversion script first.")
        return

    try:
        with open(data_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        logger.info(f"Loaded {len(data)} objects from data.json")
        
        for item in data:
            try:
                # Prepare fields
                # We need to map JSON keys to DB columns if they differ, but they should be mostly 1:1 now
                # Pydantic validation handles the API side, here we just dump to DB.
                
                # Check if exists
                existing = session.query(GeoObject).filter(GeoObject.id == item['id']).first()
                
                # Filter out keys that might not exist in DB model to be safe (though we control the model)
                # For now, we trust the schema matches, or we handle exceptions
                
                # Construct the object dictionary safely
                obj_data = {
                    "id": item.get('id'),
                    "category": item.get('category', 'hydrosphere'),
                    "layer_type": item.get('layer_type', 'point'),
                    "type": item.get('type'),
                    "name": item.get('name'),
                    "description": item.get('description'),
                    "origin": item.get('origin'),
                    "legend": item.get('legend'),
                    "wildlife": item.get('wildlife'),
                    "ecology": item.get('ecology'),
                    "facts": item.get('facts', []),
                    "tags": item.get('tags', []),
                    "attributes": item.get('attributes', {}), # New field for extra data
                    
                    # Legacy fields (optional)
                    "length": item.get('length'),
                    "area": item.get('area'),
                    "depth": item.get('depth'),
                    "basin": item.get('basin'),
                    "source": item.get('source'),
                    "mouth": item.get('mouth'),
                    
                    # Visuals
                    "color": item.get('color'),
                    "radius": item.get('radius'),
                    "image": item.get('image'),
                    
                    # Geometry
                    "center": item.get('center'),
                    "path": item.get('path')
                }
                
                # Update logic
                if existing:
                    for key, value in obj_data.items():
                        setattr(existing, key, value)
                    logger.info(f"Updated: {item.get('name')}")
                else:
                    new_obj = GeoObject(**obj_data)
                    session.add(new_obj)
                    logger.info(f"Created: {item.get('name')}")
                    
            except Exception as e:
                logger.error(f"Error processing item {item.get('id')}: {e}")
                
        session.commit()
        logger.info("DATABASE SYNC COMPLETE! (Via Safe JSON)")
        
    except Exception as e:
        logger.error(f"Import failed: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    import_data()
