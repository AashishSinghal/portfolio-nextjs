/**
 * Site data used across the portfolio. Sourced from preserved data/ content.
 */

export type ProjectLink = {
  web: string;
  github: string;
};

export type ProjectItem = {
  id: number;
  name: string;
  slug: string;
  summary: string;
  image: string;
  tags: string[];
  link: ProjectLink;
};

export type PersonalLinks = {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  resume: string;
};

export type Personal = {
  name: string;
  title: string;
  tagline: string;
  about: string[];
  contact: PersonalLinks;
};

export type LanguageItem = {
  id: number;
  language: string;
  text: string;
  translation?: string;
};

export const projects: ProjectItem[] = [
  {
    id: 10,
    name: "AI Detect",
    slug: "ai-detect",
    summary:
      "An AI platform which can detect what's on the video feed and let's user record video clips or screenshots, made with TensorFlowJS",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aiDetect.png-zU5TcaxBUCAgbHi8zJviaOATHUk60u.jpeg",
    tags: ["tensorflowjs", "ai", "ml", "opensource", "fullstack", "react", "nextjs", "tailwindcss"],
    link: { web: "https://ai-detect.aashishsinghal.com", github: "https://github.com/AashishSinghal/ai-detect" },
  },
  {
    id: 1,
    name: "Alpha Exchange - App",
    slug: "alpha-exchange-app",
    summary:
      "A Cryptocurrency (Ethereum) Exchange platform made with React and Solidity Smart contract using Hardhat with TailwindCSS and Vite.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alphaexchange-Q0LS6M1okIgaN6UMan0wcIuUePARY1.png",
    tags: ["opensource", "webdev", "fullstack", "react", "nextjs", "tailwindcss", "web3", "solidity"],
    link: { web: "https://alpha-exchange.netlify.app", github: "https://github.com/AashishSinghal/alpha_web3.0" },
  },
  {
    id: 2,
    name: "CryptoWatch - App",
    slug: "cryptowatch-app",
    summary: "A Cryptocurrency Watching app made with React and Redux-toolkit with Rapid API & ANT-Design.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cryptoApp-fiOBG8FqtE1SLcbbfHYcLq8AhUZs9h.png",
    tags: ["opensource", "react", "typescript", "tailwindcss", "redux-toolkit"],
    link: { web: "https://crypto-app-via-rapid-api.netlify.app", github: "https://github.com/AashishSinghal/crypto-app" },
  },
  {
    id: 3,
    name: "Blog Website (POC)",
    slug: "blog-website-poc",
    summary: "Next.JS, Tailwind, TypeScript GraphQL and GraphCMS based Blogging application prototype POC.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog-4Kl5pfuF3VXL2p19Lq6WvJAVj2kcyu.png",
    tags: ["opensource", "nextjs", "typescript", "tailwindcss", "graph", "cms"],
    link: { web: "https://cms-blog-seven.vercel.app", github: "https://github.com/AashishSinghal/cms_blog" },
  },
  {
    id: 4,
    name: "Dev Resources",
    slug: "dev-resources",
    summary: "Next.JS, Tailwind, TypeScript, Sanity and SanityCMS based Blogging application.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devResources-nCe372TY1dOs7n0VGkDWUTUJgLPmyK.png",
    tags: ["opensource", "nextjs", "typescript", "tailwindcss", "sanity", "sanitycms"],
    link: { web: "https://taxlawadvisers.vercel.app", github: "https://github.com/AashishSinghal/taxlawadvisers" },
  },
  {
    id: 5,
    name: "Expense Tracker",
    slug: "expense-tracker",
    summary: "Github User Search portal made with React, Fusion Charts, Github API for a descriptive view of a Github Profile.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Expense-Tracker-lQrtcMYAcarKeOkgI4lPswNUyhioz9.png",
    tags: ["opensource", "webdev", "rapidapi", "react", "tailwindcss"],
    link: { web: "https://githubusersearch-app.netlify.app", github: "https://github.com/AashishSinghal/search-users" },
  },
  {
    id: 6,
    name: "File Encryptor - ElectronJS",
    slug: "file-encryptor-electronjs",
    summary: "ElectronJS desktop app for file encryption using AES. Download the executable from the demo link.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fileEncryptor-3dkRFqpqBxKse9LejFm7ufZstTA2xg.png",
    tags: ["opensource", "AES", "javascript", "electronjs", "react"],
    link: {
      web: "https://drive.google.com/file/d/1gwp8YrGQ85HXnRWJfP1RHAGB7qmzmyXT/view?usp=sharing",
      github: "https://github.com/AashishSinghal/file-encryptor",
    },
  },
  {
    id: 7,
    name: "Animated Preloader",
    slug: "animated-preloader",
    summary: "CSS-only animated preloader for a company app internship project.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preloader-H0EtnnYX6bbeC3NDra5EJ388eK1S67.png",
    tags: ["opensource", "animation", "html", "css"],
    link: { web: "https://innofarms-preloader.netlify.app", github: "https://github.com/AashishSinghal/Innofarms-Preloader" },
  },
  {
    id: 8,
    name: "Admin Panel",
    slug: "admin-panel",
    summary: "ElectronJS desktop app for screen recording with React front-end. Download executable from demo link.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adminPanel-bX4dEKEBcsKr7CfWf39duCuj6k3vbY.png",
    tags: ["opensource", "webdev", "electron", "react", "desktop-application"],
    link: {
      web: "https://drive.google.com/file/d/1LmrsgOv_B_xUf2GCGE7ZHf6OSDjZzP60/view?usp=sharing",
      github: "https://github.com/AashishSinghal/electron-screen-recorder",
    },
  },
  {
    id: 9,
    name: "Flappy Bird Game",
    slug: "flappy-bird-game",
    summary: "Flappy Bird game on web using Vanilla JavaScript.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FlappyBird-7lFXc5iGfUPhKym0Eu0EwPd4MJoolt.png",
    tags: ["opensource", "html", "css", "javascript", "games"],
    link: { web: "https://flabby-bird-using-js.netlify.app/", github: "https://github.com/AashishSinghal/FlappyBird-in-JS" },
  },
  {
    id: 11,
    name: "WhatsApp Clone",
    slug: "whatsapp-clone",
    summary: "WhatsApp Web clone with real-time chat and user authentication.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-Clone-5IxHxdm8lnZVawJXx995xSmia0CzqF.png",
    tags: ["react", "firebase", "real-time", "chat", "authentication"],
    link: { web: "https://whatsapp-clone.aashishsinghal.com", github: "https://github.com/AashishSinghal/whatsapp-clone" },
  },
  {
    id: 12,
    name: "Telegram Clone",
    slug: "telegram-clone",
    summary: "Telegram Web clone with core messaging features and iconic Telegram design.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Telegram-Clone-TjMz6fAcxAwhjY7FbuUJNvVD42LwlF.png",
    tags: ["react", "typescript", "websockets", "ui/ux", "authentication"],
    link: { web: "https://telegram-clone.aashishsinghal.com", github: "https://github.com/AashishSinghal/telegram-clone" },
  },
  {
    id: 13,
    name: "GitHub User Search",
    slug: "github-user-search",
    summary: "Advanced GitHub user search with detailed profile analytics and repository insights.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/searchUser-Um4Slf8iAccPOF49Jk6iunnR74lKkr.png",
    tags: ["react", "github-api", "data-visualization", "typescript"],
    link: { web: "https://github-user-search.aashishsinghal.com", github: "https://github.com/AashishSinghal/github-user-search" },
  },
  {
    id: 14,
    name: "TaxLawAdvisers Blog",
    slug: "taxlawadvisers-blog",
    summary: "Professional blog platform for tax law advisers built with JAMstack.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tla-SHmMtrU5ImkuuhQN0JomnWzdGnhqrR.png",
    tags: ["nextjs", "sanity-cms", "typescript", "tailwindcss"],
    link: { web: "https://taxlawadvisers.vercel.app", github: "https://github.com/AashishSinghal/taxlawadvisers" },
  },
  {
    id: 15,
    name: "Screen Recorder",
    slug: "screen-recorder",
    summary: "Desktop screen recording application built with Electron and vanilla JavaScript.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-9E3EymhAAOL19vKNWYHJDwXhYyzFgY.png",
    tags: ["electron", "javascript", "desktop-app", "screen-capture"],
    link: {
      web: "https://drive.google.com/file/d/1LmrsgOv_B_xUf2GCGE7ZHf6OSDjZzP60/view",
      github: "https://github.com/AashishSinghal/screen-recorder",
    },
  },
];

