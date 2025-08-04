import type {
  AnalysisResult,
  QuizQuestion,
  PlanBuilderData,
  PhilosopherMatchData,
  CitationExerciseData,
  ProblematizationExerciseData,
  ArgumentBuilderExerciseData,
} from "./types"
import { getCitationsByTheme } from "./philosophical-citations"

export function generateQuizQuestions(analysis: AnalysisResult): QuizQuestion[] {
  const questions: QuizQuestion[] = []

  // Question sur le thème principal
  questions.push({
    question: `Quel est le thème principal abordé dans le sujet analysé ?`,
    options: [analysis.mainTheme, "La morale", "La politique", "L'esthétique"].sort(() => Math.random() - 0.5),
    correctAnswer: 0,
    explanation: `Le thème principal identifié est "${analysis.mainTheme}" car il correspond aux concepts centraux du sujet.`,
  })

  // Question sur les philosophes
  if (analysis.philosophers.length > 0) {
    const correctPhilosopher = analysis.philosophers[0]
    const otherPhilosophers = ["Descartes", "Hegel", "Nietzsche", "Foucault"].filter(
      (p) => !analysis.philosophers.includes(p),
    )

    questions.push({
      question: `Quel philosophe est particulièrement associé au thème "${analysis.mainTheme}" ?`,
      options: [correctPhilosopher, ...otherPhilosophers.slice(0, 3)].sort(() => Math.random() - 0.5),
      correctAnswer: 0,
      explanation: `${correctPhilosopher} a développé des réflexions importantes sur ${analysis.mainTheme.toLowerCase()}.`,
    })
  }

  // Question sur une citation célèbre
  const themeCitations = getCitationsByTheme(analysis.mainTheme)
  if (themeCitations.length > 0) {
    const citation = themeCitations[0]
    const otherAuthors = ["Platon", "Kant", "Hume", "Spinoza"].filter((a) => a !== citation.author)

    questions.push({
      question: `Qui a écrit : "${citation.text}" ?`,
      options: [citation.author, ...otherAuthors.slice(0, 3)].sort(() => Math.random() - 0.5),
      correctAnswer: 0,
      explanation:
        citation.explanation ||
        `Cette citation de ${citation.author} exprime une conception importante de ${analysis.mainTheme.toLowerCase()}.`,
    })
  }

  // Question sur la problématique
  questions.push({
    question: "Quelle est la fonction principale d'une problématique en philosophie ?",
    options: [
      "Révéler les tensions et enjeux du sujet",
      "Donner une réponse définitive",
      "Résumer le cours",
      "Citer des philosophes",
    ],
    correctAnswer: 0,
    explanation:
      "Une problématique doit mettre en lumière les tensions conceptuelles et les enjeux philosophiques du sujet.",
  })

  // Question sur le plan dialectique
  questions.push({
    question: "Dans un plan dialectique, que représente la synthèse ?",
    options: [
      "Un dépassement des oppositions précédentes",
      "Une simple addition de la thèse et de l'antithèse",
      "Une répétition de la thèse",
      "Une négation de l'antithèse",
    ],
    correctAnswer: 0,
    explanation:
      "La synthèse vise à dépasser l'opposition entre thèse et antithèse en proposant une solution nouvelle.",
  })

  return questions.slice(0, 5) // Limiter à 5 questions
}

export function generatePlanBuilderExercise(analysis: AnalysisResult): PlanBuilderData {
  const correctPlan = analysis.dialecticalPlan.map((part) => part.keyArguments)
  const allArguments = correctPlan.flat()
  const shuffledArguments = [...allArguments].sort(() => Math.random() - 0.5)

  return {
    correctPlan,
    shuffledArguments,
  }
}

export function generatePhilosopherMatchExercise(analysis: AnalysisResult): PhilosopherMatchData {
  const philosopherConcepts = {
    Platon: ["Vérité", "Justice", "Beauté"],
    Aristote: ["Bonheur", "Justice", "Vertu"],
    Kant: ["Liberté", "Devoir", "Autonomie"],
    Sartre: ["Liberté", "Existence", "Authenticité"],
    Descartes: ["Vérité", "Doute", "Certitude"],
    Nietzsche: ["Valeurs", "Volonté", "Critique"],
    Rousseau: ["Nature", "Société", "Contrat"],
    Spinoza: ["Liberté", "Nécessité", "Éthique"],
    Marx: ["Travail", "Société", "Histoire"],
    Heidegger: ["Être", "Temps", "Technique"],
    Freud: ["Inconscient", "Conscience", "Désir"],
    Épicure: ["Bonheur", "Plaisir", "Mort"],
  }

  const availablePhilosophers = analysis.philosophers.slice(0, 4)
  const pairs = availablePhilosophers.map((philosopher) => {
    const concepts = philosopherConcepts[philosopher] || [analysis.mainTheme]
    const concept = concepts.find((c) => analysis.keyConcepts.includes(c)) || concepts[0]

    return {
      philosopher,
      concept,
      explanation: `${philosopher} a développé une réflexion importante sur ${concept.toLowerCase()}.`,
    }
  })

  return {
    pairs,
    philosophers: pairs.map((p) => p.philosopher).sort(() => Math.random() - 0.5),
    concepts: pairs.map((p) => p.concept).sort(() => Math.random() - 0.5),
  }
}

export function generateCitationAnalysisExercise(analysis: AnalysisResult): CitationExerciseData {
  // Récupérer les citations du thème principal
  let citations = getCitationsByTheme(analysis.mainTheme)

  // Si pas assez de citations pour ce thème, ajouter des citations aléatoires
  if (citations.length < 2) {
    const additionalCitations = getCitationsByTheme("Liberté").concat(getCitationsByTheme("Vérité"))
    citations = citations.concat(additionalCitations.slice(0, 2 - citations.length))
  }

  // Transformer les citations en format d'exercice
  const exerciseCitations = citations.slice(0, 2).map((citation) => ({
    text: citation.text,
    author: citation.author,
    themes: [citation.theme, ...analysis.keyConcepts.slice(0, 2)],
    keywords: citation.text
      .toLowerCase()
      .split(" ")
      .filter(
        (word) =>
          word.length > 3 && !["dans", "avec", "pour", "sans", "sous", "cette", "celui", "celle"].includes(word),
      )
      .slice(0, 5),
    explanation:
      citation.explanation || `Cette citation exprime une conception importante de ${citation.theme.toLowerCase()}.`,
  }))

  const allThemes = Array.from(
    new Set([...analysis.keyConcepts, "Existence", "Société", "Nature", "Raison", "Expérience", "Morale"]),
  )

  return {
    citations: exerciseCitations,
    availableThemes: allThemes,
  }
}

export function generateProblematizationExercise(analysis: AnalysisResult): ProblematizationExerciseData {
  const subjectTemplates = [
    {
      template: "La {concept} est-elle {qualifier} ?",
      hints: [
        "Interrogez la nature de {concept}",
        "Questionnez le terme '{qualifier}'",
        "Cherchez les tensions conceptuelles",
      ],
    },
    {
      template: "Peut-on vivre sans {concept} ?",
      hints: ["Définissez ce qu'est {concept}", "Questionnez la nécessité", "Explorez les alternatives"],
    },
    {
      template: "Faut-il avoir peur de {concept} ?",
      hints: ["Analysez la notion de peur", "Questionnez la valeur de {concept}", "Explorez les enjeux éthiques"],
    },
  ]

  const qualifiers = ["une illusion", "nécessaire", "possible", "désirable"]
  const subjects = []

  for (let i = 0; i < 3; i++) {
    const template = subjectTemplates[i % subjectTemplates.length]
    const concept = analysis.keyConcepts[i % analysis.keyConcepts.length] || analysis.mainTheme
    const qualifier = qualifiers[i % qualifiers.length]

    const subject = template.template.replace(/{concept}/g, concept.toLowerCase()).replace(/{qualifier}/g, qualifier)

    const hints = template.hints.map((hint) =>
      hint.replace(/{concept}/g, concept.toLowerCase()).replace(/{qualifier}/g, qualifier),
    )

    subjects.push({
      subject,
      expectedProblematic: `Comment concilier ${concept.toLowerCase()} et ses limites ? Dans quelle mesure ${concept.toLowerCase()} peut-elle être considérée comme ${qualifier} ?`,
      hints,
      expectedElements: [concept.toLowerCase(), qualifier, "mesure", "comment", "pourquoi"],
    })
  }

  return { subjects }
}

export function generateArgumentBuilderExercise(analysis: AnalysisResult): ArgumentBuilderExerciseData {
  const scenarios = [
    {
      context: `Dans le cadre d'une dissertation sur "${analysis.mainTheme}", vous devez défendre la position suivante :`,
      position: `${analysis.mainTheme} est fondamentale pour l'existence humaine`,
      expectedKeywords: [analysis.mainTheme.toLowerCase(), "existence", "fondamental", "humain", "nécessaire"],
      suggestedPhilosophers: analysis.philosophers.slice(0, 3),
      feedback: `Un bon argument sur ${analysis.mainTheme} doit articuler concept, raisonnement et exemple concret.`,
    },
    {
      context: `Face à une objection qui nierait l'importance de ${analysis.mainTheme}, vous devez répondre :`,
      position: `${analysis.mainTheme} ne peut être ignorée`,
      expectedKeywords: [analysis.mainTheme.toLowerCase(), "importance", "nécessité", "conséquences"],
      suggestedPhilosophers: analysis.philosophers.slice(0, 3),
      feedback: `Pour réfuter une objection, il faut montrer les conséquences de l'absence de ${analysis.mainTheme}.`,
    },
    {
      context: `Dans une synthèse dialectique, vous devez montrer comment dépasser les contradictions autour de ${analysis.mainTheme} :`,
      position: `${analysis.mainTheme} peut être repensée`,
      expectedKeywords: [analysis.mainTheme.toLowerCase(), "dépassement", "synthèse", "nouveau", "perspective"],
      suggestedPhilosophers: analysis.philosophers.slice(0, 3),
      feedback: `Une synthèse doit proposer une nouvelle approche qui intègre les oppositions précédentes.`,
    },
  ]

  return { scenarios }
}
