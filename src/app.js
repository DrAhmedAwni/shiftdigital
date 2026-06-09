import './css/base.css';
import './css/layout.css';
import './css/components.css';
import './css/states.css';

const services = [
  {
    title: 'Websites',
    description: 'Fast, credible marketing sites that make the offer clear and turn visits into conversations.',
    icon: 'browser',
  },
  {
    title: 'Web Apps',
    description: 'Custom product interfaces with clean architecture, smooth workflows, and practical state handling.',
    icon: 'grid',
  },
  {
    title: 'Mobile Apps',
    description: 'Responsive app experiences designed to feel natural on smaller screens and ship with confidence.',
    icon: 'phone',
  },
  {
    title: 'Systems Dashboards',
    description: 'Operational dashboards for teams that need clarity, speed, and dependable decision support.',
    icon: 'chart',
  },
];

const process = [
  {
    step: '01',
    title: 'Discover',
    description: 'We map goals, users, scope, and constraints before anything gets built.',
    icon: 'chat',
  },
  {
    step: '02',
    title: 'Build',
    description: 'I design the interface, ship the code, and keep the system tidy and maintainable.',
    icon: 'code',
  },
  {
    step: '03',
    title: 'Launch',
    description: 'We test, refine, deploy, and keep iterating after the first release.',
    icon: 'rocket',
  },
];

const projects = [
  {
    name: 'Nexora',
    type: 'Marketing website',
    description: 'A sharp launch site with a premium product story and clear conversion paths.',
  },
  {
    name: 'Pulse Finance',
    type: 'Mobile app',
    description: 'A compact financial experience with account overviews, activity, and alerts.',
  },
  {
    name: 'OpsCentral',
    type: 'Web application',
    description: 'An internal operations tool for monitoring workflows and resolving issues faster.',
  },
  {
    name: 'DataHub',
    type: 'Systems dashboard',
    description: 'A data-rich control panel built for scanning trends, exceptions, and priorities.',
  },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Email', href: 'mailto:hello@shiftdigital.dev' },
];

function icon(name) {
  const common = 'width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  const map = {
    arrow: `<svg ${common}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>`,
    browser: `<svg ${common}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18" /><path d="M7 6h.01" /><path d="M11 6h.01" /></svg>`,
    grid: `<svg ${common}><rect x="3" y="4" width="7" height="7" rx="1.2" /><rect x="14" y="4" width="7" height="7" rx="1.2" /><rect x="3" y="15" width="7" height="5" rx="1.2" /><rect x="14" y="15" width="7" height="5" rx="1.2" /></svg>`,
    phone: `<svg ${common}><rect x="7" y="2" width="10" height="20" rx="2.2" /><path d="M10 18h4" /></svg>`,
    chart: `<svg ${common}><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7 15l4-4 3 3 5-7" /><path d="M18 7h1v1" /></svg>`,
    chat: `<svg ${common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /><path d="M8 9h8" /><path d="M8 13h5" /></svg>`,
    code: `<svg ${common}><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="M14 5 10 19" /></svg>`,
    rocket: `<svg ${common}><path d="M14 4c2.5.2 4.8 2.5 5 5-1.8.4-3.2 1.4-4.4 2.6L10 16l-2-2 4.4-4.6C13.6 8 14.6 6.6 15 4.8" /><path d="M9 15l-2 2-2-2 2-2" /><path d="M8 16c-1.4 1.5-2.4 3.4-2.8 5.2 1.8-.4 3.7-1.4 5.2-2.8" /></svg>`,
  };

  return map[name] || '';
}

function createElement(tag, className, html) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html) el.innerHTML = html;
  return el;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mountApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = '';

  const shell = createElement('div', 'site-shell');

  const header = createElement('header', 'site-header');
  header.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="#home" aria-label="ShiftDigital home">
        <span class="brand-mark">${icon('code')}</span>
        <span class="brand-wordmark">Shift<span>Digital</span></span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#process">Process</a>
        <a href="#contact">Contact</a>
      </nav>
      <a class="btn btn-primary btn-compact" href="#contact">
        Get in touch
        <span class="btn-icon-wrap">${icon('arrow')}</span>
      </a>
    </div>
  `;
  shell.appendChild(header);

  const main = createElement('main');

  const hero = createElement('section', 'hero-section');
  hero.id = 'home';
  hero.innerHTML = `
    <div class="container hero-grid">
      <div class="hero-copy">
        <h1>ShiftDigital builds websites, apps, and dashboards that move businesses forward.</h1>
        <p class="hero-lead">I design and build fast, reliable digital products for companies that need a strong presence and a clean technical foundation.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#contact">Start a project <span class="btn-icon-wrap">${icon('arrow')}</span></a>
          <a class="btn btn-secondary" href="#work">View work</a>
        </div>
        <div class="hero-points" aria-label="Capabilities">
          <div>${icon('browser')} Full-stack development</div>
          <div>${icon('grid')} Clean architecture</div>
          <div>${icon('chart')} Performance focused</div>
          <div>${icon('rocket')} Built for growth</div>
        </div>
      </div>
      <div class="hero-visual" aria-label="Product preview montage">
        <div class="visual-browser visual-panel">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <div class="browser-top">
            <div class="browser-brand">NEXORA</div>
            <div class="browser-nav">
              <span>Products</span><span>Solutions</span><span>Pricing</span><span>About</span>
            </div>
            <button type="button">Request demo</button>
          </div>
          <div class="browser-body">
            <div>
              <h2>Simplify operations.<br />Drive results.</h2>
              <p>Premium web experiences that explain the offer, show the product, and convert attention into action.</p>
              <div class="browser-actions">
                <button type="button" class="mini-primary">Explore platform</button>
                <button type="button" class="mini-link">Learn more</button>
              </div>
            </div>
            <div class="browser-graphic">
              <div class="browser-graphic-core"></div>
            </div>
          </div>
        </div>

        <div class="visual-phone visual-panel">
          <div class="phone-notch"></div>
          <div class="phone-screen">
            <div class="phone-top">
              <span>9:11</span>
              <span>•••</span>
            </div>
            <div class="phone-copy">
              <p>Good morning, Alex</p>
              <strong>$24,680.50</strong>
              <span>Total balance</span>
            </div>
            <div class="phone-list">
              <div><span>Payment received</span><b>+ $2,480.00</b></div>
              <div><span>Subscription</span><b>- $49.00</b></div>
              <div><span>Invoice</span><b>- $2,390.00</b></div>
            </div>
            <div class="phone-nav">
              <span class="active"></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <div class="visual-dashboard visual-panel">
          <div class="dash-header">
            <span>Analytics Overview</span>
            <span class="dash-pill">This month</span>
          </div>
          <div class="dash-metrics">
            <div><small>Revenue</small><strong>$128,540</strong><span>+14.6%</span></div>
            <div><small>Users</small><strong>18,842</strong><span>+8.3%</span></div>
            <div><small>Conversions</small><strong>3.86%</strong><span>+12.7%</span></div>
            <div><small>Avg. order</small><strong>$86.35</strong><span>+5.7%</span></div>
          </div>
          <div class="dash-chart">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="dash-list">
            <div><span>Product A</span><i></i><b>$48,540</b></div>
            <div><span>Product B</span><i></i><b>$32,845</b></div>
            <div><span>Product C</span><i></i><b>$17,640</b></div>
            <div><span>Product D</span><i></i><b>$12,145</b></div>
          </div>
        </div>
      </div>
    </div>
  `;
  main.appendChild(hero);

  const servicesSection = createElement('section', 'section-band');
  servicesSection.id = 'services';
  servicesSection.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <h2>End-to-end solutions. Built to perform.</h2>
        <p>From brand sites to internal tools, I build systems that are clear, maintainable, and ready to ship.</p>
      </div>
      <div class="service-grid">
        ${services.map((service) => `
          <article class="service-card">
            <div class="service-icon">${icon(service.icon)}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <a href="#contact" class="text-link">Learn more ${icon('arrow')}</a>
          </article>
        `).join('')}
      </div>
    </div>
  `;
  main.appendChild(servicesSection);

  const processSection = createElement('section', 'section-band section-band-tight');
  processSection.id = 'process';
  processSection.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <h2>A clear process. Predictable results.</h2>
        <p>Simple, collaborative steps keep the work moving and the scope grounded.</p>
      </div>
      <div class="process-grid">
        ${process.map((item, index) => `
          <article class="process-step">
            <div class="process-index">${item.step}</div>
            <div class="process-icon">${icon(item.icon)}</div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            ${index < process.length - 1 ? '<div class="process-line" aria-hidden="true"></div>' : ''}
          </article>
        `).join('')}
      </div>
    </div>
  `;
  main.appendChild(processSection);

  const workSection = createElement('section', 'section-band');
  workSection.id = 'work';
  workSection.innerHTML = `
    <div class="container">
      <div class="section-heading section-heading-row">
        <div>
          <h2>Recent projects that deliver impact.</h2>
          <p>Selected builds and system concepts that show how I think about product, polish, and execution.</p>
        </div>
        <a class="text-link" href="#contact">View all work ${icon('arrow')}</a>
      </div>
      <div class="project-grid">
        ${projects.map((project, index) => `
          <article class="project-card">
            <div class="project-preview project-preview-${index + 1}">
              <div class="project-window">
                <div class="window-dots"><span></span><span></span><span></span></div>
                <div class="project-window-inner">
                  <div class="project-mini-title">${project.name}</div>
                  <div class="project-mini-chart"></div>
                </div>
              </div>
            </div>
            <div class="project-content">
              <h3>${project.name}</h3>
              <span>${project.type}</span>
              <p>${project.description}</p>
              <a href="#contact" class="text-link">View case study ${icon('arrow')}</a>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;
  main.appendChild(workSection);

  const contactSection = createElement('section', 'section-band section-contact');
  contactSection.id = 'contact';
  contactSection.innerHTML = `
    <div class="container contact-grid">
      <div class="contact-copy">
        <p class="section-kicker">Have a project in mind?</p>
        <h2>Let’s build something great together.</h2>
        <p>Tell me what you’re building and I’ll get back within one business day with a straightforward next step.</p>
        <div class="contact-details">
          <a href="mailto:hello@shiftdigital.dev">hello@shiftdigital.dev</a>
          <a href="tel:+14155550138">+1 (415) 555-0138</a>
          <span>San Francisco, CA</span>
        </div>
      </div>
      <form class="contact-form" id="contact-form">
        <div class="field-row">
          <label>
            <span>Your name</span>
            <input name="name" type="text" placeholder="Alex Morgan" required maxlength="80" />
          </label>
          <label>
            <span>Work email</span>
            <input name="email" type="email" placeholder="alex@company.com" required />
          </label>
        </div>
        <label>
          <span>Tell me about your project</span>
          <textarea name="brief" rows="5" placeholder="A new website, app, dashboard, or a full product build." required maxlength="1000"></textarea>
        </label>
        <div class="contact-actions">
          <button class="btn btn-primary" type="submit">Get in touch <span class="btn-icon-wrap">${icon('arrow')}</span></button>
          <p class="form-note">Prefer email? Use the address above and I’ll reply there.</p>
        </div>
      </form>
    </div>
  `;
  main.appendChild(contactSection);

  shell.appendChild(main);

  const footer = createElement('footer', 'site-footer');
  footer.innerHTML = `
    <div class="container footer-grid">
      <div>
        <a class="brand brand-footer" href="#home">
          <span class="brand-mark">${icon('code')}</span>
          <span class="brand-wordmark">Shift<span>Digital</span></span>
        </a>
        <p>Full-stack development for websites, apps, dashboards, and the systems behind them.</p>
      </div>
      <div>
        <h3>Services</h3>
        <a href="#services">Websites</a>
        <a href="#services">Web Apps</a>
        <a href="#services">Mobile Apps</a>
        <a href="#services">Systems Dashboards</a>
      </div>
      <div>
        <h3>Company</h3>
        <a href="#work">Work</a>
        <a href="#process">Process</a>
        <a href="#contact">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div>
        <h3>Get in touch</h3>
        ${socialLinks.map((link) => `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join('')}
      </div>
    </div>
    <div class="container footer-bottom">
      <span>ShiftDigital. All rights reserved.</span>
      <div>
        <a href="#home">Back to top</a>
      </div>
    </div>
  `;
  shell.appendChild(footer);

  app.appendChild(shell);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      if (document.getElementById(id)) {
        event.preventDefault();
        scrollToSection(id);
      }
    });
  });

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const brief = String(data.get('brief') || '').trim();

      if (!name || !email || !brief) {
        window.alert('Please fill out the contact form.');
        return;
      }

      const subject = encodeURIComponent(`Project inquiry from ${name}`);
      const body = encodeURIComponent(`${brief}\n\nReply to: ${email}`);
      window.location.href = `mailto:hello@shiftdigital.dev?subject=${subject}&body=${body}`;
    });
  }
}

document.addEventListener('DOMContentLoaded', mountApp);
