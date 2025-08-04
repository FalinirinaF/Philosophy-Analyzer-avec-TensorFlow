"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Quote, Shuffle, BookOpen } from "lucide-react"
import { getRandomCitation, getAllThemes } from "@/lib/philosophical-citations"
import type { PhilosophicalCitation } from "@/lib/philosophical-citations"

interface CitationDisplayProps {
  theme?: string
  className?: string
}

export function CitationDisplay({ theme, className }: CitationDisplayProps) {
  const [currentCitation, setCurrentCitation] = useState<PhilosophicalCitation | null>(null)
  const [selectedTheme, setSelectedTheme] = useState(theme || "")

  const handleRandomCitation = () => {
    const citation = selectedTheme ? getRandomCitation(selectedTheme) : getRandomCitation()
    setCurrentCitation(citation)
  }

  const handleThemeSelect = (newTheme: string) => {
    setSelectedTheme(newTheme)
    const citation = getRandomCitation(newTheme)
    setCurrentCitation(citation)
  }

  const themes = getAllThemes()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Citations philosophiques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Theme Selection */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Choisir un thème :</h4>
          <div className="flex flex-wrap gap-2">
            {themes.map((themeOption) => (
              <Button
                key={themeOption}
                variant={selectedTheme === themeOption ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeSelect(themeOption)}
              >
                {themeOption}
              </Button>
            ))}
          </div>
        </div>

        {/* Random Citation Button */}
        <Button onClick={handleRandomCitation} className="w-full flex items-center gap-2">
          <Shuffle className="h-4 w-4" />
          Citation aléatoire {selectedTheme && `sur ${selectedTheme}`}
        </Button>

        {/* Citation Display */}
        {currentCitation && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="space-y-3">
                <blockquote className="text-lg italic text-gray-700 border-l-4 border-blue-500 pl-4">
                  "{currentCitation.text}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <p className="text-right text-sm font-medium">— {currentCitation.author}</p>
                  <Badge variant="outline">{currentCitation.theme}</Badge>
                </div>

                {currentCitation.explanation && (
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 mt-0.5 text-blue-600" />
                      <div>
                        <h5 className="text-sm font-medium mb-1">Explication :</h5>
                        <p className="text-sm text-gray-600">{currentCitation.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
