export type Project = {
  slug: string
  title: string
  short: string
  stack: string[]
  demoUrl?: string
  repoUrl?: string
  images?: string[]
}

export const projects: Project[] = [
  {
    slug: 'mon-projet-1',
    title: 'App React + NestJS',
    short: 'Une app fullstack pour ...',
    stack: ['React', 'NestJS', 'Postgres'],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://gitlab.com/you/project1',
    images: ['/images/proj1-1.png', '/images/proj1-2.png']
  }
]
