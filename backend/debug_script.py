import sys
import os
import asyncio
from app.services.ml_engine import extract_text_from_url, analyze_text

# Mock env if needed
os.environ["MONGO_URL"] = "mongodb://localhost:27017"

# Test URL extraction
print("Testing URL extraction...")
url = "https://www.bbc.com/news/world-us-canada-68420300"
try:
    text = extract_text_from_url(url)
    print(f"Extraction result length: {len(text) if text else 'None'}")
    if text:
        # Test Analysis
        print("Testing Analysis...")
        result = analyze_text(text)
        print("Analysis Result:", result)
except Exception as e:
    print(f"CRASH DETECTED: {e}")
    import traceback
    traceback.print_exc()
