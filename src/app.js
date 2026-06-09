import './css/base.css';
import './css/layout.css';
import './css/components.css';
import './css/states.css';

const ASSETS = {
  logo: '/assets/shiftdigital-logo.png',
  hero: '/assets/shiftdigital-hero-innovation.png',
  transformation: '/assets/shiftdigital-transformation.png',
  mark: '/assets/shiftdigital-square-mark.png',
  portfolio: {
    getItDone: '/assets/portfolio/getitdone.png',
    amgFeature: '/assets/portfolio/amg-academy-feature.png',
    amgIcon: '/assets/portfolio/amg-academy-icon.png',
    demoLab1: '/assets/portfolio/demo-lab-1.png',
    demoLab2: '/assets/portfolio/demo-lab-2.png',
    demoLabLogo: '/assets/portfolio/demo-lab-logo.png',
  },
};

const CONTACT = {
  email: 'shift.digital.ai@gmail.com',
  phone: '+20 114 014 1320',
  whatsapp: '201140141320',
};

const whatsappLink = (message = 'Hi Dr. Ahmed Awni, I would like to discuss a project for my business.') => (
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
);

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    title: 'Website Development',
    description: 'Premium websites that explain your offer quickly, load fast, and convert more visitors into leads.',
    benefit: 'Sharper first impression',
    icon: 'globe',
  },
  {
    title: 'Landing Pages',
    description: 'High-converting campaign pages for startups, launches, offers, and paid ads.',
    benefit: 'More qualified leads',
    icon: 'window',
  },
  {
    title: 'Web App Development',
    description: 'Custom web applications that streamline workflows, reduce friction, and keep teams aligned.',
    benefit: 'Cleaner operations',
    icon: 'window',
  },
  {
    title: 'Mobile App Development',
    description: 'Mobile experiences built for touch, clarity, and reliable performance across devices.',
    benefit: 'Better everyday use',
    icon: 'phone',
  },
  {
    title: 'Dashboards & Systems',
    description: 'Operational dashboards and internal systems that make work easier to track and manage.',
    benefit: 'More control',
    icon: 'dashboard',
  },
  {
    title: 'n8n Automation',
    description: 'Automations that connect your website, app, forms, WhatsApp, and internal workflows.',
    benefit: 'Fewer manual steps',
    icon: 'bot',
  },
  {
    title: 'AI Tools',
    description: 'Practical AI features that save time, surface insights, and support smarter decisions.',
    benefit: 'Less manual work',
    icon: 'spark',
  },
];

const TRANSFORMATION = [
  'Manual processes',
  'Disconnected tools',
  'Slow response times',
  'Scattered data',
  'Clear dashboards',
  'Automated workflows',
  'Better customer experience',
  'Faster business growth',
];

const PROJECTS = [
  {
    title: 'GetItDone',
    category: 'Mobile Productivity App',
    problem: 'Needed a simple daily command center for tasks, appointments, due dates, and reminders.',
    solution: 'An Android-first app for planning the day, tracking overdue items, and receiving timely reminders.',
    result: 'A clearer workflow for users who want to stay organized and act on what matters today.',
    media: [ASSETS.portfolio.getItDone],
  },
  {
    title: 'AMG Academy',
    category: 'Dental Learning App',
    problem: 'Needed one place for courses, event registrations, tickets, certificates, and announcements.',
    solution: 'A professional learning and community app for dental professionals under Allam Medical Group.',
    result: 'A smoother experience for doctors, students, and academy members to stay connected.',
    media: [ASSETS.portfolio.amgFeature, ASSETS.portfolio.amgIcon],
  },
  {
    title: 'Demo Lab',
    category: 'White-label Dental Lab System',
    problem: 'Needed a way to submit dental cases, track production, manage technicians, inventory, finance, and reporting.',
    solution: 'A white-label lab platform that automates case intake, WhatsApp alerts, workflow tracking, and invoices.',
    result: 'Better visibility across the full case lifecycle from submission to delivery.',
    media: [ASSETS.portfolio.demoLab1, ASSETS.portfolio.demoLab2, ASSETS.portfolio.demoLabLogo],
  },
];

