from fastapi import APIRouter, File, UploadFile, Form, HTTPException
import pdfplumber
import io
import re
import docx
from PIL import Image
import pytesseract

router = APIRouter(prefix="/api/upload", tags=["upload"])

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    except Exception as e:
        raise ValueError(f"Could not parse PDF: {str(e)}")
    return text

def extract_text_from_docx(file_bytes: bytes) -> str:
    try:
        doc = docx.Document(io.BytesIO(file_bytes))
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        raise ValueError(f"Could not parse DOCX: {str(e)}")

def extract_text_from_image(file_bytes: bytes) -> str:
    try:
        image = Image.open(io.BytesIO(file_bytes))
        return pytesseract.image_to_string(image)
    except Exception as e:
        raise ValueError(f"Could not parse Image (Make sure Tesseract OCR is installed): {str(e)}")

def extract_text(file_bytes: bytes, filename: str) -> str:
    ext = filename.lower().split('.')[-1]
    if ext == 'pdf':
        return extract_text_from_pdf(file_bytes)
    elif ext in ['docx', 'doc']:
        return extract_text_from_docx(file_bytes)
    elif ext == 'txt':
        return file_bytes.decode('utf-8', errors='ignore')
    elif ext in ['png', 'jpg', 'jpeg']:
        return extract_text_from_image(file_bytes)
    else:
        raise ValueError(f"Unsupported file format: .{ext}")

def naive_extract_skills(text: str) -> list[str]:
    # Placeholder for a real NLP extraction (e.g. spaCy)
    common_skills = ["python", "javascript", "react", "fastapi", "machine learning", "nlp", "aws", "docker", "sql", "mongodb", "git", "html", "css", "c++", "java"]
    found_skills = []
    text_lower = text.lower()
    for skill in common_skills:
        # Simple word boundary regex
        if re.search(r'\b' + re.escape(skill) + r'\b', text_lower):
            found_skills.append(skill.title() if len(skill)>3 else skill.upper())
    return list(set(found_skills))

def naive_extract_claims(text: str) -> list[str]:
    # Very basic placeholder to extract potential claims (e.g. phrases mentioning 'developed', 'built', 'certified')
    claims = []
    sentences = text.split('.')
    keywords = ['developed', 'built', 'created', 'certified', 'managed', 'led', 'designed']
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue
        if any(kw in sentence.lower() for kw in keywords):
            # Limit length to avoid massive paragraphs
            if len(sentence) < 200:
                claims.append(sentence)
    
    # Return max 5 claims for now
    return claims[:5]

@router.post("")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str | None = Form(default=None)
):
    supported_extensions = ('.pdf', '.docx', '.txt', '.png', '.jpg', '.jpeg', '.doc')
    if not file.filename.lower().endswith(supported_extensions):
        raise HTTPException(status_code=400, detail="Unsupported file format.")
    
    content = await file.read()
    
    try:
        text = extract_text(content, file.filename)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    # Extract entities
    skills = naive_extract_skills(text)
    claims = naive_extract_claims(text)
    
    return {
        "filename": file.filename,
        "parsed_text_length": len(text),
        "skills": skills,
        "claims": claims,
        "has_job_description": bool(job_description)
    }
