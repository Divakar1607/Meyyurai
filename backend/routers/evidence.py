from fastapi import APIRouter, File, UploadFile, Form, HTTPException
import requests
import pytesseract
from PIL import Image
import io

router = APIRouter(prefix="/api/evidence", tags=["evidence"])

# GitHub Integration
@router.get("/github/{username}")
async def get_github_evidence(username: str):
    """
    Fetches public repositories and basic profile info for a given GitHub username.
    """
    try:
        # Fetch user profile
        user_response = requests.get(f"https://api.github.com/users/{username}")
        if user_response.status_code != 200:
            raise HTTPException(status_code=404, detail="GitHub user not found")
        user_data = user_response.json()
        
        # Fetch repositories
        repos_response = requests.get(f"https://api.github.com/users/{username}/repos?sort=updated&per_page=10")
        repos = []
        if repos_response.status_code == 200:
            for repo in repos_response.json():
                repos.append({
                    "name": repo.get("name"),
                    "description": repo.get("description"),
                    "language": repo.get("language"),
                    "stargazers_count": repo.get("stargazers_count"),
                    "html_url": repo.get("html_url")
                })
        
        return {
            "username": username,
            "public_repos": user_data.get("public_repos"),
            "followers": user_data.get("followers"),
            "recent_repositories": repos
        }
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error connecting to GitHub: {str(e)}")

# Certificate OCR Integration
@router.post("/certificate")
async def extract_certificate_text(file: UploadFile = File(...)):
    """
    Performs OCR on an uploaded certificate image to extract text for verification.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are supported for OCR.")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # Note: Tesseract must be installed on the system path for this to work
        # In a real environment, you might need: pytesseract.pytesseract.tesseract_cmd = r'<full_path_to_tesseract_executable>'
        text = pytesseract.image_to_string(image)
        
        return {
            "filename": file.filename,
            "extracted_text": text.strip()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR failed: {str(e)}")
