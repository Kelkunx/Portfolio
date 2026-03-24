import type { Profile } from '../../content-types';

export const profile: Profile = {
  name: 'Léo JEGO',
  age: 21,
  location: 'Guémené-sur-Scorff, France',
  phone: '07 55 64 82 01',
  email: 'leo.jego56@gmail.com',
  linkedin: 'https://www.linkedin.com/in/leo-jego',
  github: 'https://github.com/Kelkunx',
  title: 'Développeur full-stack',
  focus: 'Développeur full-stack',
  summary:
    "Je conçois et développe des interfaces et outils web clairs, robustes et utiles, avec une attention forte portée à l'expérience utilisateur, à la logique métier et à la qualité d'exécution. Mon parcours m'a amené à travailler sur des écrans métier, des API, des automatisations et des produits web mêlant enjeux techniques et besoins concrets.",
  shortBio:
    "Je conçois et livre des interfaces et outils web clairs, robustes et utiles, avec un vrai souci d'UX, de logique métier et de qualité.",
  contactPitch:
    "Je suis disponible pour échanger autour d'un poste full-stack / frontend / backend.",
  availability: 'Disponible pour un poste full-stack / frontend / backend',
  targetRoles: ['Développeur full-stack', 'Frontend React / Next.js', 'Développeur frontend junior'],
  proofPoints: [
    { label: 'Stack coeur', value: 'React / Next.js / NestJS' },
    { label: 'Expérience terrain', value: 'Outils métier, ATS, retail, IoT' },
    { label: 'Anglais', value: 'TOEIC 990 / 990' },
  ],
  valuePillars: [
    {
      title: 'Frontend',
      description:
        "Concevoir des interfaces métier lisibles, cohérentes et utiles, pensées pour l'usage réel plutôt que pour l'effet de démo.",
      proof:
        "Écrans React chez CGI, refontes UI et composants orientés productivité sur des workflows concrets.",
      tools: ['React', 'Next.js', 'TypeScript', 'MUI'],
    },
    {
      title: 'Backend & API',
      description:
        'Développer la logique métier, structurer des API propres et livrer des fonctionnalités end-to-end sans casser la maintenabilité.',
      proof:
        'Extensions API NestJS, gestion de droits, imports CSV, notifications et flux métier connectés au front.',
      tools: ['NestJS', 'Node.js', 'Express', 'PostgreSQL'],
    },
    {
      title: 'Qualité & delivery',
      description:
        'Travailler proprement, tester, documenter et livrer des fonctionnalités fiables dans un contexte équipe ou solo.',
      proof:
        'Tests unitaires, intégration et E2E chez CGI, revues de code, CI GitLab et documentation technique structurée.',
      tools: ['Tests unitaires', 'Intégration', 'E2E', 'GitLab CI'],
    },
    {
      title: 'Automatisation / IoT',
      description:
        'Relier des systèmes, automatiser des flux et transformer des contraintes techniques en outils exploitables.',
      proof:
        "ATS no-code et automatisations entre outils chez Job Staging, capteurs et collecte temps réel sur un projet IoT.",
      tools: ['Make', 'Zapier', 'Arduino', 'MQTT'],
    },
  ],
  primaryStack: ['React', 'Next.js', 'TypeScript', 'NestJS'],
  avatar: '/images/leo-jego.png',
  cvPdf: '/cv-leo-jego.pdf',
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'MUI', 'Tailwind'],
    },
    {
      category: 'Backend / API',
      items: ['Node.js', 'NestJS', 'Express', 'API REST'],
    },
    {
      category: 'Bases de données',
      items: ['PostgreSQL', 'SQL', 'TypeORM', 'Prisma'],
    },
    {
      category: 'Tests & Qualité',
      items: ['Tests unitaires', "Tests d'intégration", 'Tests E2E', 'SonarQube'],
    },
    {
      category: 'DevOps',
      items: ['Git', 'GitLab CI/CD', 'Docker'],
    },
    {
      category: 'IoT & Systèmes',
      items: ['Arduino', 'C / C++', 'Python', 'Raspberry Pi', 'MQTT'],
    },
    {
      category: 'Automatisation',
      items: ['Make', 'Zapier', 'Airtable'],
    },
    {
      category: 'Cybersécurité',
      items: [
        'Fondamentaux de la sécurité',
        'Sécurité réseau',
        'Réponse aux incidents',
        'SIEM & analyse de logs',
        'Gestion des risques',
      ],
    },
  ],
  languages: [
    { name: 'Anglais', level: 'C1' },
    { name: 'Espagnol', level: 'B1' },
  ],
  certifications: [
    {
      name: 'Google cybersecurity certificate',
      issuer: 'Google',
      score: '',
      date: 'Décembre 2025',
      note: 'Certification professionnelle en cybersécurité.',
      url: 'https://coursera.org/share/7d181a1cdac95be23f289c4269da00d1',
    },
    {
      name: 'TOEIC Listening and Reading',
      issuer: 'ETS',
      score: '990 / 990',
      date: 'Juin 2025',
      note: 'Score maximal attestant un anglais professionnel solide.',
      url: 'https://www.etsglobal.org/global/en/digital-score-report/E39C63A6BAE441B2E7635F14EC7F2CA115C30B3137866606E48681764C07D6FFNUU3UVVWdUpDcnpVVWREejhpR3VKMGRKWUhIMTljakFXVEtFMkRJQmR6Uy90QnZN',
    },
  ],
  experiences: [
    {
      company: 'Armor Vitrerie NETtoyage',
      role: 'Agent de nettoyage',
      start: 'Février 2026',
      end: 'Février 2026',
      location: 'Morbihan, France',
      summary: 'Expérience courte hors tech conservée pour la continuité du parcours.',
      featured: false,
      kind: 'other',
      bullets: [],
    },
    {
      company: 'Job Staging',
      role: 'Développeur',
      start: 'Novembre 2025',
      end: 'Décembre 2025',
      location: 'Vannes, France',
      summary:
        "Optimisation d'un ATS no-code, automatisations entre outils et amélioration de l'extranet client.",
      featured: true,
      kind: 'tech',
      bullets: [
        "Optimisation et structuration d'un ATS no-code (interne, client et partenaire) : création et amélioration des champs, statuts, filtres avancés et exports (CV / profils candidats).",
        "Développement de recherches avancées (CV, résumé, géographie, diplôme, école…) afin d'améliorer la qualification et le matching des candidatures.",
        "Mise en place et amélioration de flux automatisés entre les outils (KerIT ↔ ATS, Tactiq, HelloWork, Cal, HubSpot) incluant la récupération et l'exploitation des données candidats.",
        "Structuration du suivi budgétaire des offres d'emploi : devis (envoyés / signés), acomptes, soldes, statuts des missions et suivi par recruteur.",
        "Amélioration des interfaces Softr et de l'extranet client : affichage des offres, événements, pages panorama, barres de recherche, carousels et indicateurs clés.",
        'Création de documentations fonctionnelles et techniques (ATS, automatisations, partenaires, backups) pour garantir la pérennité et la transmissibilité des outils.',
        "Participation à la structuration de partenariats jobboards (HelloWork) : compréhension des flux XML, automatisation de la diffusion des annonces et récupération des candidatures dans l'ATS.",
      ],
    },
    {
      company: 'CGI',
      role: 'Développeur web full-stack',
      start: 'Septembre 2024',
      end: 'Août 2025',
      location: 'Larmor-Plage, France',
      summary:
        "Développement web full-stack sur CGI Retail Suite, avec création d'écrans métier, API et amélioration continue de la qualité logicielle.",
      featured: true,
      kind: 'tech',
      bullets: [
        "Développement web full-stack sur la plateforme CGI Retail Suite : création et évolution d'écrans métiers en React.js et développement / extension d'API en NestJS.",
        "Conception de fonctionnalités complètes : gestion des adresses e-mail dans les commandes, import de fichiers CSV (UI/UX, logique métier, affichage d'erreurs, notifications).",
        "Paramétrage avancé des écrans via la configuration d'affichage : ajout / suppression de champs, gestion des droits utilisateurs, optimisation des widgets et harmonisation des interfaces.",
        "Refonte et amélioration d'écrans existants : meilleure ergonomie, cohérence avec le design system, correction de bugs et performances améliorées.",
        'Contribution à la qualité logicielle : écriture de tests (unitaires, intégration, E2E), participation aux revues de code et respect des normes de qualité (GitLab CI, SonarQube).',
        "Travail à partir de spécifications techniques et fonctionnelles, échanges réguliers avec PO / analystes et démonstrations des fonctionnalités développées à l'équipe.",
      ],
    },
    {
      company: 'Armor Vitrerie NETtoyage',
      role: 'Agent de nettoyage',
      start: 'Juillet 2024',
      end: 'Août 2024',
      location: 'Morbihan, France',
      summary: 'Expérience courte hors tech conservée pour la continuité du parcours.',
      featured: false,
      kind: 'other',
      bullets: [],
    },
    {
      company: 'IoT-BZH',
      role: 'Développeur IoT',
      start: 'Mai 2023',
      end: 'Juin 2023',
      location: 'Lorient, France',
      summary:
        "Mise en place d'une solution de suivi énergétique avec collecte temps réel, visualisation web et intégration de capteurs.",
      featured: true,
      kind: 'tech',
      bullets: [
        "Stage de 7 semaines consistant à mettre en place une solution de surveillance de la consommation électrique de différents équipements au sein de l'entreprise.",
        "Mise en place d'une base de données de séries temporelles avec InfluxDB et automatisation de la collecte des mesures via Telegraf (SNMP, MQTT).",
        "Développement d'une interface web pour analyser en quasi temps réel la consommation (HTML, CSS, JavaScript, Chart.js, API PHP / Flux).",
        "Intégration du module ZLinky (Zigbee) et centralisation des données dans l'infrastructure domotique (Jeedom, Raspberry Pi, Mosquitto).",
        "Déploiement sur serveur interne (Nginx) et rédaction d'une documentation détaillée pour faciliter la maintenance et l'évolution de la solution.",
      ],
    },
  ],
  education: [
    {
      school: 'Faculté des Métiers, Lorient',
      degree: "Bachelor Concepteur de Systèmes d'Informations",
      start: 'Septembre 2024',
      end: 'Juillet 2025',
    },
    {
      school: 'Lycée St Joseph-La Salle, Lorient',
      degree: 'BTS SNIR (Systèmes Numériques Informatique & Réseaux)',
      start: '2022',
      end: '2024',
      notes: [
        'Programmation',
        'Maintenance systèmes & réseaux',
        'Electronique',
        'Option Cyberdéfense',
      ],
    },
    {
      school: 'Lycée Victor Hugo, Hennebont',
      degree: 'Baccalauréat (NSI / Mathématiques) — Mention Assez Bien',
      start: '2019',
      end: '2022',
    },
  ],
  interests: [
    'Lecture',
    'Programmation',
    'Musculation',
    'Veille technologique',
    'Animes & mangas',
    'Jeux vidéo',
  ],
};
