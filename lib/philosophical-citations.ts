export interface PhilosophicalCitation {
  text: string
  author: string
  theme: string
  context?: string
  explanation?: string
}

export const philosophicalCitations: PhilosophicalCitation[] = [
  // Liberté
  {
    text: "L'homme est condamné à être libre.",
    author: "Jean-Paul Sartre",
    theme: "Liberté",
    explanation:
      "Sartre exprime ici que la liberté n'est pas un don mais une condition inévitable de l'existence humaine. Nous sommes 'condamnés' car nous ne pouvons échapper à la responsabilité de nos choix.",
  },
  {
    text: "La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui.",
    author: "Déclaration des droits de l'homme, 1789",
    theme: "Liberté",
    explanation:
      "Cette définition juridique pose les limites sociales de la liberté individuelle. Elle établit que la liberté de chacun s'arrête là où commence celle d'autrui.",
  },
  {
    text: "La liberté de l'homme consiste à ne pouvoir obéir qu'à lui-même.",
    author: "Jean-Jacques Rousseau",
    theme: "Liberté",
    explanation:
      "Rousseau définit la liberté comme autonomie : être libre, c'est être son propre maître, ne dépendre que de sa propre volonté.",
  },

  // Vérité
  {
    text: "La vérité est dans l'expérience, non dans la tradition.",
    author: "Galilée",
    theme: "Vérité",
    explanation:
      "Galilée oppose la méthode expérimentale moderne à l'autorité des textes anciens. La vérité se découvre par l'observation et l'expérimentation.",
  },
  {
    text: "Le vrai est le tout.",
    author: "Georg Hegel",
    theme: "Vérité",
    explanation:
      "Pour Hegel, la vérité n'est pas dans les éléments isolés mais dans la totalité systématique. Seule la vision d'ensemble révèle la vérité.",
  },
  {
    text: "Il n'y a pas de faits, seulement des interprétations.",
    author: "Friedrich Nietzsche",
    theme: "Vérité",
    explanation:
      "Nietzsche remet en question l'objectivité des faits. Tout ce que nous prenons pour des faits est déjà une interprétation selon notre perspective.",
  },

  // Conscience
  {
    text: "Je pense, donc je suis.",
    author: "René Descartes",
    theme: "Conscience",
    explanation:
      "Le cogito cartésien établit la première vérité indubitable : l'existence de la pensée prouve l'existence du sujet pensant.",
  },
  {
    text: "La conscience est la lumière de l'intelligence pour distinguer le bien du mal.",
    author: "Confucius",
    theme: "Conscience",
    explanation:
      "Confucius présente la conscience comme une faculté morale qui guide nos jugements éthiques et nos actions.",
  },
  {
    text: "L'inconscient est le psychique lui-même et son essentielle réalité.",
    author: "Sigmund Freud",
    theme: "Conscience",
    explanation:
      "Freud révolutionne la conception de la conscience en montrant que l'inconscient constitue la part la plus importante de notre psychisme.",
  },

  // Bonheur
  {
    text: "Le plaisir est le commencement et la fin de la vie heureuse.",
    author: "Épicure",
    theme: "Bonheur",
    explanation:
      "Épicure fonde sa philosophie sur la recherche du plaisir, mais un plaisir raisonné qui évite la douleur et les troubles de l'âme.",
  },
  {
    text: "Le bonheur est une idée neuve en Europe.",
    author: "Saint-Just",
    theme: "Bonheur",
    explanation:
      "Saint-Just proclame que la Révolution française introduit une conception nouvelle : le bonheur comme droit politique et social.",
  },
  {
    text: "Il n'y a pas de bonheur sans courage, ni de vertu sans combat.",
    author: "Jean-Jacques Rousseau",
    theme: "Bonheur",
    explanation:
      "Rousseau lie le bonheur à l'effort moral. Le vrai bonheur ne peut être séparé de la vertu et demande du courage.",
  },

  // Justice
  {
    text: "La justice est la première vertu des institutions sociales.",
    author: "John Rawls",
    theme: "Justice",
    explanation:
      "Rawls place la justice au fondement de toute organisation sociale légitime. Sans justice, les institutions perdent leur légitimité.",
  },
  {
    text: "Rien n'est plus injuste que de traiter également des choses inégales.",
    author: "Aristote",
    theme: "Justice",
    explanation:
      "Aristote distingue l'égalité arithmétique de l'équité. La vraie justice consiste à traiter différemment ce qui est différent.",
  },
  {
    text: "Le droit est la volonté générale érigée en loi.",
    author: "Jean-Jacques Rousseau",
    theme: "Justice",
    explanation:
      "Rousseau fonde la légitimité du droit sur la volonté générale. Les lois justes expriment la volonté commune du peuple.",
  },

  // Devoir/Morale
  {
    text: "Agis seulement d'après la maxime grâce à laquelle tu peux vouloir qu'elle devienne une loi universelle.",
    author: "Emmanuel Kant",
    theme: "Morale",
    explanation:
      "L'impératif catégorique kantien : une action n'est morale que si elle peut être universalisée sans contradiction.",
  },
  {
    text: "Ce qui est légal n'est pas toujours moral.",
    author: "Martin Luther King",
    theme: "Morale",
    explanation:
      "King distingue la légalité de la moralité. Une loi peut être légale mais injuste, d'où la possibilité de la désobéissance civile.",
  },
  {
    text: "Le devoir est une nécessité d'agir par respect pour la loi.",
    author: "Emmanuel Kant",
    theme: "Morale",
    explanation:
      "Kant définit le devoir moral comme obéissance à la loi morale par respect, non par intérêt ou inclination.",
  },

  // Travail
  {
    text: "L'homme se fait par le travail.",
    author: "Karl Marx",
    theme: "Travail",
    explanation:
      "Marx voit dans le travail l'essence de l'homme : c'est par le travail que l'homme se réalise et transforme le monde.",
  },
  {
    text: "Le travail éloigne de nous trois grands maux : l'ennui, le vice et le besoin.",
    author: "Voltaire",
    theme: "Travail",
    explanation:
      "Voltaire présente le travail comme remède aux maux humains : il occupe l'esprit, moralise et assure la subsistance.",
  },
  {
    text: "Par le travail, l'homme transforme la nature et se transforme lui-même.",
    author: "Georg Hegel",
    theme: "Travail",
    explanation: "Hegel montre la double dimension du travail : transformation du monde extérieur et formation de soi.",
  },

  // Technique
  {
    text: "La technique est ce par quoi l'homme dépasse la nature.",
    author: "Gilbert Simondon",
    theme: "Technique",
    explanation:
      "Simondon voit dans la technique le moyen pour l'homme de transcender ses limites naturelles et de créer un monde artificiel.",
  },
  {
    text: "La science sans conscience n'est que ruine de l'âme.",
    author: "François Rabelais",
    theme: "Technique",
    explanation:
      "Rabelais met en garde contre une science purement technique, dépourvue de réflexion morale et de sagesse.",
  },
  {
    text: "La technique promet la maîtrise, mais elle engendre aussi la dépendance.",
    author: "Martin Heidegger",
    theme: "Technique",
    explanation:
      "Heidegger souligne l'ambiguïté de la technique : elle nous donne du pouvoir mais nous rend aussi dépendants d'elle.",
  },

  // Langage
  {
    text: "Le langage est la maison de l'être.",
    author: "Martin Heidegger",
    theme: "Langage",
    explanation:
      "Heidegger voit dans le langage le lieu où l'être se révèle. C'est par le langage que nous habitons le monde.",
  },
  {
    text: "Ce qui se conçoit bien s'énonce clairement.",
    author: "Nicolas Boileau",
    theme: "Langage",
    explanation:
      "Boileau établit un lien entre clarté de la pensée et clarté de l'expression. Bien penser, c'est bien parler.",
  },
  {
    text: "Parler, c'est agir.",
    author: "John Austin",
    theme: "Langage",
    explanation:
      "Austin révèle la dimension performative du langage : certains énoncés ne décrivent pas mais accomplissent des actions.",
  },

  // Société/État
  {
    text: "L'homme est un animal politique.",
    author: "Aristote",
    theme: "Société",
    explanation:
      "Aristote affirme que l'homme ne peut se réaliser pleinement qu'en société. La vie politique est naturelle à l'homme.",
  },
  {
    text: "L'État, c'est le plus froid des monstres froids.",
    author: "Friedrich Nietzsche",
    theme: "Société",
    explanation:
      "Nietzsche critique l'État moderne comme une machine bureaucratique qui déshumanise et écrase l'individu.",
  },
  {
    text: "L'obéissance à la loi qu'on s'est prescrite est liberté.",
    author: "Jean-Jacques Rousseau",
    theme: "Société",
    explanation:
      "Rousseau résout le paradoxe de la liberté en société : obéir aux lois qu'on s'est données collectivement, c'est rester libre.",
  },

  // Religion
  {
    text: "La foi commence là où la raison s'arrête.",
    author: "Blaise Pascal",
    theme: "Religion",
    explanation:
      "Pascal distingue les domaines de la raison et de la foi. La foi religieuse dépasse les limites de la connaissance rationnelle.",
  },
  {
    text: "Dieu est mort.",
    author: "Friedrich Nietzsche",
    theme: "Religion",
    explanation:
      "Nietzsche annonce la fin de la croyance en Dieu dans la modernité et ses conséquences pour les valeurs morales.",
  },
  {
    text: "La religion est l'opium du peuple.",
    author: "Karl Marx",
    theme: "Religion",
    explanation:
      "Marx critique la religion comme illusion qui endort la conscience révolutionnaire et maintient l'oppression sociale.",
  },

  // Nature
  {
    text: "L'homme est un loup pour l'homme.",
    author: "Thomas Hobbes",
    theme: "Nature",
    explanation:
      "Hobbes décrit l'état de nature comme guerre de tous contre tous, justifiant la nécessité d'un pouvoir politique fort.",
  },
  {
    text: "L'homme est naturellement bon, c'est la société qui le corrompt.",
    author: "Jean-Jacques Rousseau",
    theme: "Nature",
    explanation:
      "Rousseau s'oppose à Hobbes : l'homme naît bon, c'est la civilisation qui introduit le mal et l'inégalité.",
  },
  {
    text: "La nature ne fait rien en vain.",
    author: "Aristote",
    theme: "Nature",
    explanation: "Aristote affirme la finalité de la nature : tout dans la nature a une fonction et une raison d'être.",
  },

  // Art
  {
    text: "L'art est ce qui rend la vie plus belle que l'art.",
    author: "Friedrich Nietzsche",
    theme: "Art",
    explanation: "Nietzsche voit dans l'art une transfiguration de l'existence qui donne un sens esthétique à la vie.",
  },
  {
    text: "L'art est une illusion qui dit la vérité.",
    author: "Pablo Picasso",
    theme: "Art",
    explanation:
      "Picasso exprime le paradoxe de l'art : par la fiction et l'illusion, il révèle des vérités sur la condition humaine.",
  },
  {
    text: "L'art est une imitation de la nature.",
    author: "Aristote",
    theme: "Art",
    explanation:
      "Aristote définit l'art comme mimesis : l'art imite la nature, mais cette imitation peut révéler l'essence des choses.",
  },

  // Temps
  {
    text: "Qu'est-ce donc que le temps ? Si personne ne me le demande, je le sais.",
    author: "Saint Augustin",
    theme: "Temps",
    explanation:
      "Saint Augustin exprime le paradoxe du temps : nous en avons une expérience intime mais il échappe à la définition rationnelle.",
  },
  {
    text: "La durée est l'essence de la conscience.",
    author: "Henri Bergson",
    theme: "Temps",
    explanation:
      "Bergson distingue le temps vécu (durée) du temps mesuré. La conscience est essentiellement temporelle.",
  },
  {
    text: "Le temps change tout, sauf notre mémoire.",
    author: "Tennessee Williams",
    theme: "Temps",
    explanation:
      "Williams souligne le pouvoir de la mémoire à préserver le passé contre l'écoulement destructeur du temps.",
  },

  // Mort
  {
    text: "La mort n'est rien pour nous.",
    author: "Épicure",
    theme: "Mort",
    explanation:
      "Épicure enseigne à ne pas craindre la mort : tant que nous existons, elle n'est pas là ; quand elle arrive, nous n'existons plus.",
  },
  {
    text: "Être, c'est être-pour-la-mort.",
    author: "Martin Heidegger",
    theme: "Mort",
    explanation:
      "Heidegger fait de la conscience de la mort la structure fondamentale de l'existence humaine authentique.",
  },
  {
    text: "On ne meurt qu'une fois, et c'est pour si longtemps.",
    author: "Molière",
    theme: "Mort",
    explanation: "Molière exprime avec humour l'irréversibilité de la mort et l'angoisse qu'elle suscite.",
  },
]

export function getCitationsByTheme(theme: string): PhilosophicalCitation[] {
  return philosophicalCitations.filter((citation) => citation.theme.toLowerCase() === theme.toLowerCase())
}

export function getRandomCitation(theme?: string): PhilosophicalCitation {
  const citations = theme ? getCitationsByTheme(theme) : philosophicalCitations
  return citations[Math.floor(Math.random() * citations.length)]
}

export function getAllThemes(): string[] {
  return Array.from(new Set(philosophicalCitations.map((c) => c.theme)))
}

export function searchCitations(query: string): PhilosophicalCitation[] {
  const queryLower = query.toLowerCase()
  return philosophicalCitations.filter(
    (citation) =>
      citation.text.toLowerCase().includes(queryLower) ||
      citation.author.toLowerCase().includes(queryLower) ||
      citation.theme.toLowerCase().includes(queryLower),
  )
}
