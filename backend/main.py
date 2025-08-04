from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from typing import List, Dict, Any
import logging

from philosophy_analyzer import PhilosophyAnalyzer
from models.tensorflow_classifier import PhilosophyClassifier
from nlp.spacy_processor import SpacyProcessor

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Exo Philos API",
    description="API backend pour l'analyse de sujets philosophiques",
    version="1.0.0"
)

# Configuration CORS pour permettre les requêtes depuis le frontend Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialisation des composants
analyzer = PhilosophyAnalyzer()
classifier = PhilosophyClassifier()
nlp_processor = SpacyProcessor()

class SubjectRequest(BaseModel):
    subject: str

class AnalysisResponse(BaseModel):
    mainTheme: str
    keyConcepts: List[str]
    problematic: str
    dialecticalPlan: List[Dict[str, Any]]
    philosophers: List[str]
    examples: List[str]
    confidence: float

@app.on_event("startup")
async def startup_event():
    """Initialisation au démarrage du serveur"""
    logger.info("Démarrage d'Exo Philos API...")
    
    # Chargement du modèle TensorFlow
    try:
        classifier.load_model()
        logger.info("Modèle TensorFlow chargé avec succès")
    except Exception as e:
        logger.error(f"Erreur lors du chargement du modèle: {e}")
    
    # Initialisation de spaCy
    try:
        nlp_processor.initialize()
        logger.info("Modèle spaCy initialisé avec succès")
    except Exception as e:
        logger.error(f"Erreur lors de l'initialisation de spaCy: {e}")

@app.get("/")
async def root():
    return {"message": "Exo Philos API - Backend d'analyse philosophique"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "tensorflow_model": classifier.is_loaded(),
        "spacy_model": nlp_processor.is_ready()
    }

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_subject(request: SubjectRequest):
    """
    Analyse un sujet de dissertation philosophique
    """
    try:
        logger.info(f"Analyse du sujet: {request.subject}")
        
        # Analyse complète du sujet
        result = analyzer.analyze_philosophical_subject(
            subject=request.subject,
            classifier=classifier,
            nlp_processor=nlp_processor
        )
        
        logger.info(f"Analyse terminée avec succès. Thème: {result['mainTheme']}")
        return AnalysisResponse(**result)
        
    except Exception as e:
        logger.error(f"Erreur lors de l'analyse: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur d'analyse: {str(e)}")

@app.get("/random-subject")
async def get_random_subject():
    """
    Génère un sujet aléatoire
    """
    try:
        subject = analyzer.generate_random_subject()
        return {"subject": subject}
    except Exception as e:
        logger.error(f"Erreur lors de la génération: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur de génération: {str(e)}")

@app.get("/concepts")
async def get_philosophical_concepts():
    """
    Retourne la liste des concepts philosophiques disponibles
    """
    try:
        concepts = analyzer.get_all_concepts()
        return {"concepts": concepts}
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des concepts: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
