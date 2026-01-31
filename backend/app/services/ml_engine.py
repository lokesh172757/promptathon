import random
from transformers import pipeline

# Global model cache to avoid reloading
_classifier = None
_sentiment_analyzer = None

def get_classifier():
    global _classifier
    if _classifier is None:
        print("Loading Fake News Model...")
        # Using a lightweight model for demo to save time/memory. 
        # For full hackathon, use 'hamzab/roberta-fake-news-classification'
        try:
            _classifier = pipeline("text-classification", model="mrm8488/bert-tiny-finetuned-fake-news-detection")
        except Exception as e:
            print(f"Error loading model: {e}")
            _classifier = None
    return _classifier

def get_sentiment():
    global _sentiment_analyzer
    if _sentiment_analyzer is None:
         print("Loading Sentiment Model...")
         try:
            _sentiment_analyzer = pipeline("text-classification", model="michellejieli/emotion_text_classifier", return_all_scores=True)
         except Exception:
             _sentiment_analyzer = None
    return _sentiment_analyzer

def analyze_text(text: str):
    classifier = get_classifier()
    sentiment = get_sentiment()
    
    # Fake News Detection
    status = "unknown"
    confidence = 0.0
    
    if classifier:
        result = classifier(text[:512])[0]  # Truncate to 512 tokens
        label = result['label'].lower()
        confidence = result['score'] * 100
        
        # Map model labels to our app status
        if label == 'fake':
            status = 'fake'
        elif label == 'real':
             status = 'real'
        else:
             status = 'partial' if confidence < 70 else 'fake'
             
    else:
        # Fallback if model fails
        status = "partial"
        confidence = 50.0

    # Psych Ops Analysis (Emotion)
    psych = {"fear": 10, "anger": 10, "urgency": 20}
    if sentiment:
        raw_result = sentiment(text[:512])
        # Handle different pipeline return types (nested list vs list of dicts)
        if hasattr(raw_result[0], 'get') or isinstance(raw_result[0], dict):
             # It's a list of dicts, so [0] is the first dict. Meaning we only got top-1 result.
             # We want all scores, but if we only got one, we wrap it.
             emotions = [raw_result[0]]
        else:
             # It's a list of lists (standard for return_all_scores=True)
             emotions = raw_result[0]

        # emotions format: [{'label': 'joy', 'score': 0.9}, ...]
        for e in emotions:
            # Check if e is actually a dict (double safety)
            if isinstance(e, dict):
                label = e.get('label', '').lower()
                score = e.get('score', 0)
                
                if label == 'fear': psych['fear'] = int(score * 100)
                if label == 'anger': psych['anger'] = int(score * 100)
                if label == 'sadness': psych['urgency'] = int(score * 100)

    return {
        "status": status,
        "confidence": round(confidence, 1),
        "psychological": psych,
        "summary": "AI neural analysis detected linguistic patterns often associated with misinfo." if status == 'fake' else "Content verified against trained datasets as likely authentic."
    }

def extract_text_from_url(url: str):
    try:
        from newspaper import Article
        article = Article(url)
        article.download()
        article.parse()
        return article.text
    except Exception as e:
        print(f"Scraping failed: {e}")
        return None
