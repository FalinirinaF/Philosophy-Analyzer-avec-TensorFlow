from typing import List, Dict, Any
import json
from dataclasses import dataclass

@dataclass
class PhilosophicalConcept:
    """
    Représente un concept philosophique
    """
    name: str
    definition: str
    examples: List[str]
    related_philosophers: List[str]
    keywords: List[str]
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "definition": self.definition,
            "examples": self.examples,
            "related_philosophers": self.related_philosophers,
            "keywords": self.keywords
        }

class PhilosophicalDatabase:
    """
    Base de données des concepts philosophiques
    """
    
    def __init__(self):
        self.concepts = self._initialize_concepts()
    
    def _initialize_concepts(self) -> List[PhilosophicalConcept]:
        """
        Initialise la base de données des concepts
        """
        concepts_data = [
            {
                "name": "Liberté",
                "definition": "Capacité d'agir selon sa volonté, sans contrainte extérieure",
                "examples": ["libre arbitre", "autonomie morale", "émancipation politique"],
                "related_philosophers": ["Sartre", "Kant", "Rousseau", "Spinoza"],
                "keywords": ["libre", "liberté", "autonomie", "choix", "volonté", "contrainte"]
            },
            {
                "name": "Vérité",
                "definition": "Conformité de la pensée avec la réalité ou cohérence logique",
                "examples": ["vérité scientifique", "vérité révélée", "relativisme"],
                "related_philosophers": ["Platon", "Descartes", "Nietzsche", "Popper"],
                "keywords": ["vrai", "vérité", "réalité", "connaissance", "certitude", "doute"]
            },
            {
                "name": "Justice",
                "definition": "Principe moral fondé sur l'équité et le respect du droit",
                "examples": ["justice distributive", "justice pénale", "égalité"],
                "related_philosophers": ["Aristote", "Rawls", "Platon", "Rousseau"],
                "keywords": ["juste", "justice", "équité", "droit", "égalité", "loi"]
            },
            {
                "name": "Bonheur",
                "definition": "État de satisfaction complète et durable",
                "examples": ["hédonisme", "eudémonisme", "ataraxie"],
                "related_philosophers": ["Aristote", "Épicure", "Mill", "Schopenhauer"],
                "keywords": ["bonheur", "plaisir", "satisfaction", "bien-être", "joie"]
            },
            {
                "name": "Conscience",
                "definition": "Connaissance immédiate que l'esprit a de ses états et de ses actes",
                "examples": ["conscience morale", "conscience de soi", "inconscient"],
                "related_philosophers": ["Descartes", "Freud", "Sartre", "Bergson"],
                "keywords": ["conscience", "esprit", "pensée", "réflexion", "moral"]
            },
            {
                "name": "Autrui",
                "definition": "L'autre personne considérée dans sa différence et sa similitude",
                "examples": ["reconnaissance", "altérité", "empathie"],
                "related_philosophers": ["Levinas", "Sartre", "Hegel", "Rousseau"],
                "keywords": ["autrui", "autre", "relation", "reconnaissance", "empathie"]
            },
            {
                "name": "Devoir",
                "definition": "Obligation morale qui s'impose à la conscience",
                "examples": ["impératif catégorique", "obligation", "responsabilité"],
                "related_philosophers": ["Kant", "Jonas", "Levinas", "Sartre"],
                "keywords": ["devoir", "obligation", "moral", "responsabilité", "impératif"]
            },
            {
                "name": "Temps",
                "definition": "Dimension dans laquelle se succèdent les événements",
                "examples": ["durée", "éternité", "temporalité"],
                "related_philosophers": ["Bergson", "Heidegger", "Augustin", "Kant"],
                "keywords": ["temps", "durée", "temporel", "éternité", "instant"]
            },
            {
                "name": "Art",
                "definition": "Création d'œuvres à visée esthétique ou expressive",
                "examples": ["beauté", "création", "esthétique"],
                "related_philosophers": ["Kant", "Hegel", "Benjamin", "Adorno"],
                "keywords": ["art", "beauté", "esthétique", "création", "œuvre"]
            },
            {
                "name": "Travail",
                "definition": "Activité humaine de transformation de la nature",
                "examples": ["aliénation", "technique", "production"],
                "related_philosophers": ["Marx", "Hegel", "Arendt", "Simmel"],
                "keywords": ["travail", "technique", "production", "aliénation", "activité"]
            }
        ]
        
        return [PhilosophicalConcept(**data) for data in concepts_data]
    
    def detect_concepts(self, text: str, keywords: List[str]) -> List[PhilosophicalConcept]:
        """
        Détecte les concepts philosophiques dans un texte
        """
        text_lower = text.lower()
        detected_concepts = []
        
        for concept in self.concepts:
            # Vérification par mots-clés du concept
            for keyword in concept.keywords:
                if keyword.lower() in text_lower:
                    detected_concepts.append(concept)
                    break
            
            # Vérification par mots-clés extraits par spaCy
            for keyword in keywords:
                if keyword.lower() in [k.lower() for k in concept.keywords]:
                    if concept not in detected_concepts:
                        detected_concepts.append(concept)
                    break
        
        # Si aucun concept détecté, retourner le concept par défaut
        if not detected_concepts:
            detected_concepts.append(self.concepts[0])  # Liberté par défaut
        
        return detected_concepts[:5]  # Limiter à 5 concepts
    
    def get_concept_by_name(self, name: str) -> PhilosophicalConcept:
        """
        Récupère un concept par son nom
        """
        for concept in self.concepts:
            if concept.name.lower() == name.lower():
                return concept
        return None
    
    def get_all_concepts(self) -> List[PhilosophicalConcept]:
        """
        Retourne tous les concepts
        """
        return self.concepts
    
    def search_concepts(self, query: str) -> List[PhilosophicalConcept]:
        """
        Recherche des concepts par requête
        """
        query_lower = query.lower()
        results = []
        
        for concept in self.concepts:
            if (query_lower in concept.name.lower() or 
                query_lower in concept.definition.lower() or
                any(query_lower in keyword.lower() for keyword in concept.keywords)):
                results.append(concept)
        
        return results