export const personal: Personal = {
  name: "Aashish Singhal",
  title: "Software Engineer",
  tagline: "Building distributed systems, voice agents, and scalable platforms.",
  about: [
    "I'm a Software Engineer focused on full-stack development, real-time applications, and open-source projects. I build web apps with React, Next.js, and TypeScript, and enjoy working on everything from AI-powered tools to crypto exchanges and desktop applications.",
    "This portfolio is built with Next.js 16, React 19, MDX, Contentlayer, and Tailwind CSS. Projects and games live in separate repositories and are linked from here.",
  ],
  contact: {
    github: "https://github.com/AashishSinghal",
    linkedin: "https://linkedin.com/in/aashishsinghal",
    twitter: "https://twitter.com/aashishsinghal",
    email: "mailto:aashishsinghal@example.com",
    resume: "/resume.pdf",
  },
};

export const languages: LanguageItem[] = [
  { id: 1, language: "Hindi", text: "हिन्दी मेरी मातृभाषा है।", translation: "Hindi is my native tongue." },
  { id: 2, language: "English", text: "I'm pretty fluent in English." },
  { id: 3, language: "Japanese", text: "Genzai Duolingo de nihongo o benkyō shite imasu.", translation: "I am currently learning Japanese on Duolingo." },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug);
}
