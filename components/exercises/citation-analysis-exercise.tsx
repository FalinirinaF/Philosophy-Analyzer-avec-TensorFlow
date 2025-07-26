"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, RotateCcw, Quote } from "lucide-react"
import { generateCitationAnalysisExercise } from "@/lib/exercise-generators"
import type { AnalysisResult, CitationExerciseData } from "@/lib/types"

interface CitationAnalysisExerciseProps {
  subject: string
  analysis: AnalysisResult
  onComplete: (score: number) => void
  isCompleted: boolean
}

export function CitationAnalysisExercise({
  subject,
  analysis,
  onComplete,
  isCompleted,
}: CitationAnalysisExerciseProps) {
  const [exerciseData, setExerciseData] = useState<CitationExerciseData | null>(null)
  const [currentCitation, setCurrentCitation] = useState(0)
  const [userAnalysis, setUserAnalysis] = useState("")
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const data = generateCitationAnalysisExercise(analysis)
    setExerciseData(data)
  }, [analysis])

  const handleThemeToggle = (theme: string) => {
    setSelectedThemes((prev) => (prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]))
  }

  const handleSubmitAnalysis = () => {
    if (!exerciseData) return

    const citation = exerciseData.citations[currentCitation]

    // Évaluation simple basée sur les mots-clés et thèmes
    let score = 0
    const maxScore = 100

    // Vérification des thèmes (40 points)
    const correctThemes = citation.themes.filter((theme) => selectedThemes.includes(theme))
    score += (correctThemes.length / citation.themes.length) * 40

    // Vérification de l'analyse textuelle (60 points)
    const analysisWords = userAnalysis.toLowerCase().split(/\s+/)
    const keywordMatches = citation.keywords.filter((keyword) =>
      analysisWords.some((word) => word.includes(keyword.toLowerCase())),
    )
    score += (keywordMatches.length / citation.keywords.length) * 60

    const result = {
      citation: citation.text,
      author: citation.author,
      userAnalysis,
      selectedThemes,
      correctThemes: citation.themes,
      score: Math.round(score),
      feedback: citation.explanation,
    }

    const newResults = [...results, result]
    setResults(newResults)

    if (currentCitation < exerciseData.citations.length - 1) {
      setCurrentCitation(currentCitation + 1)
      setUserAnalysis("")
      setSelectedThemes([])
    } else {
      // Exercice terminé
      const averageScore = Math.round(newResults.reduce((sum, r) => sum + r.score, 0) / newResults.length)
      setShowResult(true)
      onComplete(averageScore)
    }
  }

  const resetExercise = () => {
    setCurrentCitation(0)
    setUserAnalysis("")
    setSelectedThemes([])
    setShowResult(false)
    setResults([])
  }

  if (!exerciseData) {
    return <div>Chargement de l'exercice...</div>
  }

  if (showResult) {
    const averageScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Analyse terminée !</h3>
          <div className="text-4xl font-bold text-primary mb-4">{averageScore}%</div>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Quote className="h-4 w-4" />
                  Citation {index + 1} - Score: {result.score}%
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <blockquote className="italic text-gray-700 border-l-2 border-gray-300 pl-4">
                  "{result.citation}" - {result.author}
                </blockquote>

                <div>
                  <h4 className="font-medium mb-2">Votre analyse :</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded">{result.userAnalysis}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Thèmes identifiés :</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.selectedThemes.map((theme: string) => (
                      <Badge key={theme} variant={result.correctThemes.includes(theme) ? "default" : "destructive"}>
                        {theme}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">Thèmes attendus :</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {result.correctThemes.map((theme: string) => (
                        <Badge key={theme} variant="outline" className="text-xs">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-medium mb-1">Explication :</h4>
                  <p className="text-sm">{result.feedback}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button onClick={resetExercise} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Recommencer
          </Button>
        </div>
      </div>
    )
  }

  const citation = exerciseData.citations[currentCitation]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          Citation {currentCitation + 1} sur {exerciseData.citations.length}
        </Badge>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCitation + 1) / exerciseData.citations.length) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="h-5 w-5" />
            Citation à analyser
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg italic text-gray-700 border-l-4 border-primary pl-4 mb-2">
            "{citation.text}"
          </blockquote>
          <p className="text-right text-sm text-muted-foreground">— {citation.author}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">1. Analysez cette citation</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Expliquez le sens de cette citation, son contexte philosophique, et son rapport au sujet étudié..."
            value={userAnalysis}
            onChange={(e) => setUserAnalysis(e.target.value)}
            className="min-h-[120px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">2. Identifiez les thèmes philosophiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {exerciseData.availableThemes.map((theme) => (
              <Button
                key={theme}
                variant={selectedThemes.includes(theme) ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeToggle(theme)}
              >
                {theme}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmitAnalysis}
          disabled={!userAnalysis.trim() || selectedThemes.length === 0}
          className="flex items-center gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          {currentCitation === exerciseData.citations.length - 1 ? "Terminer l'analyse" : "Citation suivante"}
        </Button>
      </div>
    </div>
  )
}
