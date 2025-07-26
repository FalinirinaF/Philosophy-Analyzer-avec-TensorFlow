"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { generateQuizQuestions } from "@/lib/exercise-generators"
import type { AnalysisResult, QuizQuestion } from "@/lib/types"

interface QuizExerciseProps {
  subject: string
  analysis: AnalysisResult
  onComplete: (score: number) => void
  isCompleted: boolean
}

export function QuizExercise({ subject, analysis, onComplete, isCompleted }: QuizExerciseProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  useEffect(() => {
    const quizQuestions = generateQuizQuestions(analysis)
    setQuestions(quizQuestions)
  }, [analysis])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Quiz terminé
      const correctAnswers = newAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length
      const score = Math.round((correctAnswers / questions.length) * 100)

      setQuizCompleted(true)
      setShowResult(true)
      onComplete(score)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowResult(false)
    setQuizCompleted(false)
    const quizQuestions = generateQuizQuestions(analysis)
    setQuestions(quizQuestions)
  }

  if (questions.length === 0) {
    return <div>Chargement du quiz...</div>
  }

  if (showResult) {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length
    const score = Math.round((correctAnswers / questions.length) * 100)

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Quiz terminé !</h3>
          <div className="text-4xl font-bold text-primary mb-4">{score}%</div>
          <p className="text-muted-foreground">
            {correctAnswers} bonnes réponses sur {questions.length} questions
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((question, index) => {
            const userAnswer = answers[index]
            const isCorrect = userAnswer === question.correctAnswer

            return (
              <Card key={index} className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Votre réponse : {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 mt-1">
                          Bonne réponse : {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">{question.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button onClick={resetQuiz} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Recommencer le quiz
          </Button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          Question {currentQuestion + 1} sur {questions.length}
        </Badge>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

          <div className="space-y-2">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentQuestion === 0}
          onClick={() => {
            setCurrentQuestion(currentQuestion - 1)
            setSelectedAnswer(answers[currentQuestion - 1] || null)
          }}
        >
          Précédent
        </Button>

        <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
          {currentQuestion === questions.length - 1 ? "Terminer" : "Suivant"}
        </Button>
      </div>
    </div>
  )
}
