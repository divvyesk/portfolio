export const profile = {
  name: "Divvye Kansara",
  firstName: "Divvye",
  role: "Full-Stack & AI Engineer",
  tagline: "I make cool stuff come to life. Wanna take a tour??",
  location: "Mumbai, India",
  availability: "Open to internships & freelance",
  blurb: "Computer science undergrad. I make cool stuff come to life. Wanna take a tour??",
  resumePath: "/Divvye_Kansara_Resume.pdf",
  photo: "/PROFILE.jpeg",
};

export const contact = {
  email: "divvyesk2428@gmail.com",
  phone: "+91 99872 25618",
  phoneHref: "tel:+919987225618",
  linkedin: "https://linkedin.com/in/divvye-kansara",
  github: "https://github.com/divvyesk",
  leetcode: "https://leetcode.com/u/divvye/",
};

export const socials = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, tag: "01" },
  { label: "Phone", value: "+91 99872 25618", href: contact.phoneHref, tag: "02" },
  { label: "LinkedIn", value: "in/divvye-kansara", href: contact.linkedin, tag: "03" },
  { label: "GitHub", value: "@divvyesk", href: contact.github, tag: "04" },
  { label: "LeetCode", value: "u/divvye", href: contact.leetcode, tag: "05" },
];

export const education = {
  school: "Thadomal Shahani Engineering College",
  location: "Mumbai",
  degree: "B.E. Computer Engineering",
  cgpa: "9.1 / 10",
  period: "Sep 2024 to May 2028",
};

export const stats = [
  { value: "200+", label: "DSA problems solved" },
  { value: "9.1", label: "CGPA / 10" },
  { value: "3", label: "Products shipped" },
  { value: "1st", label: "Place, Reverse Code Battle" },
];

export const currently = [
  "Building side projects because sitting still is harder than coding",
  "Grinding DSA in C++, 200+ problems and counting",
  "Learning system design and cloud deployment (slowly, but surely)",
];

export const siteCopy = {
  hero: {
    bio: "I like taking half-baked ideas and turning them into things that actually work. Mostly web stuff, sometimes weird experiments, always trying to make the result feel obvious in hindsight.",
    bioHighlight: "Currently open to internships.",
    ctaPrimary: "See my work",
    ctaSecondary: "Ask my AI",
  },
  about: {
    paragraphs: [
      "I'm Divvye. I got into building because I can't leave a broken thing alone. Something doesn't work, I need to know why. Something could work better, I need to try. That curiosity stuck around longer than most hobbies.",
      "I don't wait for the perfect plan before starting. I poke at the problem, learn what I don't know, and figure it out as I go. Turns out that's a pretty good way to actually finish things instead of just thinking about them.",
    ],
    resumeLink: "Read the full resume",
  },
  skills: {
    intro:
      "The stack I move fast in. Everything listed here is something I've actually shipped with, not something I skimmed a tutorial on.",
    sidebarNote: "Everything else, I learn fast",
  },
  projects: {
    intro:
      "Three products, each with a real problem behind it. Open one to read how it was built and what it actually does.",
  },
  aiBand: {
    description:
      "There's an assistant here trained strictly on my resume. Ask it whether I can handle a specific role, stack, or task. It answers in my own words, and it won't make anything up.",
  },
  contact: {
    intro:
      "Hiring, collaborating, or just curious about something I built? Hit LinkedIn to say hi, or email me if you prefer. I reply to everything.",
  },
};

export const skillGroups = [
  {
    id: "languages",
    title: "Languages",
    blurb: "C++ for algorithms, JavaScript for the web, Python for data and ML.",
    items: ["C++", "JavaScript", "Python", "Java"],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Interfaces that feel fast and stay smooth at 60fps.",
    items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "APIs, auth, and server logic that hold up under real use.",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    id: "data",
    title: "Databases",
    blurb: "Modelling and persisting data for products, not throwaway demos.",
    items: ["MongoDB", "MySQL"],
  },
  {
    id: "ai",
    title: "AI / ML & Data",
    blurb: "LLM pipelines, classical ML, and the benchmarking to back choices.",
    items: ["scikit-learn", "numpy", "pandas", "matplotlib", "Gemini", "Groq", "OpenRouter", "OCR / Tesseract.js"],
  },
  {
    id: "tools",
    title: "Tools & CS Core",
    blurb: "Workflow and fundamentals behind the products.",
    items: ["Git", "GitHub", "GitHub Pages", "Postman", "Data Structures", "Algorithms", "STL"],
  },
];

export const marqueeWords = [
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "C++",
  "Python",
  "LLM Integration",
  "Framer Motion",
  "scikit-learn",
  "MySQL",
  "Express.js",
  "Data Structures",
];

