export type ProofPoint = {
  label: string;
  value: string;
};

export type ValuePillar = {
  title: string;
  description: string;
  proof: string;
  tools: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type LanguageItem = {
  name: string;
  level: string;
};

export type CertificationItem = {
  name: string;
  issuer: string;
  score: string;
  date: string;
  note: string;
  url?: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end?: string;
  location: string;
  summary: string;
  bullets: string[];
  featured?: boolean;
  kind?: 'tech' | 'other';
};

export type EducationItem = {
  school: string;
  degree: string;
  start: string;
  end?: string;
  notes?: string[];
};

export type Profile = {
  name: string;
  age: number;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  title: string;
  focus: string;
  summary: string;
  shortBio: string;
  contactPitch: string;
  availability: string;
  targetRoles: string[];
  proofPoints: ProofPoint[];
  valuePillars: ValuePillar[];
  primaryStack: string[];
  avatar: string;
  cvPdf: string;
  skills: SkillGroup[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  interests: string[];
};

export type ProjectResult = {
  value: string;
  label: string;
};

export type ProjectScreen = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectLink = {
  label: string;
  url: string;
  type: 'demo' | 'repo' | 'contact';
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  short: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  tech: string[];
  date?: string;
  featured: boolean;
  status: string;
  role: string;
  context: string;
  problem: string;
  process: string[];
  solution: string[];
  deliverables: string[];
  results: ProjectResult[];
  screens: ProjectScreen[];
  links: ProjectLink[];
  demoUrl?: string;
  repoUrl?: string;
};
