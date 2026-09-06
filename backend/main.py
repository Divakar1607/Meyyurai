from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import upload, evidence, verify, align

app = FastAPI(title="Meyyurai API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(evidence.router)
app.include_router(verify.router)
app.include_router(align.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Meyyurai API"}
