const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export interface AnalysisRequest {
  subject: string
}

export interface AnalysisResponse {
  mainTheme: string
  keyConcepts: string[]
  problematic: string
  dialecticalPlan: Array<{
    title: string
    description: string
    keyArguments: string[]
  }>
  philosophers: string[]
  examples: string[]
  confidence: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  async analyzeSubject(subject: string): Promise<AnalysisResponse> {
    try {
      // Import dynamique pour éviter les problèmes de SSR
      const { analyzePhilosophicalSubject } = await import("./philosophy-analyzer")

      console.log("Analyse locale du sujet:", subject)
      const result = analyzePhilosophicalSubject(subject)

      // Ajout d'un score de confiance simulé
      const analysisWithConfidence = {
        ...result,
        confidence: 0.85 + Math.random() * 0.1, // Entre 85% et 95%
      }

      console.log("Résultat de l'analyse:", analysisWithConfidence)
      return analysisWithConfidence
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error)
      throw new Error("Erreur lors de l'analyse du sujet")
    }
  }

  async getRandomSubject(): Promise<string> {
    try {
      const { generateRandomSubject } = await import("./philosophy-analyzer")
      return generateRandomSubject()
    } catch (error) {
      console.error("Erreur lors de la génération:", error)
      // Fallback avec sujets locaux
      const fallbackSubjects = [
        "La liberté est-elle une illusion ?",
        "Peut-on dire que la vérité est relative ?",
        "La justice n'est-elle qu'un rapport de force ?",
        "Le bonheur est-il le but de l'existence ?",
        "Sommes-nous responsables de nos actes inconscients ?",
        "Autrui est-il un obstacle à ma liberté ?",
        "Y a-t-il des devoirs envers soi-même ?",
        "Le temps nous appartient-il ?",
        "L'art nous éloigne-t-il de la réalité ?",
        "Le travail libère-t-il l'homme ?",
      ]
      return fallbackSubjects[Math.floor(Math.random() * fallbackSubjects.length)]
    }
  }

  async checkHealth(): Promise<boolean> {
    // Toujours retourner true car on utilise l'analyse locale
    return true
  }
}

export const apiClient = new ApiClient()