export const projects = [
  {
    slug: "finos",
    index: "01",
    title: "FinOS",
    subtitle: "AI-Powered Personal Finance Simulator",
    category: "Full-Stack / AI",
    date: "July 2026",
    accent: "acid",
    thumbnail: "/projects/finos-cover.png",
    thumbnailAspect: "2872 / 1418",
    stack: ["Next.js", "React", "Framer Motion", "MongoDB", "Gemini", "Tesseract.js"],
    summary:
      "Reads your financial documents, models tax rules for countries around the world, and turns the surplus into a compounding five-level roadmap.",
    overview: [
      "Most finance tools tell you what you spent. FinOS tells you what you can do next. I built a simulator that ingests real documents, understands them, and projects a plan around the numbers.",
      "Documents enter through an OCR pipeline. A tax engine localises deductions to your country and region. A roadmap generator converts net surplus into sequential, compounding goals, each with its own AI-assisted workspace.",
    ],
    highlights: [
      {
        title: "Smart Document Intake",
        body: "OCR via Tesseract.js and pdf-parse, with Gemini parsing structured financial data at ~99% accuracy.",
      },
      {
        title: "Global Tax Engine",
        body: "Tax simulation across countries worldwide, projecting net surplus income based on local rules.",
      },
      {
        title: "Dynamic Waterfall Roadmap",
        body: "Five-level compounding goal generator based on net surplus.",
      },
      {
        title: "Interactive Goal Workspaces",
        body: "Per-level workspaces with AI chat, checklists, and progress tracking. 40% higher goal completion.",
      },
      {
        title: "LLM Integration Benchmarking",
        body: "Compared Gemini, OpenRouter, and Groq across 500+ queries for speed, reliability, and cost.",
      },
      {
        title: "60fps Canvas Scrollytelling",
        body: "HTML5 Canvas + Framer Motion, 270 frames synced to device pixel ratio.",
      },
    ],
    metrics: [
      { value: "99%", label: "Document parse accuracy" },
      { value: "Global", label: "Tax coverage" },
      { value: "+40%", label: "Goal completion" },
      { value: "270", label: "Canvas frames at 60fps" },
    ],
    live: "https://finos-penny.vercel.app",
    repo: "https://github.com/divvyesk/finos",
  },
  {
    slug: "hitlab-ai",
    index: "02",
    title: "HitLab AI",
    subtitle: "Billboard Hot 100 Predictor",
    category: "Machine Learning",
    date: "May 2026",
    accent: "volt",
    thumbnail: "/projects/hitlab-ai.png",
    thumbnailAspect: "16 / 10",
    stack: ["Next.js", "React", "Tailwind CSS", "Python", "scikit-learn", "MongoDB"],
    summary:
      "Predicts how long a track could hold the Billboard #1 spot, with a What-If Studio to tune audio features and see why.",
    overview: [
      "Is chart longevity predictable from audio attributes? I trained a model on real Billboard Hot 100 history and wrapped it in an interface anyone can explore.",
      "The What-If Studio is the core experience: adjust danceability or energy and watch predicted weeks at #1 shift, alongside the five most similar historical hits.",
    ],
    highlights: [
      {
        title: "Predictive ML Model",
        body: "Random Forest on 1,177 Billboard #1 hits. Feature importance surfaces the top three driving attributes.",
      },
      {
        title: "Similarity & Calibration Engine",
        body: "k-NN matches tracks to five similar historical hits. Calibrated probabilities estimate weeks at #1 with 85% precision.",
      },
      {
        title: "What-If Studio & Dashboard",
        body: "Spotify-inspired dark UI, real-time parameter tuning, decadal chart analytics, JWT auth, MongoDB persistence for 100+ saved scenarios.",
      },
    ],
    metrics: [
      { value: "1,177", label: "#1 hits in training set" },
      { value: "85%", label: "Precision on weeks at #1" },
      { value: "100+", label: "Saved scenarios" },
    ],
    live: "https://hitlab.up.railway.app",
    repo: "https://github.com/divvyesk/hitlab",
  },
  {
    slug: "rapids-qr",
    index: "03",
    title: "Rapids QR",
    subtitle: "Offline Link & Contact Generator",
    category: "Client Work / Frontend",
    date: "June 2026",
    accent: "ink",
    thumbnail: "/projects/rapids-qr.png",
    thumbnailAspect: "16 / 10",
    stack: ["React", "Next.js", "JavaScript", "HTML", "CSS", "vCard"],
    summary:
      "Client-built QR generator that embeds links and vCards directly in the code. No hosting, no downloads, no signup, completely free.",
    overview: [
      "A real client brief, not a side-project idea. Their users kept hitting walls: server-hosted files, download restrictions, apps pushing premium upgrades after a few scans, and people dropping off before a contact ever got saved.",
      "I reframed the requirement: put the payload inside the QR itself. The generator writes standard vCards into the code so iOS and Android cameras import contacts fully offline. No account, no paywall, no nonsense.",
    ],
    highlights: [
      {
        title: "Requirement Analysis",
        body: "Worked with clients to move from server-hosted files to static offline QR codes, bypassing download restrictions and premium upsells.",
      },
      {
        title: "Dynamic Inputs",
        body: "React forms with up to 20 phone and URL fields, add/remove on the fly.",
      },
      {
        title: "Direct Offline Import",
        body: "vCards embedded in QR codes for instant native camera import on iOS and Android. Free forever, no signup required.",
      },
    ],
    metrics: [
      { value: "20", label: "Dynamic fields per code" },
      { value: "100%", label: "Offline, no hosting" },
      { value: "Free", label: "No signup" },
      { value: "iOS + Android", label: "Native camera import" },
    ],
    live: "https://rapids-qr-code-generator.vercel.app",
    repo: "https://github.com/divvyesk/rapids-qr-code-generator",
  },
];

export const achievements = [
  {
    tag: "01",
    title: "200+ problems solved",
    body: "Algorithm and data structure problems across LeetCode, CodingNinjas, and GeeksForGeeks.",
    href: contact.leetcode,
  },
  {
    tag: "02",
    title: "1st place, Reverse Code Battle",
    body: "Won out of 50+ teams at Paradox 24-25, organized by St. Xavier's Institute of Technology.",
  },
  {
    tag: "03",
    title: "3rd place, Code Relay",
    body: "Placed out of 40+ teams at Paradox 24-25, hosted by St. Xavier's Institute of Technology.",
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
