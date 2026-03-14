# TO SEND IMAGES AND A PROMPT TO GEMINI API

import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
from fastapi import HTTPException

# Load .env
load_dotenv()

# Initialize the new Client
# Note: The new SDK looks for GOOGLE_API_KEY in your env by default
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_images(image_bytes_list: list[bytes], prompt: str = "Analyze these images"):
    """
    Uses the modern google-genai SDK to process multiple images.
    """
    try:
        # Prepare the parts list
        # We start with the text prompt
        contents = [prompt]
        
        # Add each image as a Part
        for img_bytes in image_bytes_list:
            contents.append(
                types.Part.from_bytes(
                    data=img_bytes,
                    mime_type="image/jpeg"
                )
            )

        # Generate content using the new model path
        # gemini-2.0-flash is the 2026 standard for speed and cost
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=contents
        )

        return {"status": "success", "analysis": response.text}

    except Exception as e:
        print(f"Gemini Service Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI Processing failed: {str(e)}")