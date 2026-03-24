import type { Profile } from '../../content-types';

export const profile: Profile = {
  name: 'Léo JEGO',
  age: 21,
  location: 'Guémené-sur-Scorff, France',
  phone: '+33 7 55 64 82 01',
  email: 'leo.jego56@gmail.com',
  linkedin: 'https://www.linkedin.com/in/leo-jego',
  github: 'https://github.com/Kelkunx',
  title: 'Full-stack developer',
  focus: 'Full-stack developer',
  summary:
    'I design and build clear, robust and useful web interfaces and tools, with strong attention to user experience, business logic and execution quality. My background led me to work on business UIs, APIs, automations and web products where technical depth has to meet real operational needs.',
  shortBio:
    'I design and ship clear, robust and useful web interfaces and tools, with a strong focus on UX, business logic and quality.',
  contactPitch:
    'I am available to discuss a full-stack / frontend / backend role.',
  availability: 'Available for a full-stack / frontend / backend role',
  targetRoles: ['Full-stack Developer', 'React / Next.js Frontend Developer', 'Junior Frontend Developer'],
  proofPoints: [
    { label: 'Core stack', value: 'React / Next.js / NestJS' },
    { label: 'Hands-on experience', value: 'Business tools, ATS, retail, IoT' },
    { label: 'English', value: 'TOEIC 990 / 990' },
  ],
  valuePillars: [
    {
      title: 'Frontend',
      description:
        'Design business-facing interfaces that are clear, coherent and genuinely useful in day-to-day workflows.',
      proof:
        'React screens at CGI, UI refactors and productivity-oriented components built for concrete internal products.',
      tools: ['React', 'Next.js', 'TypeScript', 'MUI'],
    },
    {
      title: 'Backend & API',
      description:
        'Build business logic, structure clean APIs and ship end-to-end features without sacrificing maintainability.',
      proof:
        'NestJS API extensions, permission handling, CSV imports, notifications and business workflows connected to the frontend.',
      tools: ['NestJS', 'Node.js', 'Express', 'PostgreSQL'],
    },
    {
      title: 'Quality & delivery',
      description:
        'Work cleanly, test what matters, document decisions and ship reliable features in both team and solo contexts.',
      proof:
        'Unit, integration and E2E tests at CGI, code reviews, GitLab CI and structured technical documentation.',
      tools: ['Unit tests', 'Integration', 'E2E', 'GitLab CI'],
    },
    {
      title: 'Automation / IoT',
      description:
        'Connect systems, automate repetitive flows and turn technical constraints into usable operational tools.',
      proof:
        'No-code ATS automations at Job Staging and real-time data collection on an IoT energy monitoring project.',
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
      items: ['Node.js', 'NestJS', 'Express', 'REST APIs'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'SQL', 'TypeORM', 'Prisma'],
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
    {
      category: 'Cybersecurity',
      items: [
        'Security fundamentals',
        'Network security',
        'Incident response',
        'SIEM & log analysis',
        'Risk management',
      ],
    },
  ],
  languages: [
    { name: 'English', level: 'C1' },
    { name: 'Spanish', level: 'B1' },
  ],
  certifications: [
    {
      name: 'Google cybersecurity certificate',
      issuer: 'Google',
      score: '',
      date: 'December 2025',
      note: 'Professional certification in cybersecurity.',
      url: 'https://coursera.org/share/7d181a1cdac95be23f289c4269da00d1',
    },
    {
      name: 'TOEIC Listening and Reading',
      issuer: 'ETS',
      score: '990 / 990',
      date: 'June 2025',
      note: 'Maximum score demonstrating strong professional English proficiency.',
      url: 'https://www.etsglobal.org/global/en/digital-score-report/E39C63A6BAE441B2E7635F14EC7F2CA115C30B3137866606E48681764C07D6FFNUU3UVVWdUpDcnpVVWREejhpR3VKMGRKWUhIMTljakFXVEtFMkRJQmR6Uy90QnZN',
    },
  ],
  experiences: [
    {
      company: 'Armor Vitrerie NETtoyage',
      role: 'Cleaning Operative',
      start: 'February 2026',
      end: 'February 2026',
      location: 'Morbihan, France',
      summary: 'Short non-tech experience kept only for timeline continuity.',
      featured: false,
      kind: 'other',
      bullets: [],
    },
    {
      company: 'Job Staging',
      role: 'Developer',
      start: 'November 2025',
      end: 'December 2025',
      location: 'Vannes, France',
      summary:
        'Optimised a no-code ATS, automated tool-to-tool workflows and improved the client extranet.',
      featured: true,
      kind: 'tech',
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
      role: 'Full-stack Web Developer',
      start: 'September 2024',
      end: 'August 2025',
      location: 'Larmor-Plage, France',
      summary:
        'Built full-stack business features on CGI Retail Suite, with React, NestJS and strong quality requirements.',
      featured: true,
      kind: 'tech',
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
      summary: 'Short non-tech experience kept only for timeline continuity.',
      featured: false,
      kind: 'other',
      bullets: [],
    },
    {
      company: 'IoT-BZH',
      role: 'IoT Developer',
      start: 'May 2023',
      end: 'June 2023',
      location: 'Lorient, France',
      summary:
        'Built an energy monitoring solution combining real-time data collection, web visualisation and sensor integration.',
      featured: true,
      kind: 'tech',
      bullets: [
        '7-week internship to build a solution to monitor the electrical consumption of various devices within the company.',
        'Set up a time-series database with InfluxDB and automated data collection using Telegraf (SNMP, MQTT).',
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
  interests: ['Reading', 'Coding', 'Weight training', 'Tech watch', 'Animes & mangas', 'Video games'],
};
