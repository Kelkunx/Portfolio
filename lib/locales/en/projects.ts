import type { Project } from '../../content-types';

export const projects: Project[] = [
  {
    slug: 'edd-shopify',
    title: 'Estimated Delivery Date',
    tagline:
      'Shopify app designed to display reliable, readable and genuinely configurable delivery estimates for merchants.',
    short: 'Shopify delivery-date app with business logic and merchant-side configuration.',
    description:
      'Shopify product built to improve storefront transparency and give merchants granular control over delivery messaging.',
    imageSrc: '',
    imageAlt: 'Screenshot coming soon for Estimated Delivery Date',
    tech: ['Shopify CLI', 'React', 'TypeScript', 'Polaris', 'App Bridge'],
    date: '2026-03',
    featured: true,
    status: 'Product project',
    role: 'Product design, full-stack development, configuration UX and delivery logic.',
    context:
      'Many Shopify stores rely on generic shipping messages. The goal was to offer more credible delivery information while keeping the admin experience simple.',
    problem:
      'How do you display a delivery estimate that feels trustworthy for customers while accounting for business days, cutoff times, preparation delays and shipping ranges?',
    process: [
      'Defined delivery logic able to cover common business constraints without making the tool confusing.',
      'Designed a clear admin experience to configure rules, templates and display options.',
      'Worked on a maintainable architecture suitable for clean solo product development.',
    ],
    solution: [
      'Embedded Shopify Admin application to configure delivery rules and widget behaviour.',
      'Lightweight storefront Theme App Extension to render the estimate on product pages.',
      'Dynamic templates, styling options, compact mode and Free / Pro plan logic.',
    ],
    deliverables: [
      'Embedded Shopify app',
      'Storefront widget',
      'Template system',
      'Plan and options management',
    ],
    results: [
      {
        value: 'Business logic',
        label: 'Estimate calculated from business days, cutoff times and preparation delays.',
      },
      {
        value: 'Clear configuration',
        label: 'Widget and messaging remain customizable without making setup harder.',
      },
      {
        value: 'Maintainable architecture',
        label: 'Structured to support future product iteration as a solo build.',
      },
    ],
    screens: [],
    links: [{ label: 'Contact me about this project', url: '/contact', type: 'contact' }],
  },
  {
    slug: 'portfolio',
    title: 'Personal Portfolio',
    tagline:
      'Example of a developer portfolio structured as a clear showcase, with a dedicated CV page and more detailed project pages.',
    short: 'Developer portfolio designed as a project showcase, a CV page and a clear contact point.',
    description:
      'Portfolio case study built to present a profile, projects and contact details more clearly without overloading the reading experience.',
    imageSrc: '',
    imageAlt: 'Screenshot coming soon for the personal portfolio',
    tech: ['Next.js', 'React', 'TypeScript', 'MUI'],
    date: '2026-03',
    featured: true,
    status: 'Live',
    role: 'Art direction, UI design, frontend implementation and content structuring.',
    context:
      'Many personal portfolios either read like a static resume or lean too heavily on visual effects. The goal here is to provide a cleaner and more reusable base.',
    problem:
      'How do you structure a public portfolio so it stays credible, readable and easy to adapt, without relying on a highly personal story or an overdesigned visual direction?',
    process: [
      'Worked on a simpler architecture with a shorter homepage, a dedicated CV page and more complete project pages.',
      'Progressively simplified the visual hierarchy so useful content leads before visual effects.',
      'Structured the content so another developer profile could reuse the base without rewriting the whole editorial logic.',
    ],
    solution: [
      'Homepage refocused on profile, a few proof points, featured projects and contact.',
      'Dedicated CV page to move career depth away from the homepage.',
      'Reusable case-study structure with context, problem, role, process, solution and outcomes.',
    ],
    deliverables: [
      'Structured homepage',
      'Dedicated CV page',
      'Detailed project pages',
      'Simple contact page',
    ],
    results: [
      {
        value: 'Reusable structure',
        label: 'The base can be adapted to another portfolio without depending on a very personal context.',
      },
      {
        value: 'Clearer reading flow',
        label: 'Profile, project and career information are separated more cleanly.',
      },
      {
        value: 'Extensible base',
        label: 'The section system and case-study model can evolve without reworking the whole structure.',
      },
    ],
    screens: [],
    links: [
      { label: 'Visit the site', url: 'https://leo-jego.vercel.app', type: 'demo' },
      { label: 'View the code', url: 'https://github.com/Kelkunx/Portfolio', type: 'repo' },
      { label: 'Contact me', url: '/contact', type: 'contact' },
    ],
    demoUrl: 'https://leo-jego.vercel.app',
    repoUrl: 'https://github.com/Kelkunx/Portfolio',
  },
  {
    slug: 'dashboard-news-ai',
    title: 'News AI Dashboard',
    tagline:
      'Web application that aggregates news, filters it by category and keywords, then generates a short AI summary for each article.',
    short: 'Intelligent news feed with custom filters and AI-generated summaries.',
    description:
      'Personal project combining content aggregation, reading UI and automated summarisation to speed up information scanning.',
    imageSrc: '/images/capture-news.png',
    imageAlt: 'News AI Dashboard screenshot',
    tech: ['React', 'NestJS', 'Tailwind', 'HuggingFace'],
    date: '2025-08',
    featured: true,
    status: 'Live',
    role: 'Product design, frontend/backend development and AI integration.',
    context:
      'The idea was to make news reading faster by combining personalised filters with automatic article summaries.',
    problem:
      'How can you help users browse a large volume of content without forcing them to open and fully read each article first?',
    process: [
      'Designed browsing flows and filters to reduce information noise.',
      'Set up an architecture separating backend aggregation, summarisation logic and frontend display.',
      'Balanced information richness, reading speed and interface simplicity.',
    ],
    solution: [
      'React frontend for rapid browsing, filtering and article scanning.',
      'NestJS backend to aggregate sources and orchestrate AI-generated summaries.',
      'Compact information design combining summary, metadata and categorisation.',
    ],
    deliverables: ['React interface', 'NestJS API', 'Custom filters', 'AI summaries'],
    results: [
      {
        value: 'Faster reading',
        label: 'Each article is reduced to a short summary to get to the point quickly.',
      },
      {
        value: 'Useful filtering',
        label: 'Category and keyword filters help focus on relevant topics faster.',
      },
      {
        value: 'Clear architecture',
        label: 'Frontend and backend separation makes the product easier to evolve.',
      },
    ],
    screens: [
      {
        src: '/images/capture-news.png',
        alt: 'Real screenshot of the News AI Dashboard',
        caption: 'Dashboard screenshot showing article cards, filters and summary previews.',
      },
    ],
    links: [
      { label: 'Open demo', url: 'https://dashboard-news-ai.vercel.app', type: 'demo' },
      { label: 'View code', url: 'https://github.com/Kelkunx/dashboard-news-ai', type: 'repo' },
      { label: 'Contact me', url: '/contact', type: 'contact' },
    ],
    demoUrl: 'https://dashboard-news-ai.vercel.app',
    repoUrl: 'https://github.com/Kelkunx/dashboard-news-ai',
  },
  {
    slug: 'bts-baie-securisee',
    title: 'BTS Project — Secure Server Rack',
    tagline:
      'Academic project focused on designing a secure server rack with networking, access control, monitoring and environmental sensors.',
    short: 'Secure server rack project with networking, RADIUS, monitoring and sensors.',
    description:
      'Academic project mixing infrastructure, networking, security and hardware integration in a fictional company scenario.',
    imageSrc: '',
    imageAlt: 'Screenshot coming soon for the secure server rack project',
    tech: ['Active Directory', 'Cisco', 'RADIUS', 'Arduino'],
    date: '2024-06',
    featured: false,
    status: 'Academic project',
    role: 'Network configuration, RADIUS server setup, sensor integration and documentation.',
    context:
      'The project simulated the deployment of a secure infrastructure for a fictional company with networking services, NAS, cameras and environmental monitoring.',
    problem:
      'How do you propose a coherent architecture combining authentication, segmentation, physical monitoring and sensor data in a learning context?',
    process: [
      'Defined the technical architecture and allocated the different components within the rack.',
      'Configured the network, deployed services and connected monitoring equipment.',
      'Documented the technical choices and implementation steps.',
    ],
    solution: [
      'Set up a RADIUS server connected to a Cisco Wi-Fi access point.',
      'Added motion, temperature and humidity sensors with Arduino.',
      'Integrated the work into an architecture including Active Directory, NAS and camera monitoring.',
    ],
    deliverables: ['RADIUS server', 'Arduino sensors', 'Network architecture', 'Documentation'],
    results: [
      {
        value: 'Complete architecture',
        label: 'Project covering networking, authentication, storage, monitoring and environment sensing.',
      },
      {
        value: 'Cross-disciplinary view',
        label: 'Connected infrastructure, security and hardware concerns in one project.',
      },
      {
        value: 'Documented work',
        label: 'Choices and configuration were explicit enough to be presented and reused.',
      },
    ],
    screens: [],
    links: [{ label: 'Contact me about this project', url: '/contact', type: 'contact' }],
  },
];
