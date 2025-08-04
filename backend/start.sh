#!/bin/bash

echo "🚀 Démarrage d'Exo Philos Backend"
echo "================================="

# Vérification de Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 n'est pas installé"
    exit 1
fi

# Installation des dépendances
echo "📦 Installation des dépendances..."
pip install -r requirements.txt

# Installation des modèles
echo "🤖 Installation des modèles IA..."
python install_models.py

# Démarrage du serveur
echo "🌟 Démarrage du serveur sur http://localhost:8000"
python main.py
