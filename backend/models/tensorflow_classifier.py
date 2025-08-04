import tensorflow as tf
import numpy as np
import pickle
import os
from typing import Tuple, List
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

class PhilosophyClassifier:
    """
    Classificateur TensorFlow pour identifier les thèmes philosophiques
    """
    
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.label_encoder = None
        self.is_model_loaded = False
        
        # Classes philosophiques principales
        self.philosophy_themes = [
            "Liberté",
            "Vérité", 
            "Justice",
            "Bonheur",
            "Conscience",
            "Autrui",
            "Devoir",
            "Temps",
            "Art",
            "Travail",
            "Morale",
            "Politique",
            "Nature",
            "Raison",
            "Existence"
        ]
    
    def create_model(self, vocab_size: int = 10000, max_length: int = 100) -> tf.keras.Model:
        """
        Crée le modèle de classification TensorFlow
        """
        model = tf.keras.Sequential([
            tf.keras.layers.Embedding(vocab_size, 128, input_length=max_length),
            tf.keras.layers.LSTM(64, dropout=0.3, recurrent_dropout=0.3),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dropout(0.5),
            tf.keras.layers.Dense(len(self.philosophy_themes), activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def train_model(self, training_data: List[Tuple[str, str]]):
        """
        Entraîne le modèle avec des données d'exemple
        """
        logger.info("Début de l'entraînement du modèle TensorFlow...")
        
        # Préparation des données
        texts = [item[0] for item in training_data]
        labels = [item[1] for item in training_data]
        
        # Vectorisation des textes
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.preprocessing import LabelEncoder
        
        self.vectorizer = TfidfVectorizer(max_features=10000, stop_words='french')
        X = self.vectorizer.fit_transform(texts).toarray()
        
        self.label_encoder = LabelEncoder()
        y = self.label_encoder.fit_transform(labels)
        
        # Création et entraînement du modèle
        self.model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu', input_shape=(X.shape[1],)),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(len(self.philosophy_themes), activation='softmax')
        ])
        
        self.model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        # Entraînement
        history = self.model.fit(
            X, y,
            epochs=50,
            batch_size=32,
            validation_split=0.2,
            verbose=1
        )
        
        self.is_model_loaded = True
        logger.info("Entraînement terminé avec succès")
        
        return history
    
    def save_model(self, model_path: str = "models/philosophy_classifier"):
        """
        Sauvegarde le modèle et les composants
        """
        if not self.model:
            raise ValueError("Aucun modèle à sauvegarder")
        
        os.makedirs(model_path, exist_ok=True)
        
        # Sauvegarde du modèle TensorFlow
        self.model.save(f"{model_path}/model.h5")
        
        # Sauvegarde du vectorizer et label encoder
        with open(f"{model_path}/vectorizer.pkl", 'wb') as f:
            pickle.dump(self.vectorizer, f)
        
        with open(f"{model_path}/label_encoder.pkl", 'wb') as f:
            pickle.dump(self.label_encoder, f)
        
        logger.info(f"Modèle sauvegardé dans {model_path}")
    
    def load_model(self, model_path: str = "models/philosophy_classifier"):
        """
        Charge le modèle pré-entraîné
        """
        try:
            if os.path.exists(f"{model_path}/model.h5"):
                self.model = tf.keras.models.load_model(f"{model_path}/model.h5")
                
                with open(f"{model_path}/vectorizer.pkl", 'rb') as f:
                    self.vectorizer = pickle.load(f)
                
                with open(f"{model_path}/label_encoder.pkl", 'rb') as f:
                    self.label_encoder = pickle.load(f)
                
                self.is_model_loaded = True
                logger.info("Modèle chargé avec succès")
            else:
                logger.warning("Modèle non trouvé, création d'un modèle par défaut...")
                self._create_default_model()
                
        except Exception as e:
            logger.error(f"Erreur lors du chargement: {e}")
            self._create_default_model()
    
    def _create_default_model(self):
        """
        Crée un modèle par défaut avec des données d'exemple
        """
        # Données d'entraînement d'exemple
        training_data = [
            ("La liberté est-elle une illusion ?", "Liberté"),
            ("Peut-on être libre ?", "Liberté"),
            ("Qu'est-ce que la liberté ?", "Liberté"),
            ("La vérité existe-t-elle ?", "Vérité"),
            ("Peut-on connaître la vérité ?", "Vérité"),
            ("Qu'est-ce que la vérité ?", "Vérité"),
            ("La justice est-elle possible ?", "Justice"),
            ("Qu'est-ce qu'une société juste ?", "Justice"),
            ("Le bonheur est-il accessible ?", "Bonheur"),
            ("Peut-on définir le bonheur ?", "Bonheur"),
            ("Qu'est-ce que la conscience ?", "Conscience"),
            ("Suis-je conscient de tout ?", "Conscience"),
            ("Qui est autrui pour moi ?", "Autrui"),
            ("Peut-on comprendre autrui ?", "Autrui"),
            ("Qu'est-ce que le devoir ?", "Devoir"),
            ("Ai-je des devoirs ?", "Devoir"),
            ("Le temps existe-t-il ?", "Temps"),
            ("Qu'est-ce que le temps ?", "Temps"),
            ("L'art a-t-il une fonction ?", "Art"),
            ("Qu'est-ce que la beauté ?", "Art"),
            ("Le travail libère-t-il ?", "Travail"),
            ("Pourquoi travailler ?", "Travail"),
        ]
        
        self.train_model(training_data)
        
        # Sauvegarde du modèle par défaut
        self.save_model()
    
    def classify_subject(self, subject: str) -> Tuple[str, float]:
        """
        Classifie un sujet philosophique
        """
        if not self.is_model_loaded or not self.model:
            logger.warning("Modèle non chargé, utilisation de la classification par défaut")
            return self._default_classification(subject)
        
        try:
            # Vectorisation du sujet
            X = self.vectorizer.transform([subject]).toarray()
            
            # Prédiction
            predictions = self.model.predict(X)
            predicted_class_idx = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class_idx])
            
            # Décodage de la classe
            predicted_theme = self.label_encoder.inverse_transform([predicted_class_idx])[0]
            
            logger.info(f"Classification: {predicted_theme} (confiance: {confidence:.2f})")
            return predicted_theme, confidence
            
        except Exception as e:
            logger.error(f"Erreur lors de la classification: {e}")
            return self._default_classification(subject)
    
    def _default_classification(self, subject: str) -> Tuple[str, float]:
        """
        Classification par défaut basée sur des mots-clés
        """
        subject_lower = subject.lower()
        
        keyword_mapping = {
            "Liberté": ["libre", "liberté", "autonomie", "choix", "volonté"],
            "Vérité": ["vrai", "vérité", "réalité", "connaissance", "certitude"],
            "Justice": ["juste", "justice", "équité", "droit", "égalité"],
            "Bonheur": ["bonheur", "plaisir", "satisfaction", "bien-être"],
            "Conscience": ["conscience", "esprit", "pensée", "réflexion"],
            "Autrui": ["autrui", "autre", "relation", "reconnaissance"],
            "Devoir": ["devoir", "obligation", "moral", "responsabilité"],
            "Temps": ["temps", "durée", "temporel", "éternité"],
            "Art": ["art", "beauté", "esthétique", "création"],
            "Travail": ["travail", "technique", "production", "activité"]
        }
        
        for theme, keywords in keyword_mapping.items():
            for keyword in keywords:
                if keyword in subject_lower:
                    return theme, 0.8
        
        return "Liberté", 0.5  # Thème par défaut
    
    def is_loaded(self) -> bool:
        """
        Vérifie si le modèle est chargé
        """
        return self.is_model_loaded and self.model is not None
