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

const LEAD_WEBHOOK_URL = 'https://n8n.bdigital-dental.site/webhook/shift-digital-request';

const CONTENT = {
  en: {
    title: 'ShiftDigital | Websites, Apps, Automation & Lead Generation',
    nav: [
      { label: 'Home', href: '#home' },
      { label: 'Services', href: '#services' },
      { label: 'Projects', href: '#projects' },
      { label: 'Process', href: '#process' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
    brandSubtitle: 'Digital transformation. Real growth.',
    headerCta: 'Start Your Digital Shift',
    themeTitle: 'Toggle dark mode',
    languageTitle: 'Switch to Arabic',
    hero: {
      title: 'Build Faster. Transform Smarter. Grow Digitally.',
      lead: 'Shift Digital builds premium websites, landing pages, web apps, mobile apps, dashboards, and n8n automations for startups, small businesses, dental clinics, medical teams, photographers, makers, and other growth-focused brands.',
      cta: 'Start Your Digital Shift',
      projects: 'View Projects',
      points: ['Websites and landing pages', 'Mobile apps', 'Dashboards and systems', 'n8n automation'],
      strip: 'Trusted digital partner for growth-minded businesses',
      metrics: [
        { title: 'Fast builds', text: 'Clean, responsive delivery' },
        { title: 'Better clarity', text: 'Simple UX for non-technical users' },
        { title: 'Real growth', text: 'Websites, apps, and automation that support sales' },
      ],
    },
    about: {
      title: 'About Shift Digital',
      paragraphs: [
        'Shift Digital is a full-stack development studio focused on premium websites, app interfaces, AI tools, and digital systems that help businesses feel more modern, organized, and trustworthy.',
        'The brand is built around a forward-moving digital shift: motion, clarity, speed, and practical growth.',
      ],
      directionTitle: 'Official brand direction',
      directionText: 'Teal, blue, deep navy, and clean light surfaces.',
    },
    founder: {
      title: 'About Dr. Ahmed Awni',
      paragraphs: [
        'Dr. Ahmed Awni brings a rare mix of healthcare experience, developer thinking, and practical digital transformation strategy. That combination is useful when the work needs both empathy and structure.',
        'He understands how to make technology feel clear for real people, especially for businesses that need trust, speed, and simplicity.',
      ],
      tags: ['Web Development', 'Mobile Apps', 'AI Tools', 'Automation', 'Business Systems', 'Healthcare + Digital Experience'],
    },
    servicesSection: {
      kicker: 'Services',
      title: 'Everything needed to present and automate a modern digital business.',
      lead: 'Each service is framed around business value, not technical jargon.',
    },
    services: [
      { title: 'Website Development', description: 'Premium websites that explain your offer quickly, load fast, and convert more visitors into leads.', benefit: 'Sharper first impression', icon: 'globe' },
      { title: 'Landing Pages', description: 'High-converting campaign pages for startups, launches, offers, and paid ads.', benefit: 'More qualified leads', icon: 'window' },
      { title: 'Web App Development', description: 'Custom web applications that streamline workflows, reduce friction, and keep teams aligned.', benefit: 'Cleaner operations', icon: 'window' },
      { title: 'Mobile App Development', description: 'Mobile experiences built for touch, clarity, and reliable performance across devices.', benefit: 'Better everyday use', icon: 'phone' },
      { title: 'Dashboards & Systems', description: 'Operational dashboards and internal systems that make work easier to track and manage.', benefit: 'More control', icon: 'dashboard' },
      { title: 'n8n Automation', description: 'Automations that connect your website, app, forms, WhatsApp, and internal workflows.', benefit: 'Fewer manual steps', icon: 'bot' },
      { title: 'AI Tools', description: 'Practical AI features that save time, surface insights, and support smarter decisions.', benefit: 'Less manual work', icon: 'spark' },
    ],
    transformation: {
      kicker: 'Digital transformation',
      title: 'Replace manual work with clearer digital systems.',
      lead: 'Digital transformation is not just software. It means fewer errors, faster workflows, clearer tracking, and a better experience for customers and teams.',
      bullets: ['Faster execution', 'Better customer experience', 'More scalability', 'Less repetitive work'],
      beforeTitle: 'Manual and scattered',
      afterTitle: 'Connected and clear',
      beforeLabel: 'Before',
      afterLabel: 'After',
      beforeItems: ['Manual processes', 'Disconnected tools', 'Slow response times', 'Scattered data'],
      afterItems: ['Clear dashboards', 'Automated workflows', 'Better customer experience', 'Faster business growth'],
      cta: 'Explore what to build next',
      imageAlt: 'Shift Digital digital transformation concept',
    },
    projectsSection: {
      kicker: 'Projects',
      title: 'Portfolio examples that show the direction.',
      lead: 'Each sample emphasizes clarity, trust, and polished execution.',
      cta: 'Build something similar',
    },
    projects: [
      { title: 'GetItDone', category: 'Mobile Productivity App', problem: 'Needed a simple daily command center for tasks, appointments, due dates, and reminders.', solution: 'An Android-first app for planning the day, tracking overdue items, and receiving timely reminders.', result: 'A clearer workflow for users who want to stay organized and act on what matters today.', media: [ASSETS.portfolio.getItDone] },
      { title: 'AMG Academy', category: 'Dental Learning App', problem: 'Needed one place for courses, event registrations, tickets, certificates, and announcements.', solution: 'A professional learning and community app for dental professionals under Allam Medical Group.', result: 'A smoother experience for doctors, students, and academy members to stay connected.', media: [ASSETS.portfolio.amgFeature, ASSETS.portfolio.amgIcon] },
      { title: 'Demo Lab', category: 'White-label Dental Lab System', problem: 'Needed a way to submit dental cases, track production, manage technicians, inventory, finance, and reporting.', solution: 'A white-label lab platform that automates case intake, WhatsApp alerts, workflow tracking, and invoices.', result: 'Better visibility across the full case lifecycle from submission to delivery.', media: [ASSETS.portfolio.demoLab1, ASSETS.portfolio.demoLab2, ASSETS.portfolio.demoLabLogo] },
    ],
    processSection: {
      kicker: 'Process',
      title: 'A simple process that removes uncertainty.',
      lead: 'Discover, plan, design, build, automate, launch, and improve.',
    },
    process: [
      { step: '01', title: 'Discover', description: 'We define the business goal, users, and required outcomes before any design work starts.', icon: 'search' },
      { step: '02', title: 'Plan', description: 'We map content, structure, features, and the best path to conversion.', icon: 'map' },
      { step: '03', title: 'Design', description: 'The interface is shaped around clarity, trust, and a premium visual system.', icon: 'pen' },
      { step: '04', title: 'Build', description: 'The site or app is coded cleanly with reusable components and responsive behavior.', icon: 'code' },
      { step: '05', title: 'Automate', description: 'Workflows, forms, and handoffs are connected so the system does more of the heavy lifting.', icon: 'workflow' },
      { step: '06', title: 'Launch', description: 'We test, refine, publish, and improve the product based on real use.', icon: 'rocket' },
      { step: '07', title: 'Improve', description: 'After launch, we keep listening, refining, and adding the next useful layer.', icon: 'spark' },
    ],
    trustSection: {
      kicker: 'Trust',
      title: 'Why clients trust the work.',
      lead: 'These are trust statements rather than fake testimonials, so the site stays honest until real quotes are available.',
    },
    trust: [
      { title: 'Clear communication', text: 'You always know what is happening, what comes next, and what to approve.' },
      { title: 'Practical delivery', text: 'The work is shaped around real business value, not visual noise or unnecessary complexity.' },
      { title: 'Built for trust', text: 'The design and messaging make the brand feel credible from the first screen onward.' },
    ],
    faqSection: {
      kicker: 'FAQ',
      title: 'Questions people usually ask first.',
      lead: 'Simple answers reduce friction and make it easier to start a project.',
    },
    faqs: [
      { q: 'What does Shift Digital build?', a: 'Websites, landing pages, web apps, mobile apps, dashboards, AI tools, and automation flows that help businesses work better.' },
      { q: 'Can you help me decide what my business needs?', a: 'Yes. We can start with the problem, then choose the right mix of website, app, dashboard, or automation.' },
      { q: 'Do you work with clinics and small businesses?', a: 'Yes. We work with startups, small businesses, dental clinics, medical teams, creators, and service brands.' },
      { q: 'Can you connect forms to WhatsApp or n8n?', a: 'Yes. We can connect your website, app, or landing page to WhatsApp, email, CRM tools, and n8n workflows.' },
      { q: 'How long does a project take?', a: 'The timeline depends on scope, but we always define phases and keep the process predictable.' },
      { q: 'Do I need technical knowledge to start?', a: 'No. We guide the process in plain language and handle the technical decisions for you.' },
      { q: 'How do I start?', a: 'Use the contact form or WhatsApp button and tell us what you want to improve or build.' },
    ],
    contact: {
      kicker: 'Contact',
      title: 'Start your digital shift.',
      lead: 'Tell us what you want to improve or build, and we will respond with a practical next step.',
      nameLabel: 'Full name *',
      emailLabel: 'Email *',
      phoneLabel: 'Phone / WhatsApp',
      businessLabel: 'Business type',
      serviceLabel: 'Service needed *',
      messageLabel: 'Message *',
      messagePlaceholder: 'Tell us about your project, goals, timeline, and what success looks like.',
      submitRequest: 'Send Project Request',
      whatsapp: 'WhatsApp',
      requiredError: 'Please fill in the required fields before sending the request.',
      preparing: 'Sending your request...',
      success: 'Your request was sent successfully. We will contact you soon.',
      sendError: 'Something went wrong while sending your request. Please try again or contact us on WhatsApp.',
      phoneDisplay: CONTACT.phone,
      emailDisplay: CONTACT.email,
      whatsappLabel: 'WhatsApp',
      whatsappMessage: 'Hi Dr. Ahmed Awni, I would like to discuss a project for my business.',
    },
    footer: {
      blurb: 'Full-stack development for websites, apps, mobile experiences, AI tools, and digital systems.',
      navTitle: 'Navigation',
      servicesTitle: 'Services',
      contactTitle: 'Contact',
      rights: 'ShiftDigital. All rights reserved.',
      backToTop: 'Back to top',
    },
    options: {
      businessTypes: ['Startup', 'Small business', 'Dental clinic', 'Medical practice', 'Creator', 'Other'],
      services: ['Landing Page', 'Website', 'Web App', 'Mobile App', 'Dashboard / System', 'Automation with n8n', 'AI Tool'],
    },
  },
  ar: {
    title: 'ShiftDigital | المواقع والتطبيقات والأتمتة وجلب العملاء',
    nav: [
      { label: 'الرئيسية', href: '#home' },
      { label: 'الخدمات', href: '#services' },
      { label: 'الأعمال', href: '#projects' },
      { label: 'الخطوات', href: '#process' },
      { label: 'عن الشركة', href: '#about' },
      { label: 'تواصل معنا', href: '#contact' },
    ],
    brandSubtitle: 'التحول الرقمي. نمو حقيقي.',
    headerCta: 'ابدأ التحول الرقمي',
    themeTitle: 'تبديل الوضع الداكن',
    languageTitle: 'Switch to English',
    hero: {
      title: 'ابن أسرع. طوّر أذكى. وانم رقميا.',
      lead: 'تطوّر Shift Digital مواقع احترافية، صفحات هبوط، تطبيقات ويب، تطبيقات موبايل، لوحات تحكم، وأتمتة باستخدام n8n للشركات الناشئة والصغيرة والعيادات والفرق الطبية والمصورين وصناع المحتوى والأنشطة التي تريد نموا حقيقيا.',
      cta: 'ابدأ التحول الرقمي',
      projects: 'شاهد الأعمال',
      points: ['مواقع وصفحات هبوط', 'تطبيقات موبايل', 'لوحات تحكم وأنظمة', 'أتمتة n8n'],
      strip: 'شريك رقمي موثوق للأنشطة التي تطمح إلى النمو',
      metrics: [
        { title: 'تنفيذ سريع', text: 'تسليم نظيف ومتجاوب' },
        { title: 'وضوح أكبر', text: 'تجربة سهلة لغير التقنيين' },
        { title: 'نمو حقيقي', text: 'مواقع وتطبيقات وأتمتة تدعم المبيعات' },
      ],
    },
    about: {
      title: 'عن Shift Digital',
      paragraphs: [
        'Shift Digital استوديو تطوير متكامل يركز على المواقع الاحترافية وواجهات التطبيقات وأدوات الذكاء الاصطناعي والأنظمة الرقمية التي تجعل الأعمال أكثر حداثة وتنظيما ومصداقية.',
        'الهوية مبنية على فكرة التحول الرقمي المستمر: حركة أوضح، سرعة أعلى، ونتائج عملية تدعم النمو.',
      ],
      directionTitle: 'اتجاه الهوية الرسمي',
      directionText: 'التركواز والأزرق والكحلي العميق مع مساحات فاتحة ونظيفة.',
    },
    founder: {
      title: 'عن د. أحمد عوني',
      paragraphs: [
        'يجمع د. أحمد عوني بين خبرة في المجال الطبي وفكر برمجي ورؤية عملية للتحول الرقمي. هذا المزيج مفيد عندما يحتاج المشروع إلى تعاطف وتنظيم في الوقت نفسه.',
        'وهو يفهم كيف يجعل التقنية واضحة وسهلة للناس الحقيقيين، خاصة للأعمال التي تحتاج إلى ثقة وسرعة وبساطة.',
      ],
      tags: ['تطوير الويب', 'تطبيقات الموبايل', 'أدوات الذكاء الاصطناعي', 'الأتمتة', 'أنظمة الأعمال', 'التجربة الرقمية الطبية'],
    },
    servicesSection: {
      kicker: 'الخدمات',
      title: 'كل ما تحتاجه لتقديم عمل رقمي حديث وأتمتته.',
      lead: 'كل خدمة معروضة من منظور القيمة التجارية وليس من منظور المصطلحات التقنية.',
    },
    services: [
      { title: 'تطوير المواقع', description: 'مواقع احترافية تشرح العرض بسرعة، وتعمل بخفة، وتحول الزوار إلى عملاء محتملين.', benefit: 'انطباع أول أقوى', icon: 'globe' },
      { title: 'صفحات الهبوط', description: 'صفحات حملات عالية التحويل للشركات الناشئة والإطلاقات والعروض والإعلانات المدفوعة.', benefit: 'عملاء محتملون أكثر', icon: 'window' },
      { title: 'تطوير تطبيقات الويب', description: 'تطبيقات ويب مخصصة تبسط سير العمل وتقلل التعقيد وتبقي الفريق متوافقا.', benefit: 'عمليات أنظف', icon: 'window' },
      { title: 'تطوير تطبيقات الموبايل', description: 'تجارب موبايل مصممة للمس والوضوح والأداء الموثوق عبر مختلف الأجهزة.', benefit: 'استخدام يومي أفضل', icon: 'phone' },
      { title: 'لوحات التحكم والأنظمة', description: 'لوحات تشغيل وأنظمة داخلية تجعل المتابعة والإدارة أسهل وأكثر وضوحا.', benefit: 'تحكم أكبر', icon: 'dashboard' },
      { title: 'أتمتة n8n', description: 'أتمتة تربط موقعك وتطبيقك والنماذج وواتساب وسير العمل الداخلي.', benefit: 'خطوات يدوية أقل', icon: 'bot' },
      { title: 'أدوات الذكاء الاصطناعي', description: 'ميزات ذكاء اصطناعي عملية توفر الوقت وتعرض الرؤى وتدعم القرار الذكي.', benefit: 'عمل يدوي أقل', icon: 'spark' },
    ],
    transformation: {
      kicker: 'التحول الرقمي',
      title: 'استبدل العمل اليدوي بأنظمة رقمية أوضح.',
      lead: 'التحول الرقمي ليس مجرد برنامج. إنه تقليل الأخطاء وتسريع العمل وتوضيح المتابعة وتحسين التجربة للعملاء والفريق.',
      bullets: ['تنفيذ أسرع', 'تجربة أفضل للعميل', 'قابلية توسع أعلى', 'عمل متكرر أقل'],
      beforeTitle: 'يدوي ومبعثر',
      afterTitle: 'متصل وواضح',
      beforeLabel: 'قبل',
      afterLabel: 'بعد',
      beforeItems: ['عمليات يدوية', 'أدوات منفصلة', 'استجابة بطيئة', 'بيانات مبعثرة'],
      afterItems: ['لوحات واضحة', 'تدفقات مؤتمتة', 'تجربة أفضل للعميل', 'نمو أسرع للأعمال'],
      cta: 'اكتشف ما يمكن بناؤه بعد ذلك',
      imageAlt: 'مفهوم التحول الرقمي لدى Shift Digital',
    },
    projectsSection: {
      kicker: 'الأعمال',
      title: 'أمثلة من المشاريع توضح الاتجاه.',
      lead: 'كل مثال يركز على الوضوح والثقة والتنفيذ المتقن.',
      cta: 'ابنِ شيئا مشابها',
    },
    projects: [
      { title: 'GetItDone', category: 'تطبيق إنتاجية للموبايل', problem: 'كان يحتاج إلى مركز يومي بسيط للمهام والمواعيد والمستحقات والتذكيرات.', solution: 'تطبيق أندرويد يركز على التخطيط لليوم وتتبع العناصر المتأخرة واستقبال التذكيرات في الوقت المناسب.', result: 'سير عمل أوضح للمستخدمين الذين يريدون تنظيم يومهم والاهتمام بما يهم اليوم.', media: [ASSETS.portfolio.getItDone] },
      { title: 'AMG Academy', category: 'تطبيق تعليمي لطب الأسنان', problem: 'كان يحتاج إلى مكان واحد للدورات والتسجيلات والتذاكر والشهادات والإعلانات.', solution: 'تطبيق تعلم ومجتمع احترافي لمتخصصي طب الأسنان تحت Allam Medical Group.', result: 'تجربة أسهل للأطباء والطلاب وأعضاء الأكاديمية للبقاء على اتصال.', media: [ASSETS.portfolio.amgFeature, ASSETS.portfolio.amgIcon] },
      { title: 'Demo Lab', category: 'نظام مختبر أسنان White-label', problem: 'كان يحتاج إلى إدارة إرسال الحالات ومتابعة الإنتاج والموظفين والمخزون والمالية والتقارير.', solution: 'منصة مختبر مرنة تؤتمت استقبال الحالات وتنبيهات واتساب وتتبع سير العمل والفواتير.', result: 'رؤية أوضح لدورة الحالة الكاملة من الإرسال حتى التسليم.', media: [ASSETS.portfolio.demoLab1, ASSETS.portfolio.demoLab2, ASSETS.portfolio.demoLabLogo] },
    ],
    processSection: {
      kicker: 'الخطوات',
      title: 'عملية بسيطة تزيل الغموض.',
      lead: 'اكتشاف، تخطيط، تصميم، بناء، أتمتة، إطلاق، وتحسين.',
    },
    process: [
      { step: '01', title: 'اكتشاف', description: 'نحدد هدف العمل والمستخدمين والنتائج المطلوبة قبل بدء أي تصميم.', icon: 'search' },
      { step: '02', title: 'تخطيط', description: 'نرسم المحتوى والبنية والميزات وأفضل طريق للتحويل.', icon: 'map' },
      { step: '03', title: 'تصميم', description: 'تتشكل الواجهة حول الوضوح والثقة ونظام بصري احترافي.', icon: 'pen' },
      { step: '04', title: 'بناء', description: 'يتم برمجة الموقع أو التطبيق بشكل نظيف بمكونات قابلة لإعادة الاستخدام واستجابة كاملة.', icon: 'code' },
      { step: '05', title: 'أتمتة', description: 'تُربط العمليات والنماذج والمهام بحيث يقوم النظام بالمزيد من العمل.', icon: 'workflow' },
      { step: '06', title: 'إطلاق', description: 'نختبر وننقح وننشر ونحسن المنتج وفق الاستخدام الحقيقي.', icon: 'rocket' },
      { step: '07', title: 'تحسين', description: 'بعد الإطلاق نستمر في الاستماع والتحسين وإضافة ما يفيد لاحقا.', icon: 'spark' },
    ],
    trustSection: {
      kicker: 'الثقة',
      title: 'لماذا يثق العملاء في العمل.',
      lead: 'هذه عبارات ثقة وليست شهادات غير حقيقية، حتى يبقى الموقع صادقا إلى أن تتوفر اقتباسات فعلية.',
    },
    trust: [
      { title: 'تواصل واضح', text: 'تعرف دائما ماذا يحدث وما هي الخطوة التالية وما الذي يحتاج موافقتك.' },
      { title: 'تسليم عملي', text: 'يتم تشكيل العمل حول قيمة حقيقية للأعمال لا حول ضوضاء بصرية أو تعقيد غير ضروري.' },
      { title: 'مصمم للثقة', text: 'التصميم والرسائل يجعلان العلامة تبدو موثوقة من أول شاشة.' },
    ],
    faqSection: {
      kicker: 'الأسئلة الشائعة',
      title: 'أسئلة يطرحها الناس عادة في البداية.',
      lead: 'الإجابات البسيطة تقلل التردد وتجعل بدء المشروع أسهل.',
    },
    faqs: [
      { q: 'ماذا تطور Shift Digital؟', a: 'مواقع وصفحات هبوط وتطبيقات ويب وتطبيقات موبايل ولوحات تحكم وأدوات ذكاء اصطناعي وتدفقات أتمتة تساعد الأعمال على العمل بشكل أفضل.' },
      { q: 'هل يمكنكم مساعدتي في معرفة ما يحتاجه عملي؟', a: 'نعم. يمكننا البدء بالمشكلة ثم اختيار المزيج المناسب من الموقع أو التطبيق أو لوحة التحكم أو الأتمتة.' },
      { q: 'هل تعملون مع العيادات والشركات الصغيرة؟', a: 'نعم. نعمل مع الشركات الناشئة والصغيرة وعيادات الأسنان والفرق الطبية وصناع المحتوى والعلامات الخدمية.' },
      { q: 'هل يمكنكم ربط النماذج بواتساب أو n8n؟', a: 'نعم. يمكننا ربط الموقع أو التطبيق أو صفحة الهبوط بواتساب والبريد وأدوات CRM وسير عمل n8n.' },
      { q: 'كم يستغرق المشروع؟', a: 'المدة تعتمد على نطاق العمل، لكننا نحدد المراحل دائما ونحافظ على وضوح العملية.' },
      { q: 'هل أحتاج معرفة تقنية للبدء؟', a: 'لا. نحن نشرح العملية بلغة بسيطة ونتولى القرارات التقنية عنك.' },
      { q: 'كيف أبدأ؟', a: 'استخدم نموذج التواصل أو زر واتساب وأخبرنا بما تريد تحسينه أو بناؤه.' },
    ],
    contact: {
      kicker: 'تواصل معنا',
      title: 'ابدأ تحولك الرقمي.',
      lead: 'اكتب لنا ما تريد تطويره أو بناؤه، وسنرد عليك بخطوة عملية واضحة.',
      nameLabel: 'الاسم الكامل *',
      emailLabel: 'البريد الإلكتروني *',
      phoneLabel: 'الهاتف / واتساب',
      businessLabel: 'نوع النشاط',
      serviceLabel: 'الخدمة المطلوبة *',
      messageLabel: 'الرسالة *',
      messagePlaceholder: 'اكتب فكرة المشروع والأهداف والوقت المناسب وما الذي يعتبر نجاحا بالنسبة لك.',
      submitRequest: 'إرسال طلب المشروع',
      whatsapp: 'واتساب',
      requiredError: 'يرجى ملء الحقول المطلوبة قبل إرسال الطلب.',
      preparing: 'جاري إرسال طلبك...',
      success: 'تم إرسال طلبك بنجاح. سنتواصل معك قريبا.',
      sendError: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.',
      phoneDisplay: CONTACT.phone,
      emailDisplay: CONTACT.email,
      whatsappLabel: 'واتساب',
      whatsappMessage: 'مرحباً د. أحمد عوني، أرغب في مناقشة مشروع لعملي.',
    },
    footer: {
      blurb: 'تطوير متكامل للمواقع والتطبيقات وتجارب الموبايل وأدوات الذكاء الاصطناعي والأنظمة الرقمية.',
      navTitle: 'التنقل',
      servicesTitle: 'الخدمات',
      contactTitle: 'تواصل',
      rights: 'ShiftDigital. جميع الحقوق محفوظة.',
      backToTop: 'العودة للأعلى',
    },
    options: {
      businessTypes: ['شركة ناشئة', 'شركة صغيرة', 'عيادة أسنان', 'منشأة طبية', 'صانع محتوى', 'أخرى'],
      services: ['صفحة هبوط', 'موقع', 'تطبيق ويب', 'تطبيق موبايل', 'لوحة تحكم / نظام', 'أتمتة n8n', 'أداة ذكاء اصطناعي'],
    },
  },
};

let activeLanguage = 'en';

const whatsappLink = (language = 'en') => {
  const message = CONTENT[language]?.contact?.whatsappMessage || CONTENT.en.contact.whatsappMessage;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
};

function svgIcon(name) {
  const base = 'width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const icons = {
    arrow: `<svg ${base}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>`,
    menu: `<svg ${base}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>`,
    close: `<svg ${base}><path d="M6 6 18 18" /><path d="M18 6 6 18" /></svg>`,
    sun: `<svg ${base}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.9 4.9 1.4 1.4" /><path d="m17.7 17.7 1.4 1.4" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m4.9 19.1 1.4-1.4" /><path d="m17.7 6.3 1.4-1.4" /></svg>`,
    moon: `<svg ${base}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" /></svg>`,
    language: `<svg ${base}><path d="M4 5h8" /><path d="M8 3v2" /><path d="M10.5 5c-.8 3.4-2.8 6-6.5 8" /><path d="M5.5 8c1 1.8 2.4 3.2 4.5 4.2" /><path d="M14 21l4-10 4 10" /><path d="M15.5 17h5" /></svg>`,
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

function faqMarkup(items) {
  return items.map((item) => `
    <details class="faq-item">
      <summary>${item.q}<span>${svgIcon('arrow')}</span></summary>
      <div class="faq-answer">${item.a}</div>
    </details>
  `).join('');
}

function servicesMarkup(services, language) {
  return services.map((service) => `
    <article class="service-card">
      <div class="service-icon">${svgIcon(service.icon)}</div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <div class="service-foot">
        <span>${service.benefit}</span>
        <a href="#contact">${language === 'ar' ? 'تعرف أكثر' : 'Learn more'} ${svgIcon('arrow')}</a>
      </div>
    </article>
  `).join('');
}

function projectsMarkup(projects, language) {
  return projects.map((project, index) => `
    <article class="project-card">
      <div class="project-visual">${projectPreview(project, index + 1)}</div>
      <div class="project-copy">
        <div class="project-chip">${project.category}</div>
        <h3>${project.title}</h3>
        <p><strong>${language === 'ar' ? 'المشكلة:' : 'Problem:'}</strong> ${project.problem}</p>
        <p><strong>${language === 'ar' ? 'الحل:' : 'Solution:'}</strong> ${project.solution}</p>
        <p><strong>${language === 'ar' ? 'النتيجة:' : 'Result:'}</strong> ${project.result}</p>
        <a href="#contact" class="text-link">${language === 'ar' ? 'ابنِ شيئا مشابها' : 'Build something similar'} ${svgIcon('arrow')}</a>
      </div>
    </article>
  `).join('');
}

function processMarkup(steps) {
  return steps.map((step) => `
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

function trustMarkup(items) {
  return items.map((item) => `
    <article class="trust-card">
      <div class="trust-mark">${svgIcon('shield')}</div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');
}

function transformationMarkup(copy) {
  return `
    <div class="transformation-grid">
      <div class="transformation-comparison">
        <div class="comparison-card comparison-before">
          <span>${copy.beforeLabel}</span>
          <h3>${copy.beforeTitle}</h3>
          <ul>${copy.beforeItems.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="comparison-arrow">${svgIcon('arrow')}</div>
        <div class="comparison-card comparison-after">
          <span>${copy.afterLabel}</span>
          <h3>${copy.afterTitle}</h3>
          <ul>${copy.afterItems.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="transformation-image">
        <img src="${ASSETS.transformation}" alt="${copy.imageAlt}" loading="lazy" />
      </div>
    </div>
  `;
}

function contactOptionsMarkup(options) {
  return options.map((option) => `<option value="${option}">${option}</option>`).join('');
}

function mountApp(language = activeLanguage) {
  const app = document.getElementById('app');
  if (!app) return;

  const copy = CONTENT[language] || CONTENT.en;
  document.title = copy.title;
  document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.body.dataset.language = language;

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
              <span>${copy.brandSubtitle}</span>
            </span>
          </a>

          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
            <span class="sr-only">${language === 'ar' ? 'تبديل التنقل' : 'Toggle navigation'}</span>
            ${svgIcon('menu')}
          </button>

          <nav id="primary-nav" class="primary-nav" aria-label="Primary">
            ${copy.nav.map((item) => `<a href="${item.href}" data-nav-link>${item.label}</a>`).join('')}
            <a class="btn btn-nav-cta btn-sm" href="#contact"><span>${copy.headerCta}</span> ${svgIcon('arrow')}</a>
          </nav>

          <div class="header-tools" aria-label="Site preferences">
            <button class="icon-btn" type="button" id="theme-toggle" title="${copy.themeTitle}" aria-label="${copy.themeTitle}">
              <span class="theme-icon theme-icon-light">${svgIcon('sun')}</span>
              <span class="theme-icon theme-icon-dark">${svgIcon('moon')}</span>
            </button>
            <button class="icon-btn" type="button" id="language-toggle" title="${copy.languageTitle}" aria-label="${copy.languageTitle}">
              ${svgIcon('language')}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section class="hero section-block" id="home">
          <div class="container hero-grid">
            <div class="hero-copy">
              <div class="hero-logo">
                <img src="${ASSETS.logo}" alt="Shift Digital logo" />
              </div>
              <h1>${copy.hero.title}</h1>
              <p class="hero-lead">${copy.hero.lead}</p>
              <div class="hero-actions">
                <a class="btn btn-hero-cta" href="#contact"><span>${copy.hero.cta}</span> ${svgIcon('arrow')}</a>
                <a class="btn btn-secondary" href="#projects">${copy.hero.projects}</a>
              </div>
              <div class="hero-points">
                <div>${svgIcon('window')} ${copy.hero.points[0]}</div>
                <div>${svgIcon('phone')} ${copy.hero.points[1]}</div>
                <div>${svgIcon('dashboard')} ${copy.hero.points[2]}</div>
                <div>${svgIcon('bot')} ${copy.hero.points[3]}</div>
              </div>
              <div class="hero-strip">
                <span>${copy.hero.strip}</span>
                <img src="${ASSETS.mark}" alt="" aria-hidden="true" />
              </div>
            </div>

            <div class="hero-visual">
              <figure class="hero-figure">
                <img src="${ASSETS.hero}" alt="Shift Digital website and app preview" loading="eager" />
              </figure>
              <div class="hero-metrics">
                ${copy.hero.metrics.map((metric) => `<div><strong>${metric.title}</strong><span>${metric.text}</span></div>`).join('')}
              </div>
            </div>
          </div>
        </section>

        <section class="section-block section-alt" id="about">
          <div class="container split-grid">
            <div class="content-stack">
              <h2>${copy.about.title}</h2>
              ${copy.about.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
              <div class="mini-brand-card">
                <img src="${ASSETS.logo}" alt="Shift Digital logo" />
                <div>
                  <strong>${copy.about.directionTitle}</strong>
                  <span>${copy.about.directionText}</span>
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
              <h2>${copy.founder.title}</h2>
              ${copy.founder.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
            </div>
            <div class="trust-grid trust-grid-tight">
              ${copy.founder.tags.map((tag, index) => {
                const icons = ['shield', 'phone', 'spark', 'bot', 'dashboard', 'globe'];
                return `<article class="trust-tag">${svgIcon(icons[index])} ${tag}</article>`;
              }).join('')}
            </div>
          </div>
        </section>

        <section class="section-block section-alt" id="services">
          <div class="container">
            <div class="section-heading">
              <p class="section-kicker">${copy.servicesSection.kicker}</p>
              <h2>${copy.servicesSection.title}</h2>
              <p>${copy.servicesSection.lead}</p>
            </div>
            <div class="service-grid">
              ${servicesMarkup(copy.services, language)}
            </div>
          </div>
        </section>

        <section class="section-block" id="transformation">
          <div class="container split-grid transformation-section">
            <div class="content-stack">
              <p class="section-kicker">${copy.transformation.kicker}</p>
              <h2>${copy.transformation.title}</h2>
              <p>${copy.transformation.lead}</p>
              <div class="bullet-grid">
                ${copy.transformation.bullets.map((item) => `<div>${svgIcon('arrow')} ${item}</div>`).join('')}
              </div>
              <a class="btn btn-secondary" href="#contact">${copy.transformation.cta}</a>
            </div>
            ${transformationMarkup(copy.transformation)}
          </div>
        </section>

        <section class="section-block section-alt" id="projects">
          <div class="container">
            <div class="section-heading section-heading-row">
              <div>
              <p class="section-kicker">${copy.projectsSection.kicker}</p>
                <h2>${copy.projectsSection.title}</h2>
                <p>${copy.projectsSection.lead}</p>
              </div>
              <a class="text-link" href="#contact">${copy.projectsSection.cta} ${svgIcon('arrow')}</a>
            </div>
            <div class="project-grid">
              ${projectsMarkup(copy.projects, language)}
            </div>
          </div>
        </section>

        <section class="section-block" id="process">
          <div class="container">
            <div class="section-heading">
              <p class="section-kicker">${copy.processSection.kicker}</p>
              <h2>${copy.processSection.title}</h2>
              <p>${copy.processSection.lead}</p>
            </div>
            <div class="process-grid">
              ${processMarkup(copy.process)}
            </div>
          </div>
        </section>

        <section class="section-block section-alt" id="trust">
          <div class="container">
            <div class="section-heading">
              <p class="section-kicker">${copy.trustSection.kicker}</p>
              <h2>${copy.trustSection.title}</h2>
              <p>${copy.trustSection.lead}</p>
            </div>
            <div class="trust-cards">
              ${trustMarkup(copy.trust)}
            </div>
          </div>
        </section>

        <section class="section-block" id="faq">
          <div class="container split-grid faq-grid">
            <div class="content-stack">
              <p class="section-kicker">${copy.faqSection.kicker}</p>
              <h2>${copy.faqSection.title}</h2>
              <p>${copy.faqSection.lead}</p>
            </div>
            <div class="faq-list">
              ${faqMarkup(copy.faqs)}
            </div>
          </div>
        </section>

        <section class="section-block section-alt" id="contact">
          <div class="container contact-grid">
            <div class="contact-copy">
              <p class="section-kicker">${copy.contact.kicker}</p>
              <h2>${copy.contact.title}</h2>
              <p>${copy.contact.lead}</p>
              <div class="contact-details">
                <a href="mailto:${CONTACT.email}">${svgIcon('chat')} ${copy.contact.emailDisplay}</a>
                <a href="tel:${CONTACT.phone.replace(/\s+/g, '')}">${svgIcon('phone')} ${copy.contact.phoneDisplay}</a>
                <a href="${whatsappLink(language)}" target="_blank" rel="noreferrer">${svgIcon('whatsapp')} ${copy.contact.whatsappLabel}</a>
              </div>
              <div class="contact-image">
                <img src="${ASSETS.logo}" alt="Shift Digital logo" />
              </div>
            </div>

            <form class="contact-form" id="lead-form" novalidate>
              <div class="form-grid">
                <label>
                  <span>${copy.contact.nameLabel}</span>
                  <input name="name" type="text" placeholder="${language === 'ar' ? 'أحمد عوني' : 'Ahmed Awni'}" required />
                </label>
                <label>
                  <span>${copy.contact.emailLabel}</span>
                  <input name="email" type="email" placeholder="${language === 'ar' ? 'hello@company.com' : 'hello@company.com'}" required />
                </label>
                <label>
                  <span>${copy.contact.phoneLabel}</span>
                  <input name="phone" type="tel" placeholder="${language === 'ar' ? '+20 ...' : '+20 ...'}" />
                </label>
                <label>
                  <span>${copy.contact.businessLabel}</span>
                  <input name="businessType" list="business-type-options" type="text" placeholder="${language === 'ar' ? 'اختر أو اكتب نوع النشاط' : 'Select or write business type'}" />
                  <datalist id="business-type-options">
                    ${contactOptionsMarkup(copy.options.businessTypes)}
                  </datalist>
                </label>
                <label>
                  <span>${copy.contact.serviceLabel}</span>
                  <input name="service" list="service-options" type="text" placeholder="${language === 'ar' ? 'اختر أو اكتب الخدمة المطلوبة' : 'Select or write service needed'}" required />
                  <datalist id="service-options">
                    ${contactOptionsMarkup(copy.options.services)}
                  </datalist>
                </label>
              </div>
              <label class="full-width">
                <span>${copy.contact.messageLabel}</span>
                <textarea name="message" rows="5" placeholder="${copy.contact.messagePlaceholder}" required></textarea>
              </label>
              <div class="form-actions">
                <button class="btn btn-primary" type="submit"><span>${copy.contact.submitRequest}</span> ${svgIcon('arrow')}</button>
                <a class="btn btn-secondary" href="${whatsappLink(language)}" target="_blank" rel="noreferrer">${svgIcon('whatsapp')} <span>${copy.contact.whatsappLabel}</span></a>
              </div>
              <p class="form-status" id="form-status" aria-live="polite"></p>
            </form>
          </div>
        </section>
      </main>

      <a class="whatsapp-float" href="${whatsappLink(language)}" target="_blank" rel="noreferrer" aria-label="${copy.contact.whatsappLabel}">
        ${svgIcon('whatsapp')}
      </a>

      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <img src="${ASSETS.logo}" alt="Shift Digital logo" />
            <p>${copy.footer.blurb}</p>
          </div>
          <div>
            <h3>${copy.footer.navTitle}</h3>
            ${copy.nav.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
          </div>
          <div>
            <h3>${copy.footer.servicesTitle}</h3>
            ${copy.services.map((service) => `<a href="#services">${service.title}</a>`).join('')}
          </div>
          <div>
            <h3>${copy.footer.contactTitle}</h3>
            <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
            <a href="${whatsappLink(language)}" target="_blank" rel="noreferrer">${copy.contact.whatsappLabel}</a>
            <a href="tel:${CONTACT.phone.replace(/\s+/g, '')}">${CONTACT.phone}</a>
          </div>
        </div>
        <div class="container footer-bottom">
          <span>${copy.footer.rights}</span>
          <div class="footer-links">
            <a href="#home">${copy.footer.backToTop}</a>
          </div>
        </div>
      </footer>
    </div>
  `;

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const languageToggle = document.getElementById('language-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = nextTheme;
      themeToggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
    });
  }

  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      activeLanguage = activeLanguage === 'en' ? 'ar' : 'en';
      mountApp(activeLanguage);
    });
  }

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
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const service = String(data.get('service') || '').trim();
      const message = String(data.get('message') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const businessType = String(data.get('businessType') || '').trim();

      if (!name || !email || !service || !message) {
        status.textContent = copy.contact.requiredError;
        status.className = 'form-status is-error';
        return;
      }

      const payload = {
        source: 'ShiftDigital website',
        language,
        name,
        email,
        phone,
        businessType,
        service,
        message,
        submittedAt: new Date().toISOString(),
      };

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      status.textContent = copy.contact.preparing;
      status.className = 'form-status is-success';

      try {
        const response = await fetch(LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Webhook failed with ${response.status}`);
        }

        status.textContent = copy.contact.success;
        status.className = 'form-status is-success';
        form.reset();
      } catch (error) {
        console.error(error);
        status.textContent = copy.contact.sendError;
        status.className = 'form-status is-error';
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => mountApp());
