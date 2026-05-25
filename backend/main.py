from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import random
import time

app = FastAPI()

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

    time.sleep(2)

    diseases = [

        {
            "result": "🌿 Early Blight",
            "confidence": "94%",
            "symptoms": [
                "Brown circular spots",
                "Yellow leaf edges",
                "Dry infected leaves"
            ],
            "treatment": "Use fungicide spray and remove damaged leaves.",
            "prevention": "Avoid overwatering and improve air circulation.",
            "telugu": "అధికంగా నీరు పోయవద్దు."
        },

        {
            "result": "🍂 Leaf Spot",
            "confidence": "91%",
            "symptoms": [
                "Dark brown spots",
                "Leaf discoloration",
                "Weak plant growth"
            ],
            "treatment": "Apply copper fungicide regularly.",
            "prevention": "Keep leaves dry and maintain spacing.",
            "telugu": "ఆకులను పొడిగా ఉంచండి."
        },

        {
            "result": "🌾 Healthy Crop",
            "confidence": "98%",
            "symptoms": [
                "Healthy green leaves",
                "Strong stem growth",
                "No visible disease"
            ],
            "treatment": "No treatment required.",
            "prevention": "Continue healthy irrigation practices.",
            "telugu": "పంట ఆరోగ్యంగా ఉంది."
        }

    ]

    return random.choice(diseases)