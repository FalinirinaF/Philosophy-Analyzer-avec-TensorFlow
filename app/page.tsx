"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Brain, FileText, Download, Shuffle, CheckCircle } from "lucide-react"
import { apiClient, type AnalysisResponse } from "@/lib/api-client"
import { exportToPDF } from "@/lib/pdf-export"
import { ExerciseSection } from "@/components/exercise-section"
import { CitationDisplay } from "@/components/citation-display"

export default function PhilosophyAnalyzer() {
  const [subject, setSubject] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!subject.trim()) return

    setIsAnalyzing(true)
    setError(null)

    try {
      console.log("Début de l'analyse pour:", subject)
      const result = await apiClient.analyzeSubject(subject)
      console.log("Résultat de l'analyse:", result)
      setAnalysis(result)
    } catch (error) {
      console.error("Erreur d'analyse:", error)
      setError(error instanceof Error ? error.message : "Erreur inconnue lors de l'analyse")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleRandomSubject = async () => {
    try {
      const randomSubject = await apiClient.getRandomSubject()
      setSubject(randomSubject)
      setAnalysis(null)
      setError(null)
    } catch (error) {
      console.error("Erreur de génération:", error)
      // Fallback local
      const fallbackSubjects = [
        "La liberté est-elle une illusion ?",
        "Peut-on dire que la vérité est relative ?",
        "La justice n'est-elle qu'un rapport de force ?",
        "Le bonheur est-il le but de l'existence ?",
      ]
      setSubject(fallbackSubjects[Math.floor(Math.random() * fallbackSubjects.length)])
    }
  }

  const handleExportPDF = () => {
    if (analysis) {
      exportToPDF(subject, analysis)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            Exo Philos
          </h1>
          <p className="text-lg text-gray-600">Analyseur intelligent de sujets de dissertation philosophique</p>
          <p className="text-sm text-gray-500">Destiné aux élèves de Première et Terminale</p>

          {/* Status */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <Badge variant="default" className="bg-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              Analyse locale enrichie
            </Badge>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {error}
              <Button variant="link" className="p-0 h-auto ml-2" onClick={() => setError(null)}>
                Fermer
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Citation Display */}
        <CitationDisplay />

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Sujet de dissertation
            </CardTitle>
            <CardDescription>
              Entrez votre sujet de dissertation philosophique pour une analyse complète
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Exemple : La liberté est-elle une illusion ?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="min-h-[100px] text-lg"
            />
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleAnalyze} disabled={!subject.trim() || isAnalyzing} className="flex-1 sm:flex-none">
                {isAnalyzing ? "Analyse en cours..." : "Analyser le sujet"}
              </Button>
              <Button
                variant="outline"
                onClick={handleRandomSubject}
                className="flex items-center gap-2 bg-transparent"
              >
                <Shuffle className="h-4 w-4" />
                Sujet aléatoire
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-6">
            {/* Confidence Score */}
            {analysis.confidence && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-800">
                      Analyse terminée avec {Math.round(analysis.confidence * 100)}% de confiance
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Theme and Key Concepts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Thème central et notions clés
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Thème principal :</h3>
                  <Badge variant="default" className="text-lg px-4 py-2">
                    {analysis.mainTheme}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Notions philosophiques associées :</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keyConcepts.map((concept, index) => (
                      <Badge key={index} variant="secondary">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Citations du thème */}
            <CitationDisplay theme={analysis.mainTheme} />

            {/* Problematic */}
            <Card>
              <CardHeader>
                <CardTitle>Problématique suggérée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg italic text-gray-700 bg-gray-50 p-4 rounded-lg">"{analysis.problematic}"</p>
              </CardContent>
            </Card>

            {/* Dialectical Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Plan dialectique proposé</CardTitle>
                <CardDescription>Structure thèse / antithèse / synthèse</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.dialecticalPlan.map((part, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2">{part.title}</h3>
                    <p className="text-gray-700 mb-2">{part.description}</p>
                    <div className="text-sm text-gray-600">
                      <strong>Arguments clés :</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {part.keyArguments.map((arg, argIndex) => (
                          <li key={argIndex}>{arg}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Examples and References */}
            <Card>
              <CardHeader>
                <CardTitle>Exemples et références</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Philosophes de référence :</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.philosophers.map((philosopher, index) => (
                      <Badge key={index} variant="outline">
                        {philosopher}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Exemples pour enrichir l'argumentation :</h3>
                  <ul className="space-y-2">
                    {analysis.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Export Button */}
            <div className="flex justify-center">
              <Button onClick={handleExportPDF} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exporter en PDF
              </Button>
            </div>
          </div>
        )}

        {/* Interactive Exercises */}
        {analysis && <ExerciseSection subject={subject} analysis={analysis} />}
      </div>
    </div>
  )
}
