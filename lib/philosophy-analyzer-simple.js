// Version simplifiée de l'analyseur philosophique pour l'API Next.js
const philosophicalConcepts = [
  {
    name: "Liberté",
    definition: "Capacité d'agir selon sa volonté, sans contrainte extérieure",
    examples: ["libre arbitre", "autonomie morale", "émancipation politique"],
    relatedPhilosophers: ["Sartre", "Kant", "Rousseau", "Spinoza"],
    keywords: ["libre", "liberté", "autonomie", "choix", "volonté", "contrainte"],
  },
  {
    name: "Vérité",
    definition: "Conformité de la pensée avec la réalité ou cohérence logique",
    examples: ["vérité scientifique", "vérité révélée", "relativisme"],
    relatedPhilosophers: ["Platon", "Descartes", "Nietzsche", "Popper"],
    keywords: ["vrai", "vérité", "réalité", "connaissance", "certitude", "doute"],
  },
  {
    name: "Justice",
    definition: "Principe moral fondé sur l'équité et le respect du droit",
    examples: ["justice distributive", "justice pénale", "égalité"],
    relatedPhilosophers: ["Aristote", "Rawls", "Platon", "Rousseau"],
    keywords: ["juste", "justice", "équité", "droit", "égalité", "loi"],
  },
  {
    name: "Bonheur",
    definition: "État de satisfaction complète et durable",
    examples: ["hédonisme", "eudémonisme", "ataraxie"],
    relatedPhilosophers: ["Aristote", "Épicure", "Mill", "Schopenhauer"],
    keywords: ["bonheur", "plaisir", "satisfaction", "bien-être", "joie"],
  },
  {
    name: "Conscience",
    definition: "Connaissance immédiate que l'esprit a de ses états et de ses actes",
    examples: ["conscience morale", "conscience de soi", "inconscient"],
    relatedPhilosophers: ["Descartes", "Freud", "Sartre", "Bergson"],
    keywords: ["conscience", "esprit", "pensée", "réflexion", "moral"],
  },
  {
    name: "Autrui",
    definition: "L'autre personne considérée dans sa différence et sa similitude",
    examples: ["reconnaissance", "altérité", "empathie"],
    relatedPhilosophers: ["Levinas", "Sartre", "Hegel", "Rousseau"],
    keywords: ["autrui", "autre", "relation", "reconnaissance", "empathie"],
  },
  {
    name: "Devoir",
    definition: "Obligation morale qui s'impose à la conscience",
    examples: ["impératif catégorique", "obligation", "responsabilité"],
    relatedPhilosophers: ["Kant", "Jonas", "Levinas", "Sartre"],
    keywords: ["devoir", "obligation", "moral", "responsabilité", "impératif"],
  },
  {
    name: "Temps",
    definition: "Dimension dans laquelle se succèdent les événements",
    examples: ["durée", "éternité", "temporalité"],
    relatedPhilosophers: ["Bergson", "Heidegger", "Augustin", "Kant"],
    keywords: ["temps", "durée", "temporel", "éternité", "instant"],
  },
  {
    name: "Art",
    definition: "Création d'œuvres à visée esthétique ou expressive",
    examples: ["beauté", "création", "esthétique"],
    relatedPhilosophers: ["Kant", "Hegel", "Benjamin", "Adorno"],
    keywords: ["art", "beauté", "esthétique", "création", "œuvre"],
  },
  {
    name: "Travail",
    definition: "Activité humaine de transformation de la nature",
    examples: ["aliénation", "technique", "production"],
    relatedPhilosophers: ["Marx", "Hegel", "Arendt", "Simmel"],
    keywords: ["travail", "technique", "production", "aliénation", "activité"],
  },
]

function detectConcepts(subject) {
  const normalizedSubject = subject.toLowerCase()
  const detectedConcepts = []

  for (const concept of philosophicalConcepts) {
    for (const keyword of concept.keywords) {
      if (normalizedSubject.includes(keyword.toLowerCase())) {
        detectedConcepts.push(concept)
        break
      }
    }
  }

  // Si aucun concept détecté, utiliser des concepts par défaut
  if (detectedConcepts.length === 0) {
    detectedConcepts.push(philosophicalConcepts[0]) // Liberté par défaut
  }

  return detectedConcepts
}

function generateProblematic(subject, mainConcept) {
  const isQuestion = subject.includes("?")

  if (isQuestion) {
    return `Comment comprendre la tension entre ${mainConcept.name.toLowerCase()} et les contraintes qui semblent la limiter ?`
  }

  return `Dans quelle mesure peut-on affirmer que ${mainConcept.name.toLowerCase()} constitue un enjeu fondamental de l'existence humaine ?`
}

