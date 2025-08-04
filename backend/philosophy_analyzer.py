import random
from typing import Dict, List, Any
import json
import os
from pathlib import Path

from data.philosophical_database import PhilosophicalDatabase
from models.tensorflow_classifier import PhilosophyClassifier
from nlp.spacy_processor import SpacyProcessor

class PhilosophyAnalyzer:
    """
    Analyseur principal pour les sujets philosophiques
    """
    
    def __init__(self):
        self.database = PhilosophicalDatabase()
        self.random_subjects = [
            "La liberté est-elle une illusion ?",
            "Peut-on dire que la vérité est relative ?",
            "La justice n'est-elle qu'un rapport de force ?",
            "Le bonheur est-il le but de l'existence ?",
            "Sommes-nous responsables de nos actes inconscients ?",
            "Autrui est-il un obstacle à ma liberté ?",
            "Y a-t-il des devoirs envers soi-même ?",
            "Le temps nous appartient-il ?",
            "L'art nous éloigne-t-il de la réalité ?",
            "Le travail libère-t-il l'homme ?",
            "Faut-il avoir peur de la mort ?",
            "La technique nous rend-elle plus libres ?",
            "Peut-on vivre sans croyances ?",
            "L'État limite-t-il la liberté ?",
            "La culture nous humanise-t-elle ?",
        ]
    
    def analyze_philosophical_subject(
        self, 
        subject: str, 
        classifier: PhilosophyClassifier, 
        nlp_processor: SpacyProcessor
    ) -> Dict[str, Any]:
        """
        Analyse complète d'un sujet philosophique
        """
        
        # 1. Classification du thème principal avec TensorFlow
        main_theme, confidence = classifier.classify_subject(subject)
        
        # 2. Extraction des mots-clés avec spaCy
        keywords = nlp_processor.extract_keywords(subject)
        
        # 3. Détection des concepts philosophiques
        detected_concepts = self.database.detect_concepts(subject, keywords)
        
        # 4. Génération de la problématique
        problematic = self._generate_problematic(subject, main_theme, detected_concepts)
        
        # 5. Construction du plan dialectique
        dialectical_plan = self._generate_dialectical_plan(subject, main_theme, detected_concepts)
        
        # 6. Sélection des philosophes pertinents
        philosophers = self._select_philosophers(detected_concepts)
        
        # 7. Génération d'exemples
        examples = self._generate_examples(main_theme, detected_concepts)
        
        return {
            "mainTheme": main_theme,
            "keyConcepts": [concept.name for concept in detected_concepts[:3]],
            "problematic": problematic,
            "dialecticalPlan": dialectical_plan,
            "philosophers": philosophers,
            "examples": examples,
            "confidence": confidence
        }
    
    def _generate_problematic(self, subject: str, main_theme: str, concepts: List) -> str:
        """
        Génère une problématique basée sur l'analyse
        """
        is_question = subject.strip().endswith("?")
        
        if is_question:
            return f"Comment comprendre la tension entre {main_theme.lower()} et les contraintes qui semblent la limiter ? Dans quelle mesure cette question révèle-t-elle les enjeux fondamentaux de l'existence humaine ?"
        else:
            return f"Dans quelle mesure peut-on affirmer que {main_theme.lower()} constitue un enjeu fondamental de l'existence humaine ? Comment cette notion s'articule-t-elle avec les autres dimensions de la condition humaine ?"
    
    def _generate_dialectical_plan(self, subject: str, main_theme: str, concepts: List) -> List[Dict[str, Any]]:
        """
        Génère un plan dialectique adapté au thème
        """
        plans_templates = {
            "Liberté": [
                {
                    "title": "I. La liberté semble illusoire face au déterminisme",
                    "description": "L'homme paraît soumis à des déterminismes multiples qui remettent en question sa liberté.",
                    "keyArguments": [
                        "Déterminisme physique et lois de la nature",
                        "Conditionnements psychologiques et sociaux",
                        "Illusion du libre arbitre selon Spinoza"
                    ]
                },
                {
                    "title": "II. Pourtant, l'homme peut accéder à l'autonomie",
                    "description": "Malgré les contraintes, l'être humain dispose d'une capacité d'autodétermination.",
                    "keyArguments": [
                        "L'autonomie morale selon Kant",
                        "La liberté comme pouvoir de dire non (Alain)",
                        "La conscience comme condition de la liberté"
                    ]
                },
                {
                    "title": "III. La liberté est une conquête éthique et politique",
                    "description": "La liberté ne se donne pas, elle se construit dans l'action et l'engagement.",
                    "keyArguments": [
                        "La liberté comme projet selon Sartre",
                        "Émancipation collective et droits de l'homme",
                        "Responsabilité et engagement authentique"
                    ]
                }
            ],
            "Vérité": [
                {
                    "title": "I. La vérité semble relative et subjective",
                    "description": "Chaque époque et culture semble avoir sa propre conception de la vérité.",
                    "keyArguments": [
                        "Relativisme culturel et historique",
                        "Subjectivité de la perception",
                        "Critique nietzschéenne de la vérité absolue"
                    ]
                },
                {
                    "title": "II. Il existe des critères objectifs de vérité",
                    "description": "Certaines vérités semblent universelles et indépendantes des opinions.",
                    "keyArguments": [
                        "Vérités mathématiques et logiques",
                        "Méthode scientifique et vérification",
                        "Évidence rationnelle selon Descartes"
                    ]
                },
                {
                    "title": "III. La vérité est un idéal régulateur",
                    "description": "La vérité guide la recherche sans être définitivement atteinte.",
                    "keyArguments": [
                        "Vérité comme horizon de la connaissance",
                        "Falsifiabilité selon Popper",
                        "Dialogue et confrontation des perspectives"
                    ]
                }
            ]
        }
        
        return plans_templates.get(main_theme, plans_templates["Liberté"])
    
    def _select_philosophers(self, concepts: List) -> List[str]:
        """
        Sélectionne les philosophes pertinents
        """
        all_philosophers = []
        for concept in concepts:
            all_philosophers.extend(concept.related_philosophers)
        
        # Suppression des doublons et limitation à 5 philosophes
        unique_philosophers = list(set(all_philosophers))
        return unique_philosophers[:5]
    
    def _generate_examples(self, main_theme: str, concepts: List) -> List[str]:
        """
        Génère des exemples pertinents
        """
        examples_by_theme = {
            "Liberté": [
                "Le mythe de la caverne de Platon (libération de l'ignorance)",
                "Nelson Mandela et la lutte contre l'apartheid",
                "Le dilemme de l'intelligence artificielle et du libre arbitre",
                "L'expérience de Milgram sur la soumission à l'autorité",
                "La résistance française pendant la Seconde Guerre mondiale"
            ],
            "Vérité": [
                "L'allégorie de la caverne (Platon)",
                "La révolution copernicienne",
                "Les fake news à l'ère numérique",
                "L'affaire Galilée et l'Église",
                "Les théories du complot et la post-vérité"
            ],
            "Justice": [
                "Le procès de Socrate",
                "La Déclaration des droits de l'homme",
                "L'affaire Dreyfus",
                "La justice restauratrice en Afrique du Sud",
                "Les inégalités sociales contemporaines"
            ],
            "Bonheur": [
                "Le paradoxe d'Épiménide sur le bonheur",
                "La société de consommation et le bonheur",
                "Les indices de bonheur national brut (Bhoutan)",
                "La méditation et les sagesses orientales",
                "Les réseaux sociaux et le bien-être"
            ]
        }
        
        return examples_by_theme.get(main_theme, examples_by_theme["Liberté"])
    
    def generate_random_subject(self) -> str:
        """
        Génère un sujet aléatoire
        """
        return random.choice(self.random_subjects)
    
    def get_all_concepts(self) -> List[Dict[str, Any]]:
        """
        Retourne tous les concepts philosophiques
        """
        return [concept.to_dict() for concept in self.database.get_all_concepts()]
