"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, RotateCcw, Lightbulb, HelpCircle } from "lucide-react"
import { generateProblematizationExercise } from "@/lib/exercise-generators"
import type { AnalysisResult, ProblematizationExerciseData } from "@/lib/types"

interface ProblematizationExerciseProps {
  subject: string
  analysis: AnalysisResult
  onComplete: (score: number) => void
  isCompleted: boolean
}

export function ProblematizationExercise({
  subject,
  analysis,
  onComplete,
  isCompleted,
}: ProblematizationExerciseProps) {
  const [exerciseData, setExerciseData] = useState<ProblematizationExerciseData | null>(null)
  const [currentSubject, setCurrentSubject] = useState(0)
  const [userProblematic, setUserProblematic] = useState("")
  const [showHints, setShowHints] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const data = generateProblematizationExercise(analysis)
    setExerciseData(data)
  }, [analysis])

  const evaluateProblematic = (userText: string, expectedElements: string[]) => {
    const userWords = userText.toLowerCase().split(/\s+/)
    let score = 0

    // Vérification de la forme interrogative (20 points)
    if (userText.includes("?")) score += 20

    // Vérification des mots-clés attendus (60 points)
    const keywordMatches = expectedElements.filter((element) =>
      userWords.some((word) => word.includes(element.toLowerCase()) || element.toLowerCase().includes(word)),
    )
    score += (keywordMatches.length / expectedElements.length) * 60

    // Vérification de la longueur appropriée (20 points)
    if (userText.length > 50 && userText.length < 200) score += 20

    return Math.min(100, Math.round(score))
  }

  const handleSubmitProblematic = () => {
    if (!exerciseData) return

    const subjectData = exerciseData.subjects[currentSubject]
    const score = evaluateProblematic(userProblematic, subjectData.expectedElements)

    const result = {
      subject: subjectData.subject,
      userProblematic,
      expectedProblematic: subjectData.expectedProblematic,
      score,
      hints: subjectData.hints,
      expectedElements: subjectData.expectedElements,
    }

    const newResults = [...results, result]
    setResults(newResults)

    if (currentSubject < exerciseData.subjects.length - 1) {
      setCurrentSubject(currentSubject + 1)
      setUserProblematic("")
      setShowHints(false)
    } else {
      // Exercice terminé
      const averageScore = Math.round(newResults.reduce((sum, r) => sum + r.score, 0) / newResults.length)
      setShowResult(true)
      onComplete(averageScore)
    }
  }

  const resetExercise = () => {
    setCurrentSubject(0)
    setUserProblematic("")
    setShowHints(false)
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
                  Sujet {index + 1} - Score: {result.score}%
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Sujet :</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded italic">"{result.subject}"</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Votre problématique :</h4>
                  <p className="text-sm bg-blue-50 p-3 rounded">{result.userProblematic}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Problématique attendue :</h4>
                  <p className="text-sm bg-green-50 p-3 rounded">{result.expectedProblematic}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Éléments à inclure :</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.expectedElements.map((element: string) => {
                      const isIncluded = result.userProblematic.toLowerCase().includes(element.toLowerCase())
                      return (
                        <Badge
                          key={element}
                          variant={isIncluded ? "default" : "outline"}
                          className={isIncluded ? "bg-green-500" : ""}
                        >
                          {element}
                        </Badge>
                      )
                    })}
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

  const subjectData = exerciseData.subjects[currentSubject]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          Sujet {currentSubject + 1} sur {exerciseData.subjects.length}
        </Badge>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentSubject + 1) / exerciseData.subjects.length) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Sujet à problématiser
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium italic text-center p-4 bg-gray-50 rounded">"{subjectData.subject}"</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Formulez une problématique</CardTitle>
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Une bonne problématique interroge les enjeux du sujet et révèle ses tensions
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-1"
            >
              <Lightbulb className="h-4 w-4" />
              {showHints ? "Masquer" : "Indices"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showHints && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium mb-2 text-yellow-800">Indices :</h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                {subjectData.hints.map((hint, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Textarea
            placeholder="Exemple : Dans quelle mesure peut-on affirmer que... ? Comment concilier... et... ? Faut-il considérer que... ?"
            value={userProblematic}
            onChange={(e) => setUserProblematic(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="text-xs text-muted-foreground">
            <p>Conseils :</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Utilisez une forme interrogative</li>
              <li>Mettez en tension les concepts du sujet</li>
              <li>Évitez les questions fermées (oui/non)</li>
              <li>Montrez les enjeux philosophiques</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmitProblematic}
          disabled={!userProblematic.trim()}
          className="flex items-center gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          {currentSubject === exerciseData.subjects.length - 1 ? "Terminer l'exercice" : "Sujet suivant"}
        </Button>
      </div>
    </div>
  )
}
