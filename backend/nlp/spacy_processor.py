import spacy
from typing import List, Dict, Any
import logging
from collections import Counter

logger = logging.getLogger(__name__)

class SpacyProcessor:
    """
    Processeur NLP utilisant spaCy pour l'analyse des textes philosophiques
    """
    
    def __init__(self):
        self.nlp = None
        self.is_initialized = False
        
        # Mots-clés philosophiques spécialisés
        self.philosophical_keywords = {
            "liberté": ["libre", "liberté", "autonomie", "indépendance", "émancipation"],
            "vérité": ["vrai", "vérité", "réalité", "authentique", "véridique"],
            "justice": ["juste", "justice", "équité", "droit", "légitimité"],
            "bonheur": ["bonheur", "plaisir", "satisfaction", "félicité", "béatitude"],
            "conscience": ["conscience", "esprit", "mental", "psychique", "cognitif"],
            "morale": ["moral", "éthique", "bien", "mal", "vertu"],
            "existence": ["existence", "être", "existant", "réalité", "présence"],
            "connaissance": ["connaissance", "savoir", "science", "épistémologie"],
            "raison": ["raison", "rationnel", "logique", "raisonnement"],
            "nature": ["nature", "naturel", "essence", "substance"]
        }
    
    def initialize(self):
        """
        Initialise le modèle spaCy
        """
        try:
            # Tentative de chargement du modèle français
            try:
                self.nlp = spacy.load("fr_core_news_sm")
                logger.info("Modèle spaCy français chargé avec succès")
            except OSError:
                logger.warning("Modèle français non trouvé, tentative avec le modèle anglais")
                try:
                    self.nlp = spacy.load("en_core_web_sm")
                    logger.info("Modèle spaCy anglais chargé")
                except OSError:
                    logger.error("Aucun modèle spaCy trouvé, utilisation du modèle vide")
                    self.nlp = spacy.blank("fr")
            
            # Ajout de règles personnalisées pour la philosophie
            self._add_philosophical_patterns()
            
            self.is_initialized = True
            
        except Exception as e:
            logger.error(f"Erreur lors de l'initialisation de spaCy: {e}")
            # Modèle de secours
            self.nlp = spacy.blank("fr")
            self.is_initialized = True
    
    def _add_philosophical_patterns(self):
        """
        Ajoute des patterns spécifiques à la philosophie
        """
        if not self.nlp.has_pipe("entity_ruler"):
            ruler = self.nlp.add_pipe("entity_ruler", before="ner")
            
            patterns = []
            for concept, keywords in self.philosophical_keywords.items():
                for keyword in keywords:
                    patterns.append({"label": "PHILOSOPHICAL_CONCEPT", "pattern": keyword})
            
            ruler.add_patterns(patterns)
    
    def extract_keywords(self, text: str) -> List[str]:
        """
        Extrait les mots-clés philosophiques d'un texte
        """
        if not self.is_initialized:
            self.initialize()
        
        try:
            doc = self.nlp(text.lower())
            keywords = []
            
            # Extraction des tokens significatifs
            for token in doc:
                if (not token.is_stop and 
                    not token.is_punct and 
                    len(token.text) > 2 and
                    token.pos_ in ["NOUN", "ADJ", "VERB"]):
                    keywords.append(token.lemma_)
            
            # Ajout des concepts philosophiques détectés
            for concept, concept_keywords in self.philosophical_keywords.items():
                for keyword in concept_keywords:
                    if keyword in text.lower():
                        keywords.append(concept)
            
            # Suppression des doublons et tri par fréquence
            keyword_counts = Counter(keywords)
            return [word for word, count in keyword_counts.most_common(10)]
            
        except Exception as e:
            logger.error(f"Erreur lors de l'extraction des mots-clés: {e}")
            return self._fallback_keyword_extraction(text)
    
    def _fallback_keyword_extraction(self, text: str) -> List[str]:
        """
        Extraction de mots-clés de secours sans spaCy
        """
        text_lower = text.lower()
        found_keywords = []
        
        for concept, keywords in self.philosophical_keywords.items():
            for keyword in keywords:
                if keyword in text_lower:
                    found_keywords.append(concept)
        
        return list(set(found_keywords))[:5]
    
    def analyze_sentiment(self, text: str) -> Dict[str, float]:
        """
        Analyse basique du sentiment (positif/négatif/neutre)
        """
        if not self.is_initialized:
            self.initialize()
        
        # Mots positifs et négatifs en philosophie
        positive_words = ["bien", "bon", "juste", "vrai", "libre", "heureux", "vertu"]
        negative_words = ["mal", "faux", "injuste", "illusion", "contrainte", "malheur"]
        
        text_lower = text.lower()
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        total = positive_count + negative_count
        if total == 0:
            return {"positive": 0.5, "negative": 0.5, "neutral": 1.0}
        
        return {
            "positive": positive_count / total,
            "negative": negative_count / total,
            "neutral": 1 - (positive_count + negative_count) / len(text.split())
        }
    
    def extract_entities(self, text: str) -> List[Dict[str, Any]]:
        """
        Extrait les entités nommées du texte
        """
        if not self.is_initialized:
            self.initialize()
        
        try:
            doc = self.nlp(text)
            entities = []
            
            for ent in doc.ents:
                entities.append({
                    "text": ent.text,
                    "label": ent.label_,
                    "start": ent.start_char,
                    "end": ent.end_char
                })
            
            return entities
            
        except Exception as e:
            logger.error(f"Erreur lors de l'extraction d'entités: {e}")
            return []
    
    def is_ready(self) -> bool:
        """
        Vérifie si le processeur est prêt
        """
        return self.is_initialized and self.nlp is not None
