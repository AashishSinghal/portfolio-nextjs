import type { Project } from "types/Sections";

const projectsList: Project[] = [
  {
    id: 1,
    image: "/images/projects/alphaexchange.png",
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
    image: "/images/projects/cryptoApp.png",
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
    image: "/images/projects/blog.png",
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
    image: "/images/projects/tla.png",
    name: "TaxLawAdvisers",
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
    image: "/images/projects/searchUser.png",
    name: "Github User Search",
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
    image: "/images/projects/screen.png",
    name: "Screen Recorder - ElectronJS",
    summary:
      "An ElectronJS, Desktop app for Screen recording, it uses react as the front-end . You can test it out by downloading the executable fro demo link.",
    tags: ["opensource", "webdev", "electron", "react", "desktop-application"],
    link: {
      web: "https://drive.google.com/file/d/1LmrsgOv_B_xUf2GCGE7ZHf6OSDjZzP60/view?usp=sharing",
      github: "https://github.com/AashishSinghal/electron-screen-recorder",
    },
  },
  {
    id: 7,
    image: "/images/projects/preloader.png",
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
    image: "/images/projects/fileEncryptor.png",
    name: "File Encryptor - ElectronJS",
    summary:
      "A ElectronJS, Desktop app for File Encryption Using AES Encryption. You can test it out by downloading the executable fro demo link.",
    tags: ["opensource", "AES", "javascript", "electronjs", "react"],
    link: {
      web: "https://drive.google.com/file/d/1gwp8YrGQ85HXnRWJfP1RHAGB7qmzmyXT/view?usp=sharing",
      github: "https://github.com/AashishSinghal/file-encryptor",
    },
  },
  {
    id: 9,
    image: "/images/projects/FlappyBird.png",
    name: "Flappy Bird Game",
    summary:
    "Flppy Bird game on web using Vanilla JavaScript.",
    tags: ["opensource", "html", "css", "javascript", "games"],
    link: {
      web: "https://flabby-bird-using-js.netlify.app/",
      github: "https://github.com/AashishSinghal/FlappyBird-in-JS",
    },
  },
  // {
  //   id: 6,
  //   image: "/images/projects/mutual-fund-calculator.jpg",
  //   name: "Mutual Fund Calculator",
  //   summary:
  //     "A mutual fund investment calculator which allows you to track your SIP and Lumpsum investments and using real historical NAV data from AMFI.",
  //   tags: ["opensource", "fintech", "scraping", "python", "angular"],
  //   link: {
  //     github: "https://github.com/AmruthPillai/MutualFund-Investment-Calculator",
  //   },
  // },
  // {
  //   id: 7,
  //   image: "/images/projects/madrasi-bride.jpg",
  //   name: "Madrasi Bride",
  //   summary:
  //     "A wedding blog/magazine focused on making the bride and groom's day as memorable as possible by sourcing the best of content.",
  //   tags: ["wordpress", "webdev", "php", "mysql", "seo"],
  // },
];

export default projectsList;
