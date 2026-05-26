from groq import Groq
import base64
import json
import os
import traceback
from dotenv import load_dotenv

# =========================================
# LOAD ENV
# =========================================

load_dotenv()

# =========================================
# GROQ CLIENT
# =========================================

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# =========================================
# SAFE JSON PARSER
# =========================================

def safe_parse_json(text):
    text = text.strip()
    text = text.replace("```json", "").replace("```", "").strip()
    start = text.find("{")
    end = text.rfind("}") + 1
    if start == -1 or end == 0:
        raise ValueError("No JSON found")
    return json.loads(text[start:end])

# =========================================
# ANALYZE FUNCTION
# =========================================

async def analyze_crop_image(file):

    try:

        # =========================================
        # READ IMAGE & CONVERT TO BASE64
        # =========================================

        image_bytes = await file.read()

        image_base64 = base64.b64encode(
            image_bytes
        ).decode("utf-8")

        # =========================================
        # DETECT FILE TYPE
        # =========================================

        filename = file.filename.lower()

        if filename.endswith(".png"):
            media_type = "image/png"
        elif filename.endswith(".jpg") or filename.endswith(".jpeg"):
            media_type = "image/jpeg"
        elif filename.endswith(".webp"):
            media_type = "image/webp"
        else:
            media_type = "image/jpeg"

        # =========================================
        # VALIDATE IMAGE
        # =========================================

        validation_response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{media_type};base64,{image_base64}"
                            }
                        },
                        {
                            "type": "text",
                            "text": """Determine whether this image is related to crops/agriculture.
                            Return ONLY valid JSON, no extra text.

                            {
                              "is_crop": true
                            }

                            or

                            {
                              "is_crop": false
                            }"""
                        }
                    ]
                }
            ],
            max_tokens=100
        )

        validation_text = validation_response.choices[0].message.content

        validation_data = safe_parse_json(validation_text)

        # =========================================
        # INVALID IMAGE
        # =========================================

        if validation_data.get("is_crop") != True:

            return {
                "result": "❌ Invalid Image",
                "confidence": "0%",
                "symptoms": [],
                "treatment": "Please upload crop image only.",
                "prevention": "Use agriculture/crop photos.",
                "telugu": "దయచేసి పంట ఫోటో మాత్రమే అప్లోడ్ చేయండి."
            }

        # =========================================
        # ANALYZE IMAGE
        # =========================================

        analysis_response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{media_type};base64,{image_base64}"
                            }
                        },
                        {
                            "type": "text",
                            "text": """Analyze this crop image carefully.
                            Identify any disease, pest, or health condition.
                            Return ONLY valid JSON, no extra text outside JSON.

                            {
                              "result": "disease or condition name",
                              "confidence": "e.g. 85%",
                              "symptoms": ["symptom 1", "symptom 2", "symptom 3"],
                              "treatment": "detailed treatment steps",
                              "prevention": "prevention tips",
                              "telugu": "Telugu language advice for the farmer"
                            }"""
                        }
                    ]
                }
            ],
            max_tokens=1000
        )

        analysis_text = analysis_response.choices[0].message.content

        analysis_data = safe_parse_json(analysis_text)

        return analysis_data

    except Exception as e:

        traceback.print_exc()

        return {
            "result": "❌ Backend Error",
            "confidence": "0%",
            "symptoms": [],
            "treatment": "Unable to analyze image.",
            "prevention": "Try again.",
            "telugu": "మళ్లీ ప్రయత్నించండి.",
            "error": str(e)
        }