"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, RotateCcw, BookOpen } from "lucide-react"
import { generateArgumentBuilderExercise } from "@/lib/exercise-generators"
import type { AnalysisResult, ArgumentBuilderExerciseData } from "@/lib/types"

interface ArgumentBuilderExerciseProps {
  subject: string
  analysis: AnalysisResult
  onComplete: (score: number) => void
  isCompleted: boolean
}

interface Argument {
  thesis: string
  reasoning: string
  example: string
  philosopher: string
}

export function ArgumentBuilderExercise({ subject, analysis, onComplete, isCompleted }: ArgumentBuilderExerciseProps) {
  const [exerciseData, setExerciseData] = useState<ArgumentBuilderExerciseData | null>(null)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [userArgument, setUserArgument] = useState<Argument>({
    thesis: "",
    reasoning: "",
    example: "",
    philosopher: "",
  })
  const [showResult, setShowResult] = useState(false)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const data = generateArgumentBuilderExercise(analysis)
    setExerciseData(data)
  }, [analysis])

  const evaluateArgument = (argument: Argument, scenario: any) => {
    let score = 0

    // Évaluation de la thèse (25 points)
    if (argument.thesis.length > 20) score += 25

    // Évaluation du raisonnement (35 points)
    const reasoningWords = argument.reasoning.toLowerCase().split(/\s+/)
    const keywordMatches = scenario.expectedKeywords.filter((keyword: string) =>
      reasoningWords.some((word) => word.includes(keyword.toLowerCase())),
    )
    score += (keywordMatches.length / scenario.expectedKeywords.length) * 35

    // Évaluation de l'exemple (25 points)
    if (argument.example.length > 20) score += 25

    // Évaluation du philosophe (15 points)
    if (scenario.suggestedPhilosophers.includes(argument.philosopher)) score += 15

    return Math.min(100, Math.round(score))
  }

  const handleSubmitArgument = () => {
    if (!exerciseData) return

    const scenario = exerciseData.scenarios[currentScenario]
    const score = evaluateArgument(userArgument, scenario)

    const result = {
      scenario: scenario.context,
      position: scenario.position,
      userArgument,
      score,
      feedback: scenario.feedback,
      expectedKeywords: scenario.expectedKeywords,
      suggestedPhilosophers: scenario.suggestedPhilosophers,
    }

    const newResults = [...results, result]
    setResults(newResults)

    if (currentScenario < exerciseData.scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setUserArgument({
        thesis: "",
        reasoning: "",
        example: "",
        philosopher: "",
      })
    } else {
      // Exercice terminé
      const averageScore = Math.round(newResults.reduce((sum, r) => sum + r.score, 0) / newResults.length)
      setShowResult(true)
      onComplete(averageScore)
    }
  }

  const resetExercise = () => {
    setCurrentScenario(0)
    setUserArgument({
      thesis: "",
      reasoning: "",
      example: "",
      philosopher: "",
    })
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
          <h3 className="text-2xl font-bold mb-2">Exercice terminé !</h3>
          <div className="text-4xl font-bold text-primary mb-4">{averageScore}%</div>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-sm">
                  Argument {index + 1} - Score: {result.score}%
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Contexte :</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded">{result.scenario}</p>
                  <Badge variant="outline" className="mt-2">
                    {result.position}
                  </Badge>
                </div>

                <div className="grid gap-3">
                  <div>
                    <h4 className="font-medium mb-1">Votre thèse :</h4>
                    <p className="text-sm bg-blue-50 p-2 rounded">{result.userArgument.thesis}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Votre raisonnement :</h4>
                    <p className="text-sm bg-blue-50 p-2 rounded">{result.userArgument.reasoning}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Votre exemple :</h4>
                    <p className="text-sm bg-blue-50 p-2 rounded">{result.userArgument.example}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Philosophe choisi :</h4>
                    <Badge
                      variant={
                        result.suggestedPhilosophers.includes(result.userArgument.philosopher) ? "default" : "outline"
                      }
                    >
                      {result.userArgument.philosopher || "Aucun"}
                    </Badge>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-medium mb-1">Retour :</h4>
                  <p className="text-sm">{result.feedback}</p>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Mots-clés attendus :</p>
                    <div className="flex flex-wrap gap-1">
                      {result.expectedKeywords.map((keyword: string) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
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

  const scenario = exerciseData.scenarios[currentScenario]
  const isComplete = userArgument.thesis && userArgument.reasoning && userArgument.example

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          Argument {currentScenario + 1} sur {exerciseData.scenarios.length}
        </Badge>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentScenario + 1) / exerciseData.scenarios.length) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Contexte argumentatif
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm bg-gray-50 p-4 rounded">{scenario.context}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Position à défendre :</span>
            <Badge variant="default">{scenario.position}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">1. Formulez votre thèse</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Énoncez clairement votre position sur la question..."
              value={userArgument.thesis}
              onChange={(e) => setUserArgument((prev) => ({ ...prev, thesis: e.target.value }))}
              className="min-h-[80px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">2. Développez votre raisonnement</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Expliquez pourquoi votre thèse est valide, développez vos arguments logiques..."
              value={userArgument.reasoning}
              onChange={(e) => setUserArgument((prev) => ({ ...prev, reasoning: e.target.value }))}
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">3. Donnez un exemple concret</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Illustrez votre argument avec un exemple philosophique, historique ou contemporain..."
              value={userArgument.example}
              onChange={(e) => setUserArgument((prev) => ({ ...prev, example: e.target.value }))}
              className="min-h-[80px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">4. Choisissez un philosophe de référence (optionnel)</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={userArgument.philosopher}
              onValueChange={(value) => setUserArgument((prev) => ({ ...prev, philosopher: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un philosophe..." />
              </SelectTrigger>
              <SelectContent>
                {scenario.suggestedPhilosophers.map((philosopher: string) => (
                  <SelectItem key={philosopher} value={philosopher}>
                    {philosopher}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSubmitArgument} disabled={!isComplete} className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          {currentScenario === exerciseData.scenarios.length - 1 ? "Terminer l'exercice" : "Argument suivant"}
        </Button>
      </div>
    </div>
  )
}
