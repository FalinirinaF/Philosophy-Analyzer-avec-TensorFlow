"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { generatePhilosopherMatchExercise } from "@/lib/exercise-generators"
import type { AnalysisResult, PhilosopherMatchData } from "@/lib/types"

interface PhilosopherMatchExerciseProps {
  subject: string
  analysis: AnalysisResult
  onComplete: (score: number) => void
  isCompleted: boolean
}

export function PhilosopherMatchExercise({
  subject,
  analysis,
  onComplete,
  isCompleted,
}: PhilosopherMatchExerciseProps) {
  const [exerciseData, setExerciseData] = useState<PhilosopherMatchData | null>(null)
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<string | null>(null)
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const data = generatePhilosopherMatchExercise(analysis)
    setExerciseData(data)
  }, [analysis])

  const handlePhilosopherClick = (philosopher: string) => {
    if (matches[philosopher]) return // Déjà associé

    if (selectedPhilosopher === philosopher) {
      setSelectedPhilosopher(null)
    } else {
      setSelectedPhilosopher(philosopher)
      setSelectedConcept(null)
    }
  }

  const handleConceptClick = (concept: string) => {
    if (Object.values(matches).includes(concept)) return // Déjà associé

    if (selectedConcept === concept) {
      setSelectedConcept(null)
    } else {
      setSelectedConcept(concept)
      setSelectedPhilosopher(null)
    }
  }

  const handleMatch = () => {
    if (!selectedPhilosopher || !selectedConcept) return

    setMatches((prev) => ({
      ...prev,
      [selectedPhilosopher]: selectedConcept,
    }))

    setSelectedPhilosopher(null)
    setSelectedConcept(null)
  }

  const removeMatch = (philosopher: string) => {
    const newMatches = { ...matches }
    delete newMatches[philosopher]
    setMatches(newMatches)
  }

  const checkAnswers = () => {
    if (!exerciseData) return

    let correctMatches = 0
    const totalMatches = exerciseData.pairs.length

    exerciseData.pairs.forEach((pair) => {
      if (matches[pair.philosopher] === pair.concept) {
        correctMatches++
      }
    })

    const calculatedScore = Math.round((correctMatches / totalMatches) * 100)
    setScore(calculatedScore)
    setShowResult(true)
    onComplete(calculatedScore)
  }

  const resetExercise = () => {
    setMatches({})
    setSelectedPhilosopher(null)
    setSelectedConcept(null)
    setShowResult(false)
    setScore(0)
  }

  if (!exerciseData) {
    return <div>Chargement de l'exercice...</div>
  }

  if (showResult) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Exercice terminé !</h3>
          <div className="text-4xl font-bold text-primary mb-4">{score}%</div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Associations correctes :</h4>
          {exerciseData.pairs.map((pair, index) => {
            const userMatch = matches[pair.philosopher]
            const isCorrect = userMatch === pair.concept

            return (
              <Card key={index} className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{pair.philosopher}</Badge>
                        <span>→</span>
                        <Badge variant={isCorrect ? "default" : "destructive"}>{pair.concept}</Badge>
                      </div>
                      {!isCorrect && userMatch && <p className="text-sm text-red-600">Votre réponse : {userMatch}</p>}
                      <p className="text-xs text-muted-foreground mt-1">{pair.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
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

  const canMatch = selectedPhilosopher && selectedConcept
  const allMatched = Object.keys(matches).length === exerciseData.pairs.length

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Associez les philosophes à leurs concepts</h3>
        <p className="text-sm text-muted-foreground">Cliquez sur un philosophe puis sur un concept pour les associer</p>
      </div>

      {/* Current Selection */}
      {(selectedPhilosopher || selectedConcept) && (
        <Card className="bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedPhilosopher && <Badge variant="outline">{selectedPhilosopher}</Badge>}
                {selectedPhilosopher && selectedConcept && <span>→</span>}
                {selectedConcept && <Badge variant="outline">{selectedConcept}</Badge>}
              </div>
              {canMatch && (
                <Button size="sm" onClick={handleMatch}>
                  Associer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Philosophers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Philosophes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {exerciseData.philosophers.map((philosopher) => {
              const isMatched = matches[philosopher]
              const isSelected = selectedPhilosopher === philosopher

              return (
                <Button
                  key={philosopher}
                  variant={isSelected ? "default" : isMatched ? "secondary" : "outline"}
                  className="w-full justify-between"
                  onClick={() => handlePhilosopherClick(philosopher)}
                  disabled={!!isMatched}
                >
                  <span>{philosopher}</span>
                  {isMatched && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs">→ {isMatched}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeMatch(philosopher)
                        }}
                      >
                        ✕
                      </Button>
                    </div>
                  )}
                </Button>
              )
            })}
          </CardContent>
        </Card>

        {/* Concepts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Concepts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {exerciseData.concepts.map((concept) => {
              const isMatched = Object.values(matches).includes(concept)
              const isSelected = selectedConcept === concept

              return (
                <Button
                  key={concept}
                  variant={isSelected ? "default" : isMatched ? "secondary" : "outline"}
                  className="w-full"
                  onClick={() => handleConceptClick(concept)}
                  disabled={isMatched}
                >
                  {concept}
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Current Matches */}
      {Object.keys(matches).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Associations actuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(matches).map(([philosopher, concept]) => (
                <div key={philosopher} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{philosopher}</Badge>
                    <span>→</span>
                    <Badge variant="outline">{concept}</Badge>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => removeMatch(philosopher)}>
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button onClick={checkAnswers} disabled={!allMatched} className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Vérifier mes associations
        </Button>
      </div>
    </div>
  )
}
