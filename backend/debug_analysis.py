import sys
import traceback

print("Importing ml_engine...")
try:
    from app.services.ml_engine import analyze_text
except Exception as e:
    print(f"IMPORT ERROR: {e}")
    traceback.print_exc()
    sys.exit(1)

print("Running analysis...")
try:
    text = "This is a test sentence to check if the model loads."
    result = analyze_text(text)
    print("RESULT:", result)
except Exception as e:
    print(f"CRASH: {e}")
    traceback.print_exc()
