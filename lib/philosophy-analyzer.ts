import { philosophicalConcepts, randomSubjects } from "./philosophy-database"
import type { AnalysisResult, PhilosophicalConcept } from "./types"

export function analyzePhilosophicalSubject(subject: string): AnalysisResult {
  const normalizedSubject = subject.toLowerCase()

  // Détection des concepts clés basée sur les mots-clés étendus
  const detectedConcepts: PhilosophicalConcept[] = []

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

  const mainConcept = detectedConcepts[0]
  const keyConcepts = detectedConcepts.slice(0, 3).map((c) => c.name)

  // Génération de la problématique
  const problematic = generateProblematic(subject, mainConcept)

  // Génération du plan dialectique
  const dialecticalPlan = generateDialecticalPlan(subject, mainConcept)

  // Collecte des philosophes
  const philosophers = Array.from(new Set(detectedConcepts.flatMap((c) => c.relatedPhilosophers))).slice(0, 5)

  // Génération d'exemples
  const examples = generateExamples(mainConcept, subject)

  return {
    mainTheme: mainConcept.name,
    keyConcepts,
    problematic,
    dialecticalPlan,
    philosophers,
    examples,
  }
}

function generateProblematic(subject: string, concept: PhilosophicalConcept): string {
  const isQuestion = subject.includes("?")

  if (isQuestion) {
    return `Comment comprendre la tension entre ${concept.name.toLowerCase()} et les contraintes qui semblent la limiter ? Dans quelle mesure cette question révèle-t-elle les enjeux fondamentaux de l'existence humaine ?`
  }

  return `Dans quelle mesure peut-on affirmer que ${concept.name.toLowerCase()} constitue un enjeu fondamental de l'existence humaine ? Comment cette notion s'articule-t-elle avec les autres dimensions de la condition humaine ?`
}

function generateDialecticalPlan(subject: string, concept: PhilosophicalConcept): any[] {
  const conceptName = concept.name.toLowerCase()

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
    conscience: [
      {
        title: "I. La conscience semble transparente à elle-même",
        description: "La conscience paraît avoir un accès immédiat et certain à ses propres états.",
        keyArguments: [
          "Le cogito cartésien comme certitude première",
          "L'introspection comme méthode de connaissance de soi",
          "La conscience comme témoin privilégié de nos pensées",
        ],
      },
      {
        title: "II. Mais la conscience est limitée et peut se tromper",
        description: "La conscience n'a pas accès à tous ses contenus et peut être source d'illusions.",
        keyArguments: [
          "L'inconscient freudien révèle les limites de la conscience",
          "Les biais cognitifs et les illusions de la conscience",
          "La conscience comme construction sociale et culturelle",
        ],
      },
      {
        title: "III. La conscience est une conquête et une responsabilité",
        description: "La conscience véritable s'acquiert par l'effort et engage notre responsabilité.",
        keyArguments: [
          "La conscience morale comme guide de l'action",
          "L'éducation et la formation de la conscience",
          "La conscience comme condition de la liberté et de la responsabilité",
        ],
      },
    ],
    bonheur: [
      {
        title: "I. Le bonheur semble être le but naturel de l'existence",
        description: "Tous les hommes recherchent spontanément le bonheur et fuient la souffrance.",
        keyArguments: [
          "Le bonheur comme fin en soi selon Aristote",
          "La recherche universelle du plaisir et l'évitement de la douleur",
          "Le bonheur comme accomplissement de la nature humaine",
        ],
      },
      {
        title: "II. Pourtant, le bonheur peut être illusoire ou insuffisant",
        description: "La poursuite du bonheur peut nous égarer et ne pas constituer le véritable sens de l'existence.",
        keyArguments: [
          "La critique kantienne du bonheur comme principe moral",
          "L'hédonisme et ses limites : plaisirs vains et dépendance",
          "Le bonheur comme obstacle à la vérité et à la justice",
        ],
      },
      {
        title: "III. Le vrai bonheur réside dans la sagesse et la vertu",
        description: "Le bonheur authentique ne peut être séparé de la moralité et de la connaissance de soi.",
        keyArguments: [
          "La sagesse antique : bonheur et vertu sont indissociables",
          "L'ataraxie épicurienne : bonheur par la connaissance et la mesure",
          "Le bonheur comme harmonie entre désir et raison",
        ],
      },
    ],
    justice: [
      {
        title: "I. La justice semble n'être qu'un rapport de force",
        description: "Dans les faits, la justice paraît souvent déterminée par les plus puissants.",
        keyArguments: [
          "La loi du plus fort selon Thrasymaque",
          "La justice comme instrument de domination des classes dirigeantes",
          "Le relativisme des conceptions de la justice selon les époques",
        ],
      },
      {
        title: "II. Mais il existe des principes universels de justice",
        description: "Certains principes de justice semblent s'imposer à toute conscience morale.",
        keyArguments: [
          "Les droits naturels et universels de l'homme",
          "La justice comme vertu cardinale selon Platon",
          "L'égalité et l'équité comme fondements rationnels",
        ],
      },
      {
        title: "III. La justice est un idéal à construire collectivement",
        description: "La justice véritable résulte d'un effort constant de la société pour se perfectionner.",
        keyArguments: [
          "Le contrat social et la construction démocratique de la justice",
          "La justice comme processus d'amélioration continue",
          "L'éducation civique et la formation du sens de la justice",
        ],
      },
    ],
  }

  return plans[conceptName] || plans["liberté"]
}

function generateExamples(concept: PhilosophicalConcept, subject: string): string[] {
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
    Conscience: [
      "Le cogito ergo sum de Descartes",
      "L'analyse des rêves chez Freud",
      "La mauvaise foi sartrienne",
      "Les expériences de Benjamin Libet sur la conscience et la volonté",
      "La méditation et les pratiques contemplatives",
    ],
    Bonheur: [
      "Le paradoxe d'Épiménide sur le bonheur",
      "La société de consommation et le bonheur",
      "Les indices de bonheur national brut (Bhoutan)",
      "La méditation et les sagesses orientales",
      "Les réseaux sociaux et le bien-être",
    ],
    Justice: [
      "Le procès de Socrate",
      "La Déclaration des droits de l'homme",
      "L'affaire Dreyfus",
      "La justice restauratrice en Afrique du Sud",
      "Les inégalités sociales contemporaines",
    ],
    Morale: [
      "Le dilemme du tramway en éthique",
      "L'objection de conscience",
      "Les crimes contre l'humanité et la responsabilité morale",
      "L'éthique médicale et l'euthanasie",
      "La désobéissance civile de Thoreau et Gandhi",
    ],
    Travail: [
      "L'aliénation ouvrière dans les Temps modernes de Chaplin",
      "Le taylorisme et l'organisation scientifique du travail",
      "Le télétravail et la transformation du rapport au travail",
      "L'automatisation et l'avenir de l'emploi",
      "Les coopératives et l'économie sociale et solidaire",
    ],
    Technique: [
      "La révolution industrielle et ses conséquences",
      "L'intelligence artificielle et l'éthique",
      "Les réseaux sociaux et la transformation des relations humaines",
      "La médecine moderne et l'amélioration de l'humain",
      "L'écologie et la critique de la technique",
    ],
    Langage: [
      "L'enfant sauvage de l'Aveyron et l'acquisition du langage",
      "La tour de Babel et la diversité des langues",
      "La novlangue dans 1984 d'Orwell",
      "La traduction et l'intraduisible",
      "Les langages formels et l'informatique",
    ],
    Société: [
      "Le contrat social de Rousseau",
      "L'état de nature chez Hobbes",
      "La démocratie athénienne",
      "Les totalitarismes du XXe siècle",
      "Les mouvements sociaux et la transformation de la société",
    ],
    Religion: [
      "Le pari de Pascal",
      "La critique de la religion chez Marx",
      "Le dialogue interreligieux",
      "La laïcité française",
      "Les fondamentalismes religieux contemporains",
    ],
    Nature: [
      "L'état de nature chez Rousseau",
      "La révolution darwinienne",
      "L'écologie et la crise environnementale",
      "L'opposition nature/culture en anthropologie",
      "Les parcs naturels et la protection de l'environnement",
    ],
    Art: [
      "L'art pour l'art vs l'art engagé",
      "La querelle de l'art contemporain",
      "L'art numérique et les nouvelles technologies",
      "L'art thérapie et la fonction cathartique",
      "Le street art et la démocratisation de l'art",
    ],
    Temps: [
      "Les Confessions de saint Augustin sur le temps",
      "La madeleine de Proust et la mémoire involontaire",
      "L'angoisse du temps qui passe chez Heidegger",
      "Les voyages dans le temps en science-fiction",
      "La mesure du temps et les calendriers",
    ],
    Mort: [
      "La lettre à Ménécée d'Épicure",
      "L'être-pour-la-mort chez Heidegger",
      "Les rites funéraires dans différentes cultures",
      "L'euthanasie et le droit de mourir",
      "La peine de mort et son abolition",
    ],
    Culture: [
      "L'ethnocentrisme et le relativisme culturel",
      "L'école républicaine et la transmission culturelle",
      "La mondialisation et l'uniformisation culturelle",
      "Les politiques culturelles publiques",
      "L'exception culturelle française",
    ],
    Inconscient: [
      "L'interprétation des rêves chez Freud",
      "Les lapsus et les actes manqués",
      "La psychanalyse et la cure par la parole",
      "L'inconscient collectif de Jung",
      "Les biais cognitifs en psychologie",
    ],
    Existence: [
      "L'angoisse existentielle chez Kierkegaard",
      "L'absurde chez Camus",
      "L'authenticité chez Sartre",
      "La condition humaine selon Hannah Arendt",
      "L'existentialisme et l'engagement",
    ],
    Désir: [
      "Le mythe d'Aristophane dans le Banquet de Platon",
      "La concupiscence chez saint Augustin",
      "Le désir mimétique chez René Girard",
      "La société de consommation et la création de nouveaux désirs",
      "La sublimation freudienne",
    ],
    Science: [
      "La révolution galiléenne",
      "Les paradigmes scientifiques selon Kuhn",
      "L'éthique de la recherche scientifique",
      "Les sciences humaines et leur scientificité",
      "L'intelligence artificielle et les limites de la science",
    ],
  }

  return examplesByTheme[concept.name] || examplesByTheme["Liberté"]
}

export function generateRandomSubject(): string {
  return randomSubjects[Math.floor(Math.random() * randomSubjects.length)]
}
