export type Project = {
  slug: string
  name: string
  summary: string
  stack: string[]
  // Cover image, shown only at the top of the case-study page
  image?: string
  links: { live?: string; code?: string }
  // Featured projects get their own case-study page
  featured?: boolean
  // Case-study sections. Each renders only when filled in, so a featured project
  // can go live with just its summary and grow over time.
  caseStudy?: {
    problem?: string
    built?: string
    challenges?: string
  }
}

const blob = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com"

export const projects: Project[] = [
  {
    slug: "voice-agent",
    name: "Voice Agent",
    summary:
      "An interruptible voice agent. Talk over it and it stops mid-sentence; say “mhm” and it keeps going.",
    stack: ["React", "TypeScript", "Socket.IO", "Node.js", "Groq Whisper", "ffmpeg"],
    image: "/images/projects/voice-agent.webp",
    links: {
      live: "https://voice-agent-demo-drab.vercel.app",
      code: "https://github.com/AashishSinghal/voice-agent-demo",
    },
    featured: true,
    caseStudy: {
      problem:
        "A voice conversation lives or dies on the infrastructure around the model, not the model itself. A weak model that lets you interrupt it, knows what you actually heard, and can pick up a dropped thread feels better to talk to than a strong one that talks over you. So everything here is built to hold up with a small, cheap model behind it.",
      built:
        "Speech in, speech out, over a WebSocket. Replies stream sentence by sentence: the first sentence is synthesised and playing while the model is still writing the third, so first audio lands in under a second.\n\nIt tells a backchannel from an interruption. Saying “mhm” pauses playback, the utterance is transcribed and classified, and if it was only an acknowledgement the agent resumes from exactly where it stopped. A real question stops it immediately.\n\nHistory stays honest about what was heard. When you interrupt, only the sentences that actually finished playing go into history, flagged as interrupted, so the model never refers back to something you never heard. The unsaid remainder is kept, so “go back to what you were explaining” continues the thread.",
      challenges:
        "Latency is a pipeline, and the caller feels the sum of it. Detecting speech needs about 250 ms of sustained sound, and by then the first word is already spoken, so the microphone records for the whole call and the server trims back to the onset. The agent goes quiet in about 250 ms because pausing doesn't wait for the transcript; classifying the interruption is a set lookup rather than a model call.\n\nThe free hosting tier has 0.1 vCPU, where local Piper synthesis took around 29 seconds per sentence, so deployment moved synthesis and audio conversion to hosted services.",
    },
  },
  {
    slug: "videostil",
    name: "Videostil",
    summary:
      "Open-source tool that turns videos into deduplicated frames small enough for an LLM's context window.",
    stack: ["TypeScript", "Node.js", "FFmpeg", "LLM APIs"],
    links: {
      live: "https://www.npmjs.com/package/videostil",
      code: "https://github.com/empirical-run/videostil",
    },
    featured: true,
    caseStudy: {
      problem:
        "Videos are large and LLM context windows are small. Sending every frame of a screen recording to a model is slow and expensive, and most consecutive frames are near-identical anyway.",
      built:
        "A library and CLI that extracts frames with FFmpeg at a configurable frame rate, normalises them to a fixed size, and removes near-duplicates while keeping absolute frame indexes, so the video timeline is preserved. It supports Claude, GPT and Gemini for optional analysis, and ships a built-in viewer for inspecting the result.\n\nOpen-sourced from production use at Empirical.run and published on npm across 13 releases.",
      challenges:
        "Deciding which frames are “the same” is a trade-off between speed and how much change you keep, so it ships three deduplication algorithms: greedy, dynamic programming and a sliding window, with a similarity threshold you can tune.",
    },
  },
  {
    slug: "ai-incident-triage",
    name: "AI Incident Triage",
    summary:
      "Incident triage that enriches each incoming incident with an AI summary and suggested actions for a human to review.",
    stack: ["NestJS", "React", "TanStack", "DynamoDB", "OpenAI", "AWS CDK"],
    links: { code: "https://github.com/AashishSinghal/erp-triage-poc" },
    featured: true,
    caseStudy: {
      built:
        "A three-tier system: a NestJS API enriches incoming incidents with OpenAI-generated summaries and suggested actions and stores them in DynamoDB, and a React and TanStack Router/Query UI is where people submit and review them.\n\nInfrastructure is defined as code with AWS CDK, AWS is emulated locally with LocalStack, and build and deploy run on three GitHub Actions workflows.",
    },
  },
  {
    slug: "totp-web",
    name: "totp-web",
    summary:
      "A zero-dependency TOTP two-factor code generator and verifier, built on the Web Crypto API.",
    stack: ["TypeScript", "Web Crypto API"],
    image: "/images/projects/totp-web.webp",
    links: {
      live: "https://aashishsinghal.github.io/totp-web/",
      code: "https://github.com/AashishSinghal/totp-web",
    },
    featured: true,
    caseStudy: {
      built:
        "A small npm library for generating and verifying time-based one-time passwords, the six-digit codes behind authenticator apps. It has no dependencies, since the browser's Web Crypto API does the hashing, and ships a typed API, a CLI and a test suite, with semantic releases automated through changesets.",
    },
  },
  {
    slug: "ai-detect",
    name: "AI Detect",
    summary:
      "Real-time object detection on a live video feed, with clip recording and screenshots, running entirely in the browser with TensorFlow.js.",
    stack: ["TensorFlow.js", "React", "Next.js", "Tailwind CSS"],
    image: `${blob}/aiDetect.png-zU5TcaxBUCAgbHi8zJviaOATHUk60u.jpeg`,
    links: {
      live: "https://ai-detect.aashishsinghal.com",
      code: "https://github.com/AashishSinghal/ai-detect",
    },
    featured: true,
  },
  {
    slug: "alpha-exchange",
    name: "Alpha Exchange",
    summary:
      "An Ethereum exchange with Solidity smart contracts built on Hardhat, and a React front end.",
    stack: ["Solidity", "Hardhat", "React", "Vite", "Tailwind CSS"],
    image: `${blob}/alphaexchange-Q0LS6M1okIgaN6UMan0wcIuUePARY1.png`,
    links: {
      live: "https://alpha-exchange.netlify.app",
      code: "https://github.com/AashishSinghal/alpha_web3.0",
    },
    featured: true,
  },
  {
    slug: "cryptowatch",
    name: "CryptoWatch",
    summary:
      "A cryptocurrency tracker with live prices and news, built with React and Redux Toolkit.",
    stack: ["React", "Redux Toolkit", "TypeScript", "Ant Design", "RapidAPI"],
    image: `${blob}/cryptoApp-fiOBG8FqtE1SLcbbfHYcLq8AhUZs9h.png`,
    links: {
      live: "https://crypto-app-via-rapid-api.netlify.app",
      code: "https://github.com/AashishSinghal/crypto-app",
    },
    featured: true,
  },
  {
    slug: "taxlawadvisers",
    name: "TaxLawAdvisers Blog",
    summary: "A blog for a tax law practice, built on Next.js with Sanity as the CMS.",
    stack: ["Next.js", "Sanity", "TypeScript", "Tailwind CSS"],
    image: `${blob}/tla-SHmMtrU5ImkuuhQN0JomnWzdGnhqrR.png`,
    links: {
      live: "https://taxlawadvisers.vercel.app",
      code: "https://github.com/AashishSinghal/taxlawadvisers",
    },
  },
  {
    slug: "cms-blog",
    name: "CMS Blog",
    summary: "A blogging prototype using Next.js, GraphQL and GraphCMS.",
    stack: ["Next.js", "GraphQL", "GraphCMS", "TypeScript"],
    image: `${blob}/blog-4Kl5pfuF3VXL2p19Lq6WvJAVj2kcyu.png`,
    links: {
      live: "https://cms-blog-seven.vercel.app",
      code: "https://github.com/AashishSinghal/cms_blog",
    },
  },
  {
    slug: "github-user-search",
    name: "GitHub User Search",
    summary: "Search any GitHub user and see their profile and repositories as charts.",
    stack: ["React", "FusionCharts", "GitHub API"],
    image: `${blob}/searchUser-Um4Slf8iAccPOF49Jk6iunnR74lKkr.png`,
    links: {
      live: "https://githubusersearch-app.netlify.app",
      code: "https://github.com/AashishSinghal/search-users",
    },
  },
  {
    slug: "file-encryptor",
    name: "File Encryptor",
    summary: "A desktop app that encrypts and decrypts files with AES.",
    stack: ["Electron", "React", "JavaScript"],
    image: `${blob}/fileEncryptor-3dkRFqpqBxKse9LejFm7ufZstTA2xg.png`,
    links: {
      live: "https://drive.google.com/file/d/1gwp8YrGQ85HXnRWJfP1RHAGB7qmzmyXT/view?usp=sharing",
      code: "https://github.com/AashishSinghal/file-encryptor",
    },
  },
  {
    slug: "screen-recorder",
    name: "Screen Recorder",
    summary: "A desktop screen recorder built with Electron and React.",
    stack: ["Electron", "React"],
    image: `${blob}/screen-9E3EymhAAOL19vKNWYHJDwXhYyzFgY.png`,
    links: {
      live: "https://drive.google.com/file/d/1LmrsgOv_B_xUf2GCGE7ZHf6OSDjZzP60/view?usp=sharing",
      code: "https://github.com/AashishSinghal/electron-screen-recorder",
    },
  },
  {
    slug: "expense-tracker",
    name: "Voice Expense Tracker",
    summary: "Add income and expenses by speaking, with charts by category, using Speechly.",
    stack: ["React", "Speechly", "Material UI", "Chart.js"],
    image: `${blob}/Expense-Tracker-lQrtcMYAcarKeOkgI4lPswNUyhioz9.png`,
    links: { code: "https://github.com/AashishSinghal/expense-speech-app" },
  },
  {
    slug: "admin-panel",
    name: "Admin Panel",
    summary: "An upload portal for OTT video content, with the metadata forms that go with it.",
    stack: ["React", "Material UI", "Axios"],
    image: `${blob}/adminPanel-bX4dEKEBcsKr7CfWf39duCuj6k3vbY.png`,
    links: { code: "https://github.com/AashishSinghal/admin-panel" },
  },
  {
    slug: "whatsapp-clone",
    name: "WhatsApp Clone",
    summary: "A WhatsApp Web clone built with React and Material UI.",
    stack: ["React", "Material UI", "Firebase"],
    image: `${blob}/WhatsApp-Clone-5IxHxdm8lnZVawJXx995xSmia0CzqF.png`,
    links: { code: "https://github.com/AashishSinghal/whatsapp-mern" },
  },
  {
    slug: "telegram-clone",
    name: "Telegram Clone",
    summary: "A Telegram Web clone with its core messaging features.",
    stack: ["React", "TypeScript"],
    image: `${blob}/Telegram-Clone-TjMz6fAcxAwhjY7FbuUJNvVD42LwlF.png`,
    links: { code: "https://github.com/AashishSinghal/telegram-clone" },
  },
  {
    slug: "animated-preloader",
    name: "Animated Preloader",
    summary: "A CSS-only animated preloader made during an internship.",
    stack: ["HTML", "CSS"],
    image: `${blob}/preloader-H0EtnnYX6bbeC3NDra5EJ388eK1S67.png`,
    links: {
      live: "https://innofarms-preloader.netlify.app",
      code: "https://github.com/AashishSinghal/Innofarms-Preloader",
    },
  },
  {
    slug: "flappy-bird",
    name: "Flappy Bird",
    summary: "Flappy Bird in vanilla JavaScript.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: `${blob}/FlappyBird-7lFXc5iGfUPhKym0Eu0EwPd4MJoolt.png`,
    links: {
      live: "https://flabby-bird-using-js.netlify.app/",
      code: "https://github.com/AashishSinghal/FlappyBird-in-JS",
    },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const otherProjects = projects.filter((project) => !project.featured)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
