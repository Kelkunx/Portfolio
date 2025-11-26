// lib/locales/en/profile.ts
export const profile = {
  name: 'Léo JEGO',
  age: 20,
  location: 'Guémené-sur-Scorff, France',
  phone: '+33 7 55 64 82 01',
  email: 'leo.jego56@gmail.com',
  linkedin: 'https://www.linkedin.com/in/leo-jego',
  title: 'Full-stack Developer',
  summary:
    "Motivated developer specialized in web and IoT, with first-hand experience on a software revamp project. I adapt quickly to new technical environments and I am looking for a permanent position to continue growing in an innovative team.",
  avatar: '/images/leo-jego.jpg',
  cvPdf: '/cv-leo-jego-en.pdf',

  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'MUI', 'Tailwind'],
    },
    {
      category: 'Backend / API',
      items: ['Node.js', 'NestJS', 'REST API', 'Express', 'GraphQL'],
    },
    {
      category: 'Databases',
      items: ['SQL', 'PostgreSQL', 'ORM (TypeORM/Prisma)'],
    },
    {
      category: 'DevOps & Testing',
      items: ['Git & GitLab CI', 'Docker', 'Unit & E2E Tests'],
    },
    {
      category: 'Embedded & Systems',
      items: ['C / C++', 'Python', 'Arduino/IoT'],
    },
    {
      category: 'Others',
      items: ['Symfony', 'Java / Spring', 'C# / .NET'],
    },
  ],

  languages: [
    { name: 'English', level: 'C1' },
    { name: 'Spanish', level: 'B1' },
  ],

  certifications: [
    {
      name: 'TOEIC Listening and Reading',
      issuer: 'ETS',
      score: '990 / 990',
      date: 'June 2025',
      note: 'Maximum score - advanced English proficiency (C1).',
      url: 'https://www.etsglobal.org/global/en/digital-score-report/E39C63A6BAE441B2E7635F14EC7F2CA115C30B3137866606E48681764C07D6FFNUU3UVVWdUpDcnpVVWREejhpR3VKMGRKWUhIMTljakFXVEtFMkRJQmR6Uy90QnZN',
    },
  ],

  experiences: [
    {
      company: 'CGI',
      role: 'Full-stack web developer',
      start: 'September 2024',
      end: 'August 2025',
      location: 'Larmor-Plage, France',
      bullets: [
        'Full-stack web development (ReactJS & NestJS).',
        'Software refactor project using modern technologies (React, Next/Nest, TypeScript).',
        'Implemented automated tests: unit, integration and E2E tests.',
      ],
    },
    {
      company: 'Armor Vitrerie NETtoyage',
      role: 'Cleaning staff',
      start: 'July 2024',
      end: 'August 2024',
      location: 'Morbihan, France',
      bullets: [],
    },
    {
      company: 'IoT-BZH',
      role: 'IoT Developer (internship)',
      start: 'May 2023',
      end: 'June 2023',
      location: 'Lorient, France',
      bullets: [
        'Built a solution to monitor electrical consumption of equipment.',
        'Set up a database and automated data collection.',
        'Developed a real-time analysis interface.',
      ],
    },
  ],

  education: [
    {
      school: 'Faculté des Métiers, Lorient',
      degree: 'Bachelor — Information Systems Designer',
      start: 'September 2024',
      end: 'July 2025',
    },
    {
      school: 'Lycée St Joseph-La Salle, Lorient',
      degree: 'BTS SNIR (Digital Systems, Networks & IT)',
      start: '2022',
      end: '2024',
      notes: ['Programming', 'Systems & network maintenance', 'Electronics', 'Cyberdefense option'],
    },
    {
      school: 'Lycée Victor Hugo, Hennebont',
      degree: 'Baccalaureate (Computer Science / Mathematics) — Honours',
      start: '2019',
      end: '2022',
    },
  ],

  interests: ['Reading', 'Coding', 'Weight training', 'Tech watch', 'Animes & mangas', 'Video games'],
};
