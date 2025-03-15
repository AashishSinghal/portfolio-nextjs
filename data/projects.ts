import type { Project } from "@/types/sections"

const projectsList: Project[] = [
  {
    id: 10,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aiDetect.png-zU5TcaxBUCAgbHi8zJviaOATHUk60u.jpeg",
    name: "AI Detect",
    summary:
      "An AI platform which can detect what's on the video feed and let's user record video clips or screenshots, made with TensorFlowJS",
    tags: ["tensorflowjs", "ai", "ml", "opensource", "fullstack", "react", "nextjs", "tailwindcss"],
    link: {
      web: "https://ai-detect.aashishsinghal.com",
      github: "https://github.com/AashishSinghal/ai-detect",
    },
  },
  {
    id: 1,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alphaexchange-Q0LS6M1okIgaN6UMan0wcIuUePARY1.png",
    name: "Alpha Exchange - App",
    summary:
      "A Cryptocurrency (Ethereum) Exchange platform which is made using React and Solidity Smart contract using Hardhat with TailwindCSS and Vite.",
    tags: ["opensource", "webdev", "fullstack", "react", "nextjs", "tailwindcss", "web3", "solidity"],
    link: {
      web: "https://alpha-exchange.netlify.app",
      github: "https://github.com/AashishSinghal/alpha_web3.0",
    },
  },
  {
    id: 2,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cryptoApp-fiOBG8FqtE1SLcbbfHYcLq8AhUZs9h.png",
    name: "CryptoWatch - App",
    summary: "A Cryptocurrency Watching app which is made using React and Redux-toolkit with Rapid API & ANT-Design.",
    tags: ["opensource", "react", "typescript", "tailwindcss", "redux-toolkit"],
    link: {
      web: "https://crypto-app-via-rapid-api.netlify.app",
      github: "https://github.com/AashishSinghal/crypto-app",
    },
  },
  {
    id: 3,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog-4Kl5pfuF3VXL2p19Lq6WvJAVj2kcyu.png",
    name: "Blog Website (POC)",
    summary:
      "A Next.JS, Tailwind, TypeScript GraphQL and GraphCMS based Blogging application prototype POC, which i will modify thorougly and further add into my NextJS Portfolio website..",
    tags: ["opensource", "nextjs", "typescript", "tailwindcss", "graph", "cms"],
    link: {
      web: "https://cms-blog-seven.vercel.app",
      github: "https://github.com/AashishSinghal/cms_blog",
    },
  },
  {
    id: 4,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devResources-nCe372TY1dOs7n0VGkDWUTUJgLPmyK.png",
    name: "Dev Resources",
    summary:
      "A Next.JS, Tailwind, TypeScript, Sanity and SanityCMS based Blogging application, which i will modify thorougly and further add into my NextJS Portfolio website..",
    tags: ["opensource", "nextjs", "typescript", "tailwindcss", "sanity", "sanitycms"],
    link: {
      web: "https://taxlawadvisers.vercel.app",
      github: "https://github.com/AashishSinghal/taxlawadvisers",
    },
  },
  {
    id: 5,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Expense-Tracker-lQrtcMYAcarKeOkgI4lPswNUyhioz9.png",
    name: "Expense Tracker",
    summary:
      "A Github User Search portal made with React, Fusion Charts, Github API to let user a more descriptive view of a Github Profile.",
    tags: ["opensource", "webdev", "rapidapi", "react", "tailwindcss"],
    link: {
      web: "https://githubusersearch-app.netlify.app",
      github: "https://github.com/AashishSinghal/search-users",
    },
  },
  {
    id: 6,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fileEncryptor-3dkRFqpqBxKse9LejFm7ufZstTA2xg.png",
    name: "File Encryptor - ElectronJS",
    summary:
      "An ElectronJS, Desktop app for File Encryption Using AES Encryption. You can test it out by downloading the executable fro demo link.",
    tags: ["opensource", "AES", "javascript", "electronjs", "react"],
    link: {
      web: "https://drive.google.com/file/d/1gwp8YrGQ85HXnRWJfP1RHAGB7qmzmyXT/view?usp=sharing",
      github: "https://github.com/AashishSinghal/file-encryptor",
    },
  },
  {
    id: 7,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preloader-H0EtnnYX6bbeC3NDra5EJ388eK1S67.png",
    name: "Animated Preloader",
    summary: "A CSS only Animated Preloader for the Company app where i did a small internship.",
    tags: ["opensource", "animation", "html", "css"],
    link: {
      web: "https://innofarms-preloader.netlify.app",
      github: "https://github.com/AashishSinghal/Innofarms-Preloader",
    },
  },
  {
    id: 8,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adminPanel-bX4dEKEBcsKr7CfWf39duCuj6k3vbY.png",
    name: "Admin Panel",
    summary:
      "A ElectronJS, Desktop app for Screen recording, it uses react as the front-end . You can test it out by downloading the executable fro demo link.",
    tags: ["opensource", "webdev", "electron", "react", "desktop-application"],
    link: {
      web: "https://drive.google.com/file/d/1LmrsgOv_B_xUf2GCGE7ZHf6OSDjZzP60/view?usp=sharing",
      github: "https://github.com/AashishSinghal/electron-screen-recorder",
    },
  },
  {
    id: 9,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FlappyBird-7lFXc5iGfUPhKym0Eu0EwPd4MJoolt.png",
    name: "Flappy Bird Game",
    summary: "Flppy Bird game on web using Vanilla JavaScript.",
    tags: ["opensource", "html", "css", "javascript", "games"],
    link: {
      web: "https://flabby-bird-using-js.netlify.app/",
      github: "https://github.com/AashishSinghal/FlappyBird-in-JS",
    },
  },
  {
    id: 11,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-Clone-5IxHxdm8lnZVawJXx995xSmia0CzqF.png",
    name: "WhatsApp Clone",
    summary:
      "A WhatsApp Web clone built with modern web technologies featuring real-time chat functionality and user authentication.",
    tags: ["react", "firebase", "real-time", "chat", "authentication"],
    link: {
      web: "https://whatsapp-clone.aashishsinghal.com",
      github: "https://github.com/AashishSinghal/whatsapp-clone",
    },
  },
  {
    id: 12,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Telegram-Clone-TjMz6fAcxAwhjY7FbuUJNvVD42LwlF.png",
    name: "Telegram Clone",
    summary: "A Telegram Web clone implementing core messaging features and the iconic Telegram design.",
    tags: ["react", "typescript", "websockets", "ui/ux", "authentication"],
    link: {
      web: "https://telegram-clone.aashishsinghal.com",
      github: "https://github.com/AashishSinghal/telegram-clone",
    },
  },
  {
    id: 13,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/searchUser-Um4Slf8iAccPOF49Jk6iunnR74lKkr.png",
    name: "GitHub User Search",
    summary: "An advanced GitHub user search application with detailed profile analytics and repository insights.",
    tags: ["react", "github-api", "data-visualization", "typescript"],
    link: {
      web: "https://github-user-search.aashishsinghal.com",
      github: "https://github.com/AashishSinghal/github-user-search",
    },
  },
  {
    id: 14,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tla-SHmMtrU5ImkuuhQN0JomnWzdGnhqrR.png",
    name: "TaxLawAdvisers Blog",
    summary: "A professional blog platform for tax law advisers built with modern JAMstack architecture.",
    tags: ["nextjs", "sanity-cms", "typescript", "tailwindcss"],
    link: {
      web: "https://taxlawadvisers.vercel.app",
      github: "https://github.com/AashishSinghal/taxlawadvisers",
    },
  },
  {
    id: 15,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-9E3EymhAAOL19vKNWYHJDwXhYyzFgY.png",
    name: "Screen Recorder",
    summary: "A desktop screen recording application built with Electron and vanilla JavaScript.",
    tags: ["electron", "javascript", "desktop-app", "screen-capture"],
    link: {
      web: "https://drive.google.com/file/d/1LmrsgOv_B_xUf2GCGE7ZHf6OSDjZzP60/view",
      github: "https://github.com/AashishSinghal/screen-recorder",
    },
  },
]

export default projectsList

