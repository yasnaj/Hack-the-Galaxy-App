# Hack-the-Galaxy-App

A web app that turns a few photos from a user's camera roll into a plan for the day. The user uploads images, and the Google Gemini API suggests activities based on what the photos show and generates a mood board to match.

Built during Hack the Galaxy Hackathon on March 10, 2026 for a challenge centred on integrating the Gemini API into an application.

## Features

- Upload photos from a camera roll
- Gemini analyses the images and proposes activities for the day
- Generates a mood board that reflects the themes in the uploaded photos

## How It Works

1. The frontend sends the uploaded images to the backend.
2. The backend passes them to Gemini through `gemini_service.py` with a prompt for activity ideas and mood board content.
3. The response is returned to the frontend, which displays the suggestions and the mood board.