const PROCESS = [
  {
    step: '01',
    title: 'Discover',
    description: 'We define the business goal, users, and required outcomes before any design work starts.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Plan',
    description: 'We map content, structure, features, and the best path to conversion.',
    icon: 'map',
  },
  {
    step: '03',
    title: 'Design',
    description: 'The interface is shaped around clarity, trust, and a premium visual system.',
    icon: 'pen',
  },
  {
    step: '04',
    title: 'Build',
    description: 'The site or app is coded cleanly with reusable components and responsive behavior.',
    icon: 'code',
  },
  {
    step: '05',
    title: 'Automate',
    description: 'Workflows, forms, and handoffs are connected so the system does more of the heavy lifting.',
    icon: 'workflow',
  },
  {
    step: '06',
    title: 'Launch',
    description: 'We test, refine, publish, and improve the product based on real use.',
    icon: 'rocket',
  },
  {
    step: '07',
    title: 'Improve',
    description: 'After launch, we keep listening, refining, and adding the next useful layer.',
    icon: 'spark',
  },
];

const TRUST = [
  {
    title: 'Clear communication',
    text: 'You always know what is happening, what comes next, and what to approve.',
  },
  {
    title: 'Practical delivery',
    text: 'The work is shaped around real business value, not visual noise or unnecessary complexity.',
  },
  {
    title: 'Built for trust',
    text: 'The design and messaging make the brand feel credible from the first screen onward.',
  },
];

const FAQS = [
  {
    q: 'What does Shift Digital build?',
    a: 'Websites, landing pages, web apps, mobile apps, dashboards, AI tools, and automation flows that help businesses work better.',
  },
  {
    q: 'Can you help me decide what my business needs?',
    a: 'Yes. We can start with the problem, then choose the right mix of website, app, dashboard, or automation.',
  },
  {
    q: 'Do you work with clinics and small businesses?',
    a: 'Yes. We work with startups, small businesses, dental clinics, medical teams, creators, and service brands.',
  },
  {
    q: 'Can you connect forms to WhatsApp or n8n?',
    a: 'Yes. We can connect your website, app, or landing page to WhatsApp, email, CRM tools, and n8n workflows.',
  },
  {
    q: 'How long does a project take?',
    a: 'The timeline depends on scope, but we always define phases and keep the process predictable.',
  },
  {
    q: 'Do I need technical knowledge to start?',
    a: 'No. We guide the process in plain language and handle the technical decisions for you.',
  },
  {
    q: 'How do I start?',
    a: 'Use the contact form or WhatsApp button and tell us what you want to improve or build.',
  },
];

const CONTACT_OPTIONS = {
  businessTypes: ['Startup', 'Small business', 'Dental clinic', 'Medical practice', 'Creator', 'Other'],
  services: ['Landing Page', 'Website', 'Web App', 'Mobile App', 'Dashboard / System', 'Automation with n8n', 'AI Tool'],
  budgets: ['Under $2k', '$2k-$5k', '$5k-$10k', '$10k+', 'Not sure yet'],
};

