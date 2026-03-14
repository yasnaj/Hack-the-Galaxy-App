# TO RECEIVE THE UPLOADED IMAGES FROM FRONTEND

from fastapi import FastAPI, UploadFile, File
from typing import List
from gemini_service import analyze_images

app = FastAPI()


@app.post("/analyze")

async def analyze(files: List[UploadFile] = File(...)):

    images = []

    for file in files:
        content = await file.read()
        images.append(content)

    result = analyze_images(images)

    return result