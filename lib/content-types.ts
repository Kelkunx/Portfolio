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
  technologies?: string[];
  highlighted?: boolean;
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

export type ProjectHighlight = {
  value: string;
  label: string;
};

export type ProjectStatus = 'in-progress' | 'live' | 'completed';

export type ProjectCategory = 'open-source' | 'product' | 'personal' | 'academic';

export type ProjectPeriod = {
  start: string;
  end?: string;
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
  period: ProjectPeriod;
  status: ProjectStatus;
  category: ProjectCategory;
  role: string;
  context: string;
  problem: string;
  process: string[];
  solution: string[];
  deliverables: string[];
  highlights: ProjectHighlight[];
  screens: ProjectScreen[];
  links: ProjectLink[];
};
