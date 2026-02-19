import sys
import os
import re
import json
import logging

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants to help python parse JS-like content
true = True
false = False
null = None
RIVER_COLOR = "#0ea5e9"
LAKE_COLOR = "#38bdf8"
SALT_COLOR = "#f472b6"
MARSH_COLOR = "#4ade80"
GROUND_COLOR = "#c084fc"

def extract_json():
    data_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'static', 'js', 'data.js')
    json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'static', 'data.json')
    
    with open(data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the array content
    match = re.search(r'const GEO_DATA = (\[.*\]);', content, re.DOTALL)
    if not match:
        logger.error("Could not find GEO_DATA const!")
        return

    js_array_str = match.group(1)
    
    # Transformation to make it Python-valid
    py_str = re.sub(r'(\s)([a-zA-Z_0-9]+):', r'\1"\2":', js_array_str)
    py_str = re.sub(r'//.*', '', py_str)
    
    try:
        data = eval(py_str)
        logger.info(f"Parsed {len(data)} objects from data.js. Saving to {json_path}...")
        
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        logger.info("SUCCESS: data.json created!")
        
    except Exception as e:
        logger.error(f"Eval error: {e}")

if __name__ == "__main__":
    extract_json()