function svgIcon(name) {
  const base = 'width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const icons = {
    arrow: `<svg ${base}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>`,
    menu: `<svg ${base}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>`,
    close: `<svg ${base}><path d="M6 6 18 18" /><path d="M18 6 6 18" /></svg>`,
    globe: `<svg ${base}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.7 4 5.8 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.8-4-9s1.5-6.3 4-9Z" /></svg>`,
    window: `<svg ${base}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18" /><path d="M7 6h.01" /><path d="M11 6h.01" /></svg>`,
    phone: `<svg ${base}><rect x="7" y="2" width="10" height="20" rx="2.2" /><path d="M10 18h4" /></svg>`,
    spark: `<svg ${base}><path d="m12 2 1.7 5.2L19 9l-5.3 1.8L12 16l-1.7-5.2L5 9l5.3-1.8L12 2Z" /><path d="M5 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" /></svg>`,
    bot: `<svg ${base}><rect x="6" y="8" width="12" height="10" rx="3" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><path d="M9 12h.01" /><path d="M15 12h.01" /></svg>`,
    dashboard: `<svg ${base}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 17V9" /><path d="M12 17V7" /><path d="M16 17v-5" /></svg>`,
    search: `<svg ${base}><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5" /></svg>`,
    map: `<svg ${base}><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" /><path d="M9 3v15" /><path d="M15 6v15" /></svg>`,
    pen: `<svg ${base}><path d="M12 20h9" /><path d="M16.5 3.5 20.5 7.5 8 20H4v-4Z" /></svg>`,
    code: `<svg ${base}><path d="m9 18-6-6 6-6" /><path d="m15 6 6 6-6 6" /><path d="m14 4-4 16" /></svg>`,
    workflow: `<svg ${base}><path d="M7 7h10v10H7z" /><path d="M7 12H3" /><path d="M21 12h-4" /><path d="M12 7V3" /><path d="M12 21v-4" /></svg>`,
    rocket: `<svg ${base}><path d="M14 4c2.5.2 4.8 2.5 5 5-1.8.4-3.2 1.4-4.4 2.6L10 16l-2-2 4.4-4.6C13.6 8 14.6 6.6 15 4.8" /><path d="M9 15l-2 2-2-2 2-2" /><path d="M8 16c-1.4 1.5-2.4 3.4-2.8 5.2 1.8-.4 3.7-1.4 5.2-2.8" /></svg>`,
    chat: `<svg ${base}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /><path d="M8 9h8" /><path d="M8 13h5" /></svg>`,
    shield: `<svg ${base}><path d="M12 3 20 6v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V6Z" /><path d="M9 12l2 2 4-4" /></svg>`,
    whatsapp: `<svg ${base}><path d="M20 11.6A8 8 0 0 1 8.3 19L4 20l1-4.1A8 8 0 1 1 20 11.6Z" /><path d="M9 9.5c.3-1 1-1.2 1.5-1 .4.2 1 1.3 1.1 1.4.2.2.2.4 0 .7l-.6.7c-.2.2-.2.4 0 .7.2.4 1 1.6 2.1 2.2.9.5 1.7.7 2.1.6.3 0 .5-.2.7-.4l.6-.6c.2-.2.5-.2.7 0l1.4.6c.3.1.5.4.4.7-.2 1.1-1 2-2.1 2.3-1.3.4-3.1.1-4.9-1-1.7-1.1-3.2-2.9-4-4.6-.9-2-.8-3.7-.3-4.9Z" /></svg>`,
    star: `<svg ${base}><path d="m12 2 2.9 6 6.6.9-4.8 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.8-4.6 6.6-.9L12 2Z" /></svg>`,
  };
  return icons[name] || icons.arrow;
}

function projectPreview(project, index) {
  if (!project.media || project.media.length === 0) {
    return `
      <div class="project-preview-fallback project-preview-fallback-${index}">
        <div class="fallback-grid"></div>
        <div class="fallback-chip">${svgIcon('spark')}</div>
      </div>
    `;
  }

  if (project.media.length === 1) {
    return `
      <div class="project-media project-media-one">
        <img src="${project.media[0]}" alt="${project.title} preview" loading="eager" />
      </div>
    `;
  }

  if (project.media.length === 2) {
    return `
      <div class="project-media project-media-two">
        <div class="project-media-main">
          <img src="${project.media[0]}" alt="${project.title} preview" loading="eager" />
        </div>
        <div class="project-media-side">
          <img src="${project.media[1]}" alt="${project.title} secondary view" loading="eager" />
        </div>
      </div>
    `;
  }

  return `
    <div class="project-media project-media-three">
      <div class="project-media-main">
        <img src="${project.media[0]}" alt="${project.title} preview" loading="eager" />
      </div>
      <div class="project-media-stack">
        <img src="${project.media[1]}" alt="${project.title} secondary view" loading="eager" />
        <img src="${project.media[2]}" alt="${project.title} brand view" loading="eager" />
      </div>
    </div>
  `;
}

function faqMarkup() {
  return FAQS.map((item) => `
    <details class="faq-item">
      <summary>${item.q}<span>${svgIcon('arrow')}</span></summary>
      <div class="faq-answer">${item.a}</div>
    </details>
  `).join('');
}

function servicesMarkup() {
  return SERVICES.map((service) => `
    <article class="service-card">
      <div class="service-icon">${svgIcon(service.icon)}</div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <div class="service-foot">
        <span>${service.benefit}</span>
        <a href="#contact">Learn more ${svgIcon('arrow')}</a>
      </div>
    </article>
  `).join('');
}

function projectsMarkup() {
  return PROJECTS.map((project, index) => `
    <article class="project-card">
      <div class="project-visual">${projectPreview(project, index + 1)}</div>
      <div class="project-copy">
        <div class="project-chip">${project.category}</div>
        <h3>${project.title}</h3>
        <p><strong>Problem:</strong> ${project.problem}</p>
        <p><strong>Solution:</strong> ${project.solution}</p>
        <p><strong>Result:</strong> ${project.result}</p>
        <a href="#contact" class="text-link">Build something similar ${svgIcon('arrow')}</a>
      </div>
    </article>
  `).join('');
}

function processMarkup() {
  return PROCESS.map((step) => `
    <article class="process-step">
      <div class="process-top">
        <span class="process-index">${step.step}</span>
        <span class="process-icon">${svgIcon(step.icon)}</span>
      </div>
      <h3>${step.title}</h3>
      <p>${step.description}</p>
    </article>
  `).join('');
}

function trustMarkup() {
  return TRUST.map((item) => `
    <article class="trust-card">
      <div class="trust-mark">${svgIcon('shield')}</div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');
}

function transformationMarkup() {
  return `
    <div class="transformation-grid">
      <div class="transformation-comparison">
        <div class="comparison-card comparison-before">
          <span>Before</span>
          <h3>Manual and scattered</h3>
          <ul>${TRANSFORMATION.slice(0, 4).map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="comparison-arrow">${svgIcon('arrow')}</div>
        <div class="comparison-card comparison-after">
          <span>After</span>
          <h3>Connected and clear</h3>
          <ul>${TRANSFORMATION.slice(4).map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="transformation-image">
        <img src="${ASSETS.transformation}" alt="Shift Digital digital transformation concept" loading="lazy" />
      </div>
    </div>
  `;
}

function contactOptionsMarkup(name, options) {
  return options.map((option) => `<option value="${option}">${option}</option>`).join('');
}

function mountApp() {
  const app = document.getElementById('app');
  if (!app) return;

  document.title = 'ShiftDigital | Websites, Apps, Automation & Lead Generation';

  app.innerHTML = `
    <div class="site-shell">
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="#home" aria-label="ShiftDigital home">
            <span class="brand-mark">
              <img src="${ASSETS.mark}" alt="" aria-hidden="true" />
            </span>
            <span class="brand-copy">
              <strong>ShiftDigital</strong>
              <span>Digital transformation. Real growth.</span>
            </span>
          </a>

          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
            <span class="sr-only">Toggle navigation</span>
            ${svgIcon('menu')}
          </button>

          <nav id="primary-nav" class="primary-nav" aria-label="Primary">
            ${NAV_ITEMS.map((item) => `<a href="${item.href}" data-nav-link>${item.label}</a>`).join('')}
            <a class="btn btn-primary btn-sm" href="#contact">Start Your Digital Shift ${svgIcon('arrow')}</a>
          </nav>
        </div>
      </header>

      <main>
        <section class="hero section-block" id="home">
          <div class="container hero-grid">
            <div class="hero-copy">
              <div class="hero-logo">
                <img src="${ASSETS.logo}" alt="Shift Digital logo" />
              </div>
              <h1>Build Faster. Transform Smarter. Grow Digitally.</h1>
              <p class="hero-lead">Shift Digital builds premium websites, landing pages, web apps, mobile apps, dashboards, and n8n automations for startups, small businesses, dental clinics, medical teams, photographers, makers, and other growth-focused brands.</p>
              <div class="hero-actions">
                <a class="btn btn-primary" href="#contact">Start Your Digital Shift ${svgIcon('arrow')}</a>
                <a class="btn btn-secondary" href="#projects">View Projects</a>
              </div>
              <div class="hero-points">
                <div>${svgIcon('window')} Websites and landing pages</div>
                <div>${svgIcon('phone')} Mobile apps</div>
                <div>${svgIcon('dashboard')} Dashboards and systems</div>
                <div>${svgIcon('bot')} n8n automation</div>
              </div>
              <div class="hero-strip">
                <span>Trusted digital partner for growth-minded businesses</span>
                <img src="${ASSETS.mark}" alt="" aria-hidden="true" />
              </div>
            </div>

            <div class="hero-visual">
              <figure class="hero-figure">
                <img src="${ASSETS.hero}" alt="Shift Digital website and app preview" loading="eager" />
              </figure>
              <div class="hero-metrics">
                <div>
                  <strong>Fast builds</strong>
                  <span>Clean, responsive delivery</span>
                </div>
                <div>
                  <strong>Better clarity</strong>
                  <span>Simple UX for non-technical users</span>
                </div>
                <div>
                  <strong>Real growth</strong>
                  <span>Websites, apps, and automation that support sales</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section-block section-alt" id="about">
          <div class="container split-grid">
            <div class="content-stack">
              <h2>About Shift Digital</h2>
              <p>Shift Digital is a full-stack development studio focused on premium websites, app interfaces, AI tools, and digital systems that help businesses feel more modern, organized, and trustworthy.</p>
              <p>The brand is built around a forward-moving digital shift: motion, clarity, speed, and practical growth.</p>
              <div class="mini-brand-card">
                <img src="${ASSETS.logo}" alt="Shift Digital logo" />
                <div>
                  <strong>Official brand direction</strong>
                  <span>Teal, blue, deep navy, and clean light surfaces.</span>
                </div>
              </div>
            </div>
            <div class="image-panel">
              <img src="${ASSETS.transformation}" alt="Shift Digital transformation graphic" loading="lazy" />
            </div>
          </div>
        </section>

        <section class="section-block" id="founder">
          <div class="container split-grid founder-grid">
            <div class="founder-card">
              <div class="founder-mark">
                <img src="${ASSETS.mark}" alt="" aria-hidden="true" />
              </div>
              <h2>About Dr. Ahmed Awni</h2>
              <p>Dr. Ahmed Awni brings a rare mix of healthcare experience, developer thinking, and practical digital transformation strategy. That combination is useful when the work needs both empathy and structure.</p>
              <p>He understands how to make technology feel clear for real people, especially for businesses that need trust, speed, and simplicity.</p>
            </div>
            <div class="trust-grid trust-grid-tight">
              <article class="trust-tag">${svgIcon('shield')} Web Development</article>
              <article class="trust-tag">${svgIcon('phone')} Mobile Apps</article>
              <article class="trust-tag">${svgIcon('spark')} AI Tools</article>
              <article class="trust-tag">${svgIcon('bot')} Automation</article>
              <article class="trust-tag">${svgIcon('dashboard')} Business Systems</article>
              <article class="trust-tag">${svgIcon('globe')} Healthcare + Digital Experience</article>
            </div>
          </div>
        </section>

        <section class="section-block section-alt" id="services">
          <div class="container">
            <div class="section-heading">
              <p class="section-kicker">Services</p>
              <h2>Everything needed to present and automate a modern digital business.</h2>
              <p>Each service is framed around business value, not technical jargon.</p>
            </div>
            <div class="service-grid">
              ${servicesMarkup()}
            </div>
          </div>
        </section>

        <section class="section-block" id="transformation">
          <div class="container split-grid transformation-section">
            <div class="content-stack">
              <p class="section-kicker">Digital transformation</p>
              <h2>Replace manual work with clearer digital systems.</h2>
              <p>Digital transformation is not just software. It means fewer errors, faster workflows, clearer tracking, and a better experience for customers and teams.</p>
              <div class="bullet-grid">
                <div>${svgIcon('arrow')} Faster execution</div>
                <div>${svgIcon('arrow')} Better customer experience</div>
                <div>${svgIcon('arrow')} More scalability</div>
                <div>${svgIcon('arrow')} Less repetitive work</div>
              </div>
              <a class="btn btn-secondary" href="#contact">Explore what to build next</a>
            </div>
            ${transformationMarkup()}
          </div>
        </section>

        <section class="section-block section-alt" id="projects">
          <div class="container">
            <div class="section-heading section-heading-row">
              <div>
              <p class="section-kicker">Projects</p>
                <h2>Portfolio examples that show the direction.</h2>
                <p>Each sample emphasizes clarity, trust, and polished execution.</p>
              </div>
              <a class="text-link" href="#contact">Build something similar ${svgIcon('arrow')}</a>
            </div>
            <div class="project-grid">
              ${projectsMarkup()}
            </div>
          </div>
        </section>

        <section class="section-block" id="process">
          <div class="container">
            <div class="section-heading">
              <p class="section-kicker">Process</p>
              <h2>A simple process that removes uncertainty.</h2>
              <p>Discover, plan, design, build, automate, launch, and improve.</p>
            </div>
            <div class="process-grid">
              ${processMarkup()}
            </div>
          </div>
        </section>

        <section class="section-block section-alt" id="trust">
          <div class="container">
            <div class="section-heading">
              <p class="section-kicker">Trust</p>
              <h2>Why clients trust the work.</h2>
              <p>These are trust statements rather than fake testimonials, so the site stays honest until real quotes are available.</p>
            </div>
            <div class="trust-cards">
              ${trustMarkup()}
            </div>
          </div>
        </section>

        <section class="section-block" id="faq">
          <div class="container split-grid faq-grid">
            <div class="content-stack">
              <p class="section-kicker">FAQ</p>
              <h2>Questions people usually ask first.</h2>
              <p>Simple answers reduce friction and make it easier to start a project.</p>
            </div>
            <div class="faq-list">
              ${faqMarkup()}
            </div>
          </div>
        </section>

        <section class="section-block section-alt" id="contact">
          <div class="container contact-grid">
            <div class="contact-copy">
              <p class="section-kicker">Contact</p>
              <h2>Start your digital shift.</h2>
              <p>Tell us what you want to improve or build, and we will respond with a practical next step.</p>
              <div class="contact-details">
                <a href="mailto:${CONTACT.email}">${svgIcon('chat')} ${CONTACT.email}</a>
                <a href="tel:${CONTACT.phone.replace(/\s+/g, '')}">${svgIcon('phone')} ${CONTACT.phone}</a>
                <a href="${whatsappLink()}" target="_blank" rel="noreferrer">${svgIcon('whatsapp')} WhatsApp</a>
              </div>
              <div class="contact-image">
                <img src="${ASSETS.logo}" alt="Shift Digital logo" />
              </div>
            </div>

            <form class="contact-form" id="lead-form" novalidate>
              <div class="form-grid">
                <label>
                  <span>Full name *</span>
                  <input name="name" type="text" placeholder="Ahmed Awni" required />
                </label>
                <label>
                  <span>Email *</span>
                  <input name="email" type="email" placeholder="hello@company.com" required />
                </label>
                <label>
                  <span>Phone / WhatsApp</span>
                  <input name="phone" type="tel" placeholder="+20 ..." />
                </label>
                <label>
                  <span>Business type</span>
                  <select name="businessType">
                    <option value="">Select business type</option>
                    ${contactOptionsMarkup('businessTypes', CONTACT_OPTIONS.businessTypes)}
                  </select>
                </label>
                <label>
                  <span>Service needed *</span>
                  <select name="service" required>
                    <option value="">Select a service</option>
                    ${contactOptionsMarkup('services', CONTACT_OPTIONS.services)}
                  </select>
                </label>
                <label>
                  <span>Budget range</span>
                  <select name="budget">
                    <option value="">Select a range</option>
                    ${contactOptionsMarkup('budgets', CONTACT_OPTIONS.budgets)}
                  </select>
                </label>
              </div>
              <label class="full-width">
                <span>Message *</span>
                <textarea name="message" rows="5" placeholder="Tell us about your project, goals, timeline, and what success looks like." required></textarea>
              </label>
              <div class="form-actions">
                <button class="btn btn-primary" type="submit">Send Project Request ${svgIcon('arrow')}</button>
                <a class="btn btn-secondary" href="${whatsappLink()}" target="_blank" rel="noreferrer">${svgIcon('whatsapp')} WhatsApp</a>
              </div>
              <p class="form-status" id="form-status" aria-live="polite"></p>
            </form>
          </div>
        </section>
      </main>

      <a class="whatsapp-float" href="${whatsappLink()}" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        ${svgIcon('whatsapp')}
      </a>

      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <img src="${ASSETS.logo}" alt="Shift Digital logo" />
            <p>Full-stack development for websites, apps, mobile experiences, AI tools, and digital systems.</p>
          </div>
          <div>
            <h3>Navigation</h3>
            ${NAV_ITEMS.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
          </div>
          <div>
            <h3>Services</h3>
            ${SERVICES.map((service) => `<a href="#services">${service.title}</a>`).join('')}
          </div>
          <div>
            <h3>Contact</h3>
            <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
            <a href="${whatsappLink()}" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="tel:${CONTACT.phone.replace(/\s+/g, '')}">${CONTACT.phone}</a>
          </div>
        </div>
        <div class="container footer-bottom">
          <span>ShiftDigital. All rights reserved.</span>
          <div class="footer-links">
            <a href="#home">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  `;

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen ? svgIcon('close') : svgIcon('menu');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = svgIcon('menu');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        document.querySelectorAll('[data-nav-link]').forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
  }

  const form = document.getElementById('lead-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const service = String(data.get('service') || '').trim();
      const message = String(data.get('message') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const businessType = String(data.get('businessType') || '').trim();
      const budget = String(data.get('budget') || '').trim();

      if (!name || !email || !service || !message) {
        status.textContent = 'Please fill in the required fields before sending the request.';
        status.className = 'form-status is-error';
        return;
      }

      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone / WhatsApp: ${phone}` : null,
        businessType ? `Business type: ${businessType}` : null,
        service ? `Service needed: ${service}` : null,
        budget ? `Budget: ${budget}` : null,
        '',
        message,
      ].filter(Boolean).join('\n');

      status.textContent = 'Preparing your message...';
      status.className = 'form-status is-success';
      const subject = encodeURIComponent(`Project inquiry from ${name}`);
      const mailto = `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
}

document.addEventListener('DOMContentLoaded', mountApp);
