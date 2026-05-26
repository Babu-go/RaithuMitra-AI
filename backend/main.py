from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from ai_service import analyze_crop_image

# =========================================
# FASTAPI APP
# =========================================

app = FastAPI()

# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# HOME ROUTE
# =========================================

@app.get("/")
def home():

    return {
        "message": "🌱 NEW AI VALIDATION BACKEND"
    }

# =========================================
# ANALYZE ROUTE
# =========================================

@app.post("/analyze-crop")
async def analyze_crop(
    file: UploadFile = File(...)
):

    result = await analyze_crop_image(file)

    return result