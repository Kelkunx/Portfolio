// lib/profile.ts
export const profile = {
  name: 'Léo JEGO',
  age: 20,
  location: 'Guémené-sur-Scorff, France',
  phone: '07 55 64 82 01',
  email: 'leo.jego56@gmail.com',
  linkedin: 'https://www.linkedin.com/in/leo-jego',
  title: 'Développeur Fullstack',
  summary:
    "Développeur motivé, spécialisé en web et IoT, avec une première expérience concrète sur un projet de refonte logicielle. Capable de m'adapter rapidement à de nouveaux environnements techniques ; je cherche aujourd'hui à rejoindre une équipe en CDI pour continuer à évoluer dans un cadre innovant.",
  avatar: '/images/leo-jego.jpg', // mettre l'image dans public/images/
  cvPdf: '/cv-leo-jego.pdf', // mettre le PDF dans public/

skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'MUI', 'Tailwind']
    },
    {
      category: 'Backend / API',
      items: ['Node.js', 'NestJS', 'API REST', 'Express', 'GraphQL']
    },
    {
      category: 'Bases de données',
      items: ['SQL', 'PostgreSQL', 'ORM (TypeORM/Prisma)']
    },
    {
      category: 'DevOps & Tests',
      items: ['Git & GitLab CI', 'Docker', 'Tests unitaires & E2E']
    },
    {
      category: 'Langages embarqués & Systèmes',
      items: ['C / C++', 'Python', 'Arduino/IoT']
    },
    {
      category: 'Autres',
      items: ['Symfony', 'Java / Spring', 'C# / .NET']
    },
  ],

  languages: [
    { name: 'Anglais', level: 'C1' },
    { name: 'Espagnol', level: 'B1' }
  ],

  certifications: [
    {
      name: 'TOEIC Listening and Reading',
      issuer: 'ETS',
      score: '990 / 990',
      date: 'Juin 2025',
      note: 'Score maximal - compétence avancée en anglais (C1).',
      url: 'https://www.etsglobal.org/global/en/digital-score-report/E39C63A6BAE441B2E7635F14EC7F2CA115C30B3137866606E48681764C07D6FFNUU3UVVWdUpDcnpVVWREejhpR3VKMGRKWUhIMTljakFXVEtFMkRJQmR6Uy90QnZN',
    },
  ],

  experiences: [
    {
      company: 'CGI',
      role: 'Développeur en alternance',
      start: 'Septembre 2024',
      end: 'Août 2025',
      location: 'Larmor-Plage, France',
      bullets: [
        'Développement web full-stack (ReactJS & NestJS).',
        "Projet de refonte logicielle utilisant des technologies modernes (React, Next/Nest, TypeScript).",
        "Implémentation de tests automatisés : tests unitaires, tests d'intégration et E2E.",
      ],
    },
    {
      company: 'Armor Vitrerie NETtoyage',
      role: 'Agent de nettoyage',
      start: 'Juillet 2024',
      end: 'Août 2024',
      location: 'Morbihan, France',
      bullets: [],
    },
    {
      company: 'IoT-BZH',
      role: 'Stagiaire (7 semaines)',
      start: 'Mai 2023',
      end: 'Juin 2023',
      location: 'BZH, France',
      bullets: [
        "Création d'une solution de surveillance de la consommation électrique d'équipements.",
        "Mise en place d'une base de données et automatisation de la collecte de données.",
        "Développement d'une interface d'analyse en temps réel.",
      ],
    },
  ],

  education: [
    {
      school: "Faculté des Métiers, Lorient",
      degree: "Bachelor Concepteur de Systèmes d'Informations",
      start: 'Septembre 2024',
      end: 'Juillet 2025',
    },
    {
      school: 'Lycée St Joseph-La Salle, Lorient',
      degree: 'BTS SNIR (Systèmes Numériques Informatique & Réseaux)',
      start: '2022',
      end: '2024',
      notes: ['Programmation', 'Maintenance systèmes & réseaux', 'Electronique', 'Option Cyberdéfense'],
    },
    {
      school: 'Lycée Victor Hugo, Hennebont',
      degree: 'Baccalauréat (NSI / Mathématiques) — Mention Assez Bien',
      start: '2019',
      end: '2022',
    },
  ],

  interests: ['Lecture', 'Programmation', 'Musculation', 'Veille technologique', 'Animes & mangas', 'Jeux vidéo'],
};
