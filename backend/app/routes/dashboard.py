from fastapi import APIRouter
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.truthlens
history_collection = db.history

@router.get("/stats")
async def get_stats():
    # Real counts only. No random fallbacks.
    try:
        total = await history_collection.count_documents({})
        fake_count = await history_collection.count_documents({"result.status": "fake"})
        deep_count = await history_collection.count_documents({"type": "media"}) # Assuming 'media' type is tracked
        
        return {
            "verified": total,
            "threats": fake_count,
            "deepfakes": deep_count
        }
    except Exception as e:
        print(f"Stats error: {e}")
        return {
            "verified": 0,
            "threats": 0,
            "deepfakes": 0
        }
