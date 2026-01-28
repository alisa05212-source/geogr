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
    py_str = re.sub(r'(\s)(id|type|name|tags|area|depth|description|origin|legend|wildlife|ecology|facts|color|center|radius|path|source|mouth|len|basin|length):', r'\1"\2":', js_array_str)
    
    # 2. Comments removal
    py_str = re.sub(r'//.*', '', py_str)
    
    try:
        # Dangerous but effective for one-off migration of trusted file
        data = eval(py_str)
        
        logger.info(f"Parsed {len(data)} objects.")
        
        for item in data:
            try:
                # Prepare JSON fields
                facts = item.get('facts', [])
                tags = item.get('tags', [])
                center = item.get('center', None)
                path = item.get('path', None)
                
                # Check exist
                existing = session.query(Place).filter(Place.id == item['id']).first()
                
                if not existing:
                    place = Place(
                        id=item['id'],
                        type=item.get('type', 'river'),
                        name=item.get('name'),
                        description=item.get('description'),
                        origin=item.get('origin'),
                        legend=item.get('legend'),
                        wildlife=item.get('wildlife'),
                        ecology=item.get('ecology'),
                        
                        # Stats
                        length=item.get('length'),
                        area=item.get('area'),
                        depth=item.get('depth'),
                        basin=item.get('basin'),
                        source=item.get('source'),
                        mouth=item.get('mouth'),
                        
                        # Visuals
                        color=item.get('color'),
                        radius=item.get('radius'),
                        image=item.get('image'),
                        
                        # JSON fields
                        facts=facts,
                        tags=tags,
                        center=center,
                        path=path
                    )
                    session.add(place)
                    logger.info(f"Added: {item.get('name')}")
                else:
                    # Optional: Update existing
                    pass
            except Exception as e:
                logger.error(f"Error processing item {item.get('id', '?')}: {e}")
                
        session.commit()
        logger.info("Migration completed successfully!")
        
    except Exception as e:
        logger.error(f"Eval error: {e}")
        # Debug helper: print snippet where it failed?
        # print(py_str[:1000])

if __name__ == "__main__":
    import_data()
