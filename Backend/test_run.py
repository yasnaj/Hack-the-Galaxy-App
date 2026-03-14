# TESTING API AND PROMPT - BYPASSES IMAGE COLLECTION FROM FRONTEND (MAIN.PY)

import glob
import json
from gemini_service import analyze_images

image_bytes_list = []
for file_path in glob.glob("test_images/*.jpg"):
    with open(file_path, "rb") as f:
        image_bytes_list.append(f.read())

result = analyze_images(image_bytes_list)
print(json.dumps(result, indent=2))