import type {
  AnalysisResult,
  QuizQuestion,
  PlanBuilderData,
  PhilosopherMatchData,
  CitationExerciseData,
  ProblematizationExerciseData,
  ArgumentBuilderExerciseData,
} from "./types"

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

  // Question sur les concepts
  if (analysis.keyConcepts.length > 1) {
    questions.push({
      question: `Parmi ces notions, lesquelles sont liées au sujet analysé ?`,
      options: [analysis.keyConcepts.slice(0, 2).join(" et "), "Temps et espace", "Matière et forme", "Cause et effet"],
      correctAnswer: 0,
      explanation: `Ces notions sont directement liées aux enjeux philosophiques du sujet.`,
    })
  }

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
  const citationsByTheme = {
    Liberté: [
      {
        text: "L'homme est condamné à être libre",
        author: "Sartre",
        themes: ["Liberté", "Existence", "Responsabilité"],
        keywords: ["condamné", "libre", "existence", "choix"],
        explanation:
          "Sartre exprime ici que la liberté n'est pas un don mais une condition inévitable de l'existence humaine.",
      },
      {
        text: "La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui",
        author: "Déclaration des droits de l'homme",
        themes: ["Liberté", "Limite", "Autrui"],
        keywords: ["liberté", "pouvoir", "autrui", "limite"],
        explanation: "Cette définition juridique pose les limites sociales de la liberté individuelle.",
      },
    ],
    Vérité: [
      {
        text: "Je pense, donc je suis",
        author: "Descartes",
        themes: ["Vérité", "Certitude", "Existence"],
        keywords: ["pense", "suis", "certitude", "doute"],
        explanation: "Le cogito cartésien établit la première vérité indubitable de la philosophie moderne.",
      },
    ],
    Justice: [
      {
        text: "La justice est la première vertu des institutions sociales",
        author: "Rawls",
        themes: ["Justice", "Société", "Institution"],
        keywords: ["justice", "vertu", "institution", "sociale"],
        explanation: "Rawls place la justice au fondement de toute organisation sociale légitime.",
      },
    ],
  }

  const themeCitations = citationsByTheme[analysis.mainTheme] || citationsByTheme["Liberté"]
  const allThemes = Array.from(
    new Set([...analysis.keyConcepts, "Existence", "Société", "Nature", "Raison", "Expérience", "Morale"]),
  )

  return {
    citations: themeCitations.slice(0, 2),
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
