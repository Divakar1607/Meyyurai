from fastapi import APIRouter
from pydantic import BaseModel
import re

router = APIRouter(prefix="/api/align", tags=["alignment"])

class AlignmentRequest(BaseModel):
    verified_skills: list[str]
    job_description: str

@router.post("")
async def align_job(request: AlignmentRequest):
    """
    Job Alignment Scorer:
    Compares verified skills against a job description to produce a match score and identify gaps.
    """
    jd_lower = request.job_description.lower()
    
    # Very naive approach: see which verified skills appear in the JD
    matched_skills = []
    
    for skill in request.verified_skills:
        # Simple word boundary regex
        if re.search(r'\b' + re.escape(skill.lower()) + r'\b', jd_lower):
            matched_skills.append(skill)
            
    # Mocking required skills extraction from JD
    # In reality, this would use NLP to extract required skills from the JD first
    mock_extracted_jd_skills = ["python", "react", "fastapi", "docker", "sql", "aws", "git"]
    actual_jd_skills = [s for s in mock_extracted_jd_skills if re.search(r'\b' + re.escape(s) + r'\b', jd_lower)]
    
    if not actual_jd_skills:
        # If the JD didn't contain any of our mock skills, default to a generic list for demo purposes
        actual_jd_skills = ["python", "react", "sql"]
        
    skill_gaps = [s.title() for s in actual_jd_skills if s.title() not in matched_skills and s.upper() not in matched_skills]
    
    # Calculate score
    if len(actual_jd_skills) > 0:
        score = (len(matched_skills) / len(actual_jd_skills)) * 100
        score = min(score, 100) # Cap at 100%
    else:
        score = 0
        
    return {
        "alignment_score": round(score, 1),
        "matched_skills": matched_skills,
        "skill_gaps": skill_gaps
    }
