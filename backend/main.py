from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# Enable CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():

    return {
        "message": "Backend Running"
    }

@app.post("/analyze-crop")
async def analyze_crop(file: UploadFile = File(...)):

    # Fake AI processing delay

    time.sleep(3)

    return {

        "result": "🌿 Early Blight",

        "confidence": "92%",

        "symptoms": [
            "Brown circular spots on leaves",
            "Yellowing around infected areas",
            "Dry and damaged leaf edges"
        ],

        "treatment": "Use fungicide spray and remove infected leaves.",

        "prevention": "Avoid overwatering and improve air circulation.",

        "telugu": "అధికంగా నీరు పోయవద్దు మరియు పంటకు గాలి సరిగా అందేలా చూడండి."

    }