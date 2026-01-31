from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import AnalysisRequest, AnalysisResult
from app.services.ml_engine import analyze_text, extract_text_from_url
from app.utils.security import verify_password
from app.routes.auth import users_collection 
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

router = APIRouter()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.truthlens
history_collection = db.history

@router.post("/", response_model=AnalysisResult)
async def analyze(request: AnalysisRequest):
    content_to_analyze = request.text
    
    if request.type == 'url' and request.url:
        print(f"Scraping URL: {request.url}")
        extracted_text = extract_text_from_url(request.url)
        if not extracted_text:
            return {
                "status": "warning", 
                "confidence": 0, 
                "summary": "Failed to scrape content from URL. It might be protected or inaccessible.", 
                "psychological": {}
            }
        content_to_analyze = extracted_text
    
    if not content_to_analyze or len(content_to_analyze) < 10:
         return {
            "status": "unknown",
            "confidence": 0,
            "summary": "Content too short to analyze.",
            "psychological": {}
        }

    # Perform ML Analysis
    result = analyze_text(content_to_analyze)
    
    # Save to History (Fire and Forget)
    try:
        await history_collection.insert_one({
            "type": request.type,
            "snippet": content_to_analyze[:200] + "...",
            "result": result,
            "timestamp": datetime.utcnow()
        })
    except Exception as e:
        print(f"Failed to save history: {e}")

    return result
