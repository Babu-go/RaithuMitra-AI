from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

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

    return {
        "result": "🌿 Possible Disease: Early Blight",
        "treatment": "Use fungicide spray and avoid overwatering.",
        "telugu": "అధికంగా నీరు పోయవద్దు."
    }