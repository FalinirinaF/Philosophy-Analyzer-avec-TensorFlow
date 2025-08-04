#!/usr/bin/env python3
"""
Script d'installation des modèles requis pour Exo Philos
"""

import subprocess
import sys
import os

def install_spacy_model():
    """
    Installe le modèle spaCy français
    """
    try:
        print("Installation du modèle spaCy français...")
        subprocess.check_call([sys.executable, "-m", "spacy", "download", "fr_core_news_sm"])
        print("✅ Modèle français installé avec succès")
    except subprocess.CalledProcessError:
        print("⚠️  Échec de l'installation du modèle français, tentative avec le modèle anglais...")
        try:
            subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
            print("✅ Modèle anglais installé avec succès")
        except subprocess.CalledProcessError:
            print("❌ Échec de l'installation des modèles spaCy")
            return False
    return True

def create_directories():
    """
    Crée les répertoires nécessaires
    """
    directories = ["models", "data", "logs"]
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✅ Répertoire {directory} créé")

def main():
    print("🚀 Installation des dépendances pour Exo Philos Backend")
    print("=" * 50)
    
    # Création des répertoires
    create_directories()
    
    # Installation du modèle spaCy
    if install_spacy_model():
        print("\n✅ Installation terminée avec succès!")
        print("\nPour démarrer le serveur:")
        print("python main.py")
    else:
        print("\n❌ Installation incomplète")
        sys.exit(1)

if __name__ == "__main__":
    main()
