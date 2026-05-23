from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from PIL import Image
import io

# ===================================
# GEMINI API
# ===================================

genai.configure(
    api_key="AIzaSyAtLUwv8mNrZivCLq7eUknwaraKgwUuJ5M"
)

model = genai.GenerativeModel(
    "gemini-pro-vision"
)

# ===================================
# FASTAPI APP
# ===================================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================================
# HOME
# ===================================

@app.get("/")
def home():

    return {
        "message": "Gemini AI Backend Running"
    }

# ===================================
# ANALYZE CROP
# ===================================

@app.post("/analyze-crop")
async def analyze_crop(file: UploadFile = File(...)):

    image_bytes = await file.read()

    image = Image.open(
        io.BytesIO(image_bytes)
    )

    prompt = """
    Analyze this crop image.

    Give:
    - Disease Name
    - Confidence
    - Symptoms
    - Treatment
    - Prevention
    - Telugu Advice

    Keep response short and farmer friendly.
    """

    response = model.generate_content(
        [prompt, image]
    )

    return {
        "result": response.text
    }