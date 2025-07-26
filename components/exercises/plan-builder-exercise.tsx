"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVertical, CheckCircle, RotateCcw } from "lucide-react"
import { generatePlanBuilderExercise } from "@/lib/exercise-generators"
import type { AnalysisResult, PlanBuilderData } from "@/lib/types"

interface PlanBuilderExerciseProps {
  subject: string
  analysis: AnalysisResult
  onComplete: (score: number) => void
  isCompleted: boolean
}

export function PlanBuilderExercise({ subject, analysis, onComplete, isCompleted }: PlanBuilderExerciseProps) {
  const [exerciseData, setExerciseData] = useState<PlanBuilderData | null>(null)
  const [userPlan, setUserPlan] = useState<string[][]>([[], [], []])
  const [availableArguments, setAvailableArguments] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const data = generatePlanBuilderExercise(analysis)
    setExerciseData(data)
    setAvailableArguments([...data.shuffledArguments])
  }, [analysis])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === "available") {
      // Déplacer de la liste disponible vers une partie du plan
      const partIndex = Number.parseInt(destination.droppableId.replace("part-", ""))
      const argument = availableArguments[source.index]

      const newAvailable = [...availableArguments]
      newAvailable.splice(source.index, 1)

      const newUserPlan = [...userPlan]
      newUserPlan[partIndex] = [...newUserPlan[partIndex]]
      newUserPlan[partIndex].splice(destination.index, 0, argument)

      setAvailableArguments(newAvailable)
      setUserPlan(newUserPlan)
    } else if (source.droppableId.startsWith("part-")) {
      const sourcePartIndex = Number.parseInt(source.droppableId.replace("part-", ""))

      if (destination.droppableId === "available") {
        // Remettre dans la liste disponible
        const argument = userPlan[sourcePartIndex][source.index]

        const newUserPlan = [...userPlan]
        newUserPlan[sourcePartIndex] = [...newUserPlan[sourcePartIndex]]
        newUserPlan[sourcePartIndex].splice(source.index, 1)

        const newAvailable = [...availableArguments]
        newAvailable.splice(destination.index, 0, argument)

        setUserPlan(newUserPlan)
        setAvailableArguments(newAvailable)
      } else if (destination.droppableId.startsWith("part-")) {
        // Déplacer entre parties du plan
        const destPartIndex = Number.parseInt(destination.droppableId.replace("part-", ""))
        const argument = userPlan[sourcePartIndex][source.index]

        const newUserPlan = [...userPlan]
        newUserPlan[sourcePartIndex] = [...newUserPlan[sourcePartIndex]]
        newUserPlan[sourcePartIndex].splice(source.index, 1)

        newUserPlan[destPartIndex] = [...newUserPlan[destPartIndex]]
        newUserPlan[destPartIndex].splice(destination.index, 0, argument)

        setUserPlan(newUserPlan)
      }
    }
  }

  const checkAnswer = () => {
    if (!exerciseData) return

    let correctPlacements = 0
    let totalArguments = 0

    exerciseData.correctPlan.forEach((part, partIndex) => {
      part.forEach((argument) => {
        totalArguments++
        if (userPlan[partIndex].includes(argument)) {
          correctPlacements++
        }
      })
    })

    const calculatedScore = Math.round((correctPlacements / totalArguments) * 100)
    setScore(calculatedScore)
    setShowResult(true)
    onComplete(calculatedScore)
  }

  const resetExercise = () => {
    if (!exerciseData) return
    setUserPlan([[], [], []])
    setAvailableArguments([...exerciseData.shuffledArguments])
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

        <div className="space-y-4">
          <h4 className="font-semibold">Plan correct :</h4>
          {exerciseData.correctPlan.map((part, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{["I. Thèse", "II. Antithèse", "III. Synthèse"][index]}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {part.map((argument, argIndex) => (
                    <div
                      key={argIndex}
                      className={`p-2 rounded text-sm ${
                        userPlan[index].includes(argument) ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {argument}
                    </div>
                  ))}
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Organisez les arguments dans le plan dialectique</h3>
          <p className="text-sm text-muted-foreground">Glissez-déposez les arguments dans les bonnes parties du plan</p>
        </div>

        {/* Available Arguments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Arguments disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <Droppable droppableId="available">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[100px] space-y-2">
                  {availableArguments.map((argument, index) => (
                    <Draggable key={argument} draggableId={argument} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border cursor-move hover:bg-gray-100"
                        >
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{argument}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>

        {/* Plan Parts */}
        <div className="grid gap-4">
          {["I. Thèse", "II. Antithèse", "III. Synthèse"].map((title, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  {title}
                  <Badge variant="outline">{userPlan[index].length} arguments</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={`part-${index}`}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[80px] space-y-2">
                      {userPlan[index].map((argument, argIndex) => (
                        <Draggable key={argument} draggableId={argument} index={argIndex}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border cursor-move hover:bg-blue-100"
                            >
                              <GripVertical className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{argument}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button onClick={checkAnswer} disabled={availableArguments.length > 0} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Vérifier ma réponse
          </Button>
        </div>
      </div>
    </DragDropContext>
  )
}
