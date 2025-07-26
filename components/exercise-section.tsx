"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Brain, Target, Users, Quote, Lightbulb, BookOpen } from "lucide-react"
import { QuizExercise } from "./exercises/quiz-exercise"
import { PlanBuilderExercise } from "./exercises/plan-builder-exercise"
import { PhilosopherMatchExercise } from "./exercises/philosopher-match-exercise"
import { CitationAnalysisExercise } from "./exercises/citation-analysis-exercise"
import { ProblematizationExercise } from "./exercises/problematization-exercise"
import { ArgumentBuilderExercise } from "./exercises/argument-builder-exercise"
import type { AnalysisResult } from "@/lib/types"

interface ExerciseSectionProps {
  subject: string
  analysis: AnalysisResult
}

export function ExerciseSection({ subject, analysis }: ExerciseSectionProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [scores, setScores] = useState<Record<string, number>>({})

  const handleExerciseComplete = (exerciseId: string, score: number) => {
    setCompletedExercises((prev) => new Set([...prev, exerciseId]))
    setScores((prev) => ({ ...prev, [exerciseId]: score }))
  }

  const totalExercises = 6
  const completedCount = completedExercises.size
  const averageScore =
    Object.values(scores).length > 0
      ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)
      : 0

  const exercises = [
    {
      id: "quiz",
      title: "Quiz sur les notions",
      description: "Testez vos connaissances sur les concepts philosophiques",
      icon: Brain,
      component: QuizExercise,
    },
    {
      id: "plan-builder",
      title: "Construction de plan",
      description: "Organisez les arguments dans un plan dialectique",
      icon: Target,
      component: PlanBuilderExercise,
    },
    {
      id: "philosopher-match",
      title: "Association philosophes",
      description: "Associez les philosophes à leurs concepts",
      icon: Users,
      component: PhilosopherMatchExercise,
    },
    {
      id: "citation-analysis",
      title: "Analyse de citations",
      description: "Analysez des citations philosophiques",
      icon: Quote,
      component: CitationAnalysisExercise,
    },
    {
      id: "problematization",
      title: "Problématisation",
      description: "Formulez des problématiques pertinentes",
      icon: Lightbulb,
      component: ProblematizationExercise,
    },
    {
      id: "argument-builder",
      title: "Construction d'arguments",
      description: "Développez des arguments philosophiques",
      icon: BookOpen,
      component: ArgumentBuilderExercise,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Exercices interactifs
        </CardTitle>
        <CardDescription>Approfondissez votre compréhension avec des exercices pratiques</CardDescription>

        {/* Progress Overview */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression</span>
            <span>
              {completedCount}/{totalExercises} exercices
            </span>
          </div>
          <Progress value={(completedCount / totalExercises) * 100} className="h-2" />
          {averageScore > 0 && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Score moyen</span>
              <span>{averageScore}%</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="quiz" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {exercises.map((exercise) => {
              const Icon = exercise.icon
              const isCompleted = completedExercises.has(exercise.id)
              return (
                <TabsTrigger key={exercise.id} value={exercise.id} className="flex items-center gap-1 text-xs">
                  <Icon className="h-3 w-3" />
                  {isCompleted && <CheckCircle className="h-3 w-3 text-green-500" />}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {exercises.map((exercise) => {
            const ExerciseComponent = exercise.component
            return (
              <TabsContent key={exercise.id} value={exercise.id} className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <exercise.icon className="h-5 w-5" />
                      {exercise.title}
                      {completedExercises.has(exercise.id) && (
                        <Badge variant="secondary" className="ml-auto">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Terminé ({scores[exercise.id]}%)
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExerciseComponent
                      subject={subject}
                      analysis={analysis}
                      onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      isCompleted={completedExercises.has(exercise.id)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}