function generateDialecticalPlan(subject, mainConcept) {
  const conceptName = mainConcept.name.toLowerCase()

  const plans = {
    liberté: [
      {
        title: "I. La liberté semble illusoire face au déterminisme",
        description: "L'homme paraît soumis à des déterminismes multiples qui remettent en question sa liberté.",
        keyArguments: [
          "Déterminisme physique et lois de la nature",
          "Conditionnements psychologiques et sociaux",
          "Illusion du libre arbitre selon Spinoza",
        ],
      },
      {
        title: "II. Pourtant, l'homme peut accéder à l'autonomie",
        description: "Malgré les contraintes, l'être humain dispose d'une capacité d'autodétermination.",
        keyArguments: [
          "L'autonomie morale selon Kant",
          "La liberté comme pouvoir de dire non (Alain)",
          "La conscience comme condition de la liberté",
        ],
      },
      {
        title: "III. La liberté est une conquête éthique et politique",
        description: "La liberté ne se donne pas, elle se construit dans l'action et l'engagement.",
        keyArguments: [
          "La liberté comme projet selon Sartre",
          "Émancipation collective et droits de l'homme",
          "Responsabilité et engagement authentique",
        ],
      },
    ],
    vérité: [
      {
        title: "I. La vérité semble relative et subjective",
        description: "Chaque époque et culture semble avoir sa propre conception de la vérité.",
        keyArguments: [
          "Relativisme culturel et historique",
          "Subjectivité de la perception",
          "Critique nietzschéenne de la vérité absolue",
        ],
      },
      {
        title: "II. Il existe des critères objectifs de vérité",
        description: "Certaines vérités semblent universelles et indépendantes des opinions.",
        keyArguments: [
          "Vérités mathématiques et logiques",
          "Méthode scientifique et vérification",
          "Évidence rationnelle selon Descartes",
        ],
      },
      {
        title: "III. La vérité est un idéal régulateur",
        description: "La vérité guide la recherche sans être définitivement atteinte.",
        keyArguments: [
          "Vérité comme horizon de la connaissance",
          "Falsifiabilité selon Popper",
          "Dialogue et confrontation des perspectives",
        ],
      },
    ],
  }

  return plans[conceptName] || plans["liberté"]
}

function generateExamples(mainConcept) {
  const examplesByTheme = {
    Liberté: [
      "Le mythe de la caverne de Platon (libération de l'ignorance)",
      "Nelson Mandela et la lutte contre l'apartheid",
      "Le dilemme de l'intelligence artificielle et du libre arbitre",
      "L'expérience de Milgram sur la soumission à l'autorité",
      "La résistance française pendant la Seconde Guerre mondiale",
    ],
    Vérité: [
      "L'allégorie de la caverne (Platon)",
      "La révolution copernicienne",
      "Les fake news à l'ère numérique",
      "L'affaire Galilée et l'Église",
      "Les théories du complot et la post-vérité",
    ],
    Justice: [
      "Le procès de Socrate",
      "La Déclaration des droits de l'homme",
      "L'affaire Dreyfus",
      "La justice restauratrice en Afrique du Sud",
      "Les inégalités sociales contemporaines",
    ],
    Bonheur: [
      "Le paradoxe d'Épiménide sur le bonheur",
      "La société de consommation et le bonheur",
      "Les indices de bonheur national brut (Bhoutan)",
      "La méditation et les sagesses orientales",
      "Les réseaux sociaux et le bien-être",
    ],
  }

  return examplesByTheme[mainConcept.name] || examplesByTheme["Liberté"]
}

export function analyzePhilosophicalSubject(subject) {
  // Simulation d'une analyse "intelligente"
  const detectedConcepts = detectConcepts(subject)
  const mainConcept = detectedConcepts[0]
  const keyConcepts = detectedConcepts.slice(0, 3).map((c) => c.name)

  // Génération de la problématique
  const problematic = generateProblematic(subject, mainConcept)

  // Génération du plan dialectique
  const dialecticalPlan = generateDialecticalPlan(subject, mainConcept)

  // Collecte des philosophes
  const philosophers = Array.from(new Set(detectedConcepts.flatMap((c) => c.relatedPhilosophers))).slice(0, 5)

  // Génération d'exemples
  const examples = generateExamples(mainConcept)

  // Simulation d'un score de confiance
  const confidence = 0.85 + Math.random() * 0.1 // Entre 85% et 95%

  return {
    mainTheme: mainConcept.name,
    keyConcepts,
    problematic,
    dialecticalPlan,
    philosophers,
    examples,
    confidence,
  }
}
