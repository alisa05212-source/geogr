import sys
import os
import re
import json
import logging
import ast

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal, init_db
from models import Place

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants to help python parse JS-like content
true = True
false = False
null = None
# Color constants mock
RIVER_COLOR = "#0ea5e9"
LAKE_COLOR = "#06b6d4"
SALT_COLOR = "#db2777"
MARSH_COLOR = "#4d7c0f"
GROUND_COLOR = "#a855f7"

def import_data():
    logger.info("Initializing DB...")
    init_db()
    session = SessionLocal()
    
    data_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'static', 'js', 'data.js')
    
    with open(data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the array content
    match = re.search(r'const GEO_DATA = (\[.*\]);', content, re.DOTALL)
    if not match:
        logger.error("Could not find GEO_DATA const!")
        return

    js_array_str = match.group(1)
    
    # Transformation to make it Python-valid
    # 1. Unquote keys? No, Python requires quoted keys in dicts. 
    # But the JS file has `id: "val"`. We need to quote keys: id: -> "id":
    # Regex to quote keys that are essentially identifiers
    # Transformation to make it Python-valid
    # 1. Quote ALL keys that look like JS object keys: key: -> "key":
    py_str = re.sub(r'(\s)([a-zA-Z_0-9]+):', r'\1"\2":', js_array_str)
    
    # 2. Comments removal
    py_str = re.sub(r'//.*', '', py_str)
    
    try:
        # Use literal_eval if possible for safety, but eval is needed here for nested lists/colors
        data = eval(py_str)
        
        logger.info(f"Parsed {len(data)} objects from data.js.")
        
        for item in data:
            try:
                # Prepare fields
                fields = {
                    "type": item.get('type', 'river'),
                    "name": item.get('name'),
                    "description": item.get('description'),
                    "origin": item.get('origin'),
                    "legend": item.get('legend'),
                    "wildlife": item.get('wildlife'),
                    "ecology": item.get('ecology'),
                    "length": item.get('length'),
                    "area": item.get('area'),
                    "depth": item.get('depth'),
                    "basin": item.get('basin'),
                    "source": item.get('source'),
                    "mouth": item.get('mouth'),
                    "color": item.get('color'),
                    "radius": item.get('radius'),
                    "image": item.get('image'),
                    "facts": item.get('facts', []),
                    "tags": item.get('tags', []),
                    "center": item.get('center'),
                    "path": item.get('path')
                }
                
                # REPLACEMENT STRATEGY: Update or Create
                existing = session.query(Place).filter(Place.id == item['id']).first()
                
                if existing:
                    # Update all fields
                    for key, value in fields.items():
                        setattr(existing, key, value)
                    logger.info(f"Updated: {item.get('name')}")
                else:
                    place = Place(id=item['id'], **fields)
                    session.add(place)
                    logger.info(f"Created: {item.get('name')}")
                    
            except Exception as e:
                logger.error(f"Error processing item {item.get('id', '?')}: {e}")
                
        session.commit()
        logger.info("DATABASE SYNC COMPLETE!")
        
    except Exception as e:
        logger.error(f"Eval error: {e}")
        # Debug helper: print snippet where it failed?
        # print(py_str[:1000])

if __name__ == "__main__":
    import_data()
