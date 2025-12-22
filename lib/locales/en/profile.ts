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
    'Motivated developer specializing in web and IoT, with hands-on experience in software redesign, full-stack development, and technical integrations. Curious and highly adaptable, I quickly learn new tools and environments. I am now looking to join a dynamic team where I can contribute to innovative projects while continuing to grow my skills.',
  avatar: '/images/leo-jego.png',
  cvPdf: '/cv-leo-jego.pdf',

  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'MUI', 'Tailwind'],
    },
    {
      category: 'Backend / API',
      items: ['Node.js', 'NestJS', 'Express', 'REST APIs'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'SQL', 'ORM (TypeORM / Prisma)'],
    },
    {
      category: 'Testing & Quality',
      items: ['Unit testing', 'Integration testing', 'E2E testing', 'SonarQube'],
    },
    {
      category: 'DevOps',
      items: ['Git', 'GitLab CI/CD', 'Docker'],
    },
    {
      category: 'IoT & Systems',
      items: ['Arduino', 'C / C++', 'Python', 'Raspberry Pi', 'MQTT'],
    },
    {
      category: 'Automation',
      items: ['Make', 'Zapier', 'Airtable'],
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
      company: 'Job Staging',
      role: 'No-code & Automation Developer (intern)',
      start: 'November 2025',
      end: 'December 2025',
      location: 'Remote, France',
      bullets: [
        'Optimised and structured a no-code ATS (internal, client and partner): created and improved fields, statuses, advanced filters and exports (CVs / candidate profiles).',
        'Built advanced search features (CV, summary, location, degree, school, etc.) to improve candidate qualification and matching.',
        'Set up and improved automated data flows between tools (KerIT ↔ ATS, Tactiq, HelloWork, Cal, HubSpot), including candidate data collection and processing.',
        'Structured budget tracking for job offers: quotes (sent / signed), deposits, balances, mission statuses and recruiter-level tracking.',
        'Improved Softr interfaces and the client extranet: job listings, events, overview pages, search bars, carousels and key indicators.',
        'Wrote functional and technical documentation (ATS, automations, partners, backups) to ensure long-term maintainability and handover.',
        'Contributed to structuring job board partnerships (HelloWork): understood XML flows, automated job posting and candidate retrieval into the ATS.',
      ],
    },
    {
      company: 'CGI',
      role: 'Full-stack Web Developer (apprenticeship)',
      start: 'September 2024',
      end: 'August 2025',
      location: 'Larmor-Plage, France',
      bullets: [
        'Full-stack development on CGI Retail Suite: business screens in React.js and API development/extensions in NestJS.',
        'Designed end-to-end features: email management on orders, CSV file import (UI/UX, business logic, error handling, notifications).',
        'Advanced UI configuration: display configuration, dynamic fields, user rights management, widget optimisation and interface consistency.',
        'Refactored and improved existing screens to enhance ergonomics, align with the design system and fix functional and visual bugs.',
        'Contributed to code quality: unit, integration and E2E tests, code reviews and adherence to quality standards (GitLab CI, SonarQube).',
        'Worked from functional and technical specifications, collaborated with POs/analysts and presented completed features in team demos.',
      ],
    },
    {
      company: 'Armor Vitrerie NETtoyage',
      role: 'Cleaning Operative',
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
        '7-week internship to build a solution to monitor the electrical consumption of various devices within the company.',
        'Set up a time series database with InfluxDB and automated data collection using Telegraf (SNMP, MQTT).',
        'Developed a web interface to analyse consumption almost in real time (HTML, CSS, JavaScript, Chart.js, PHP API / Flux queries).',
        'Integrated the ZLinky module (Zigbee) and centralised data in the home automation stack (Jeedom, Raspberry Pi, Mosquitto).',
        'Deployed the project on an internal server (Nginx) and wrote detailed documentation to ease maintenance and future evolution.',
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

  interests: [
    'Reading',
    'Coding',
    'Weight training',
    'Tech watch',
    'Animes & mangas',
    'Video games',
  ],
};
