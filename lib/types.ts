export interface PhilosophicalConcept {
  name: string
  definition: string
  examples: string[]
  relatedPhilosophers: string[]
  keywords: string[]
}

export interface DialecticalPart {
  title: string
  description: string
  keyArguments: string[]
}

export interface AnalysisResult {
  mainTheme: string
  keyConcepts: string[]
  problematic: string
  dialecticalPlan: DialecticalPart[]
  philosophers: string[]
  examples: string[]
}
