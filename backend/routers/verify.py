from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/verify", tags=["verification"])

class VerificationRequest(BaseModel):
    claims: list[str]
    skills: list[str]
    github_repos: list[dict] = []
    certificate_text: str = ""

@router.post("")
async def verify_claims(request: VerificationRequest):
    """
    Mock Verification Engine:
    Compares extracted claims and skills against collected evidence (GitHub, Certs).
    """
    results = []
    
    evidence_corpus = request.certificate_text.lower()
    for repo in request.github_repos:
        evidence_corpus += f" {repo.get('name', '').lower()} {repo.get('description', '').lower()} {repo.get('language', '').lower()}"
        
    for claim in request.claims:
        # Simple keyword matching as a stand-in for semantic similarity
        claim_lower = claim.lower()
        
        # Heuristic scoring
        match_score = 0
        words = set(claim_lower.split())
        for word in words:
            if len(word) > 4 and word in evidence_corpus:
                match_score += 1
                
        if match_score >= 2:
            status = "Verified"
            confidence = 85
        elif match_score == 1:
            status = "Partially Verified"
            confidence = 50
        else:
            status = "Unverified"
            confidence = 20
            
        results.append({
            "claim": claim,
            "status": status,
            "confidence_score": confidence
        })
        
    # Verify skills
    verified_skills = []
    for skill in request.skills:
        if skill.lower() in evidence_corpus:
            verified_skills.append({"skill": skill, "status": "Verified"})
        else:
            verified_skills.append({"skill": skill, "status": "Unverified"})

    return {
        "claims_verification": results,
        "skills_verification": verified_skills
    }
