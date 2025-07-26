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

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface PlanBuilderData {
  correctPlan: string[][]
  shuffledArguments: string[]
}

export interface PhilosopherMatchPair {
  philosopher: string
  concept: string
  explanation: string
}

export interface PhilosopherMatchData {
  pairs: PhilosopherMatchPair[]
  philosophers: string[]
  concepts: string[]
}

export interface CitationData {
  text: string
  author: string
  themes: string[]
  keywords: string[]
  explanation: string
}

export interface CitationExerciseData {
  citations: CitationData[]
  availableThemes: string[]
}

export interface ProblematizationSubject {
  subject: string
  expectedProblematic: string
  hints: string[]
  expectedElements: string[]
}

export interface ProblematizationExerciseData {
  subjects: ProblematizationSubject[]
}

export interface ArgumentScenario {
  context: string
  position: string
  expectedKeywords: string[]
  suggestedPhilosophers: string[]
  feedback: string
}

export interface ArgumentBuilderExerciseData {
  scenarios: ArgumentScenario[]
}
