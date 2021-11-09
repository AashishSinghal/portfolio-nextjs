import AOS from "aos";

export function RefreshAOS() {
  setTimeout(() => {
    AOS.refresh();
    console.log("AOS Refreshed");
  }, 500);
  let scrollRef = 0;

  window.addEventListener("scroll", function () {
    // increase value up to 10, then refresh AOS
    console.log("AOS Refreshed ScrollRef");
    scrollRef <= 10 ? scrollRef++ : AOS.refresh();
  });
}

//
// NavBar Items Constant
//

export const NavBarConstants = {
  activeNavItem: {
    id: 1,
    to: "/",
    style: "styles.home",
    icon: <i className="fi-rr-home"></i>,
    span: "Home",
  },
  navItemsArray: [
    {
      id: 1,
      to: "/",
      style: "styles.home",
      icon: <i className="fi-rr-home"></i>,
      span: "Home",
    },
    {
      id: 2,
      to: "/Work",
      style: "styles.work",
      icon: <i className="fi-rr-database"></i>,
      span: "Work",
    },
    {
      id: 3,
      to: "/Tools",
      style: "styles.tools",
      icon: <i className="fi-rr-magic-wand"></i>,
      span: "Tools",
    },
    {
      id: 4,
      to: "/About",
      style: "styles.about",
      icon: <i className="fi-rr-form"></i>,
      span: "About",
    },
  ],
};

//
// ToolsData Items Constant
//

export const ToolsData = {
  frontEnd: [
    {
      name: "HTML",
      imgSrc: "/Assets/images/tech/html5.png",
      imgAlt: "HTMl SVG ICON TOOLS",
      hyperlink: "https://www.w3schools.com/html/",
    },
    {
      name: "CSS",
      imgSrc: "/Assets/images/tech/css3.png",
      imgAlt: "CSS SVG ICON TOOLS",
      hyperlink: "https://www.w3schools.com/css/",
    },
    {
      name: "Bootstrap",
      imgSrc: "/Assets/images/tech/bootstrap.png",
      imgAlt: "Material-UI SVG ICON TOOLS",
      hyperlink: "https://getbootstrap.com/",
    },
    {
      name: "JavaScript",
      imgSrc: "/Assets/images/tech/js.png",
      imgAlt: "JavaScript SVG ICON TOOLS",
      hyperlink: "https://www.w3schools.com/js/",
    },
    {
      name: "React",
      imgSrc: "/Assets/images/tech/react.png",
      imgAlt: "React SVG ICON TOOLS",
      hyperlink: "https://reactjs.org/",
    },
    {
      name: "Material-UI",
      imgSrc: "/Assets/images/tech/mui.png",
      imgAlt: "Material-UI SVG ICON TOOLS",
      hyperlink: "https://mui.com/",
    },
    {
      name: "Next.Js",
      imgSrc: "/Assets/images/tech/nextjs.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "https://nextjs.org/",
    },
    {
      name: "GraphQL",
      imgSrc: "/Assets/images/tech/graphql.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "https://graphql.org/",
    },
    {
      name: "Tailwind CSS",
      imgSrc: "/Assets/images/tech/tailwind.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "https://tailwindcss.com/",
    },
  ],
  backEnd: [
    {
      name: "NodeJS",
      imgSrc: "/Assets/images/tech/node.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "https://nodejs.org/",
    },
    {
      name: "ExpressJS",
      imgSrc: "/Assets/images/tech/express.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "https://expressjs.com/",
    },
    {
      name: "SQL",
      imgSrc: "/Assets/images/tech/mysql.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "https://www.w3schools.com/sql/",
    },
    {
      name: "MongoDB",
      imgSrc: "/Assets/images/tech/mongodb.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "#",
    },
    {
      name: "PostgresSQL",
      imgSrc: "/Assets/images/tech/postgresql.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "#",
    },
  ],
  general: [
    {
      name: "VS Code",
      imgSrc: "/Assets/images/tech/vs-code.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "#",
    },
    {
      name: "Git",
      imgSrc: "/Assets/images/tech/git.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "#",
    },
    {
      name: "Github",
      imgSrc: "/Assets/images/tech/github.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "#",
    },
    {
      name: "Netlify",
      imgSrc: "/Assets/images/tech/netlify.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "#",
    },
    {
      name: "Illustrator",
      imgSrc: "/Assets/images/tech/illustrator.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "#",
    },
    {
      name: "Photoshop",
      imgSrc: "/Assets/images/tech/photoshop.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
      hyperlink: "#",
    },
  ],
};

//
// ProjectData Items Constant
//

export const ProjectData = [
  {
    name: "CryptoWatch - App",
    imgUrl: "/Assets/images/portfolio/cryptoApp.jpeg",
    imgAlt: "Project Holder",
    description:
      "A Cryptocurrency Watching app which is made using React and Redux-toolkit with Rapid API & ANT-Design.",
    demo: "https://crypto-app-via-rapid-api.netlify.app/",
    source: "https://github.com/AashishSinghal/crypto-app",
    tags: [
      { name: "React & TS", url: "" },
      { name: "Redux-Toolkit", url: "" },
    ],
  },
  {
    name: "Blog Website (Test POC)",
    imgUrl: "/Assets/images/portfolio/blog.jpeg",
    imgAlt: "Project Holder",
    description:
      "A Next.JS, Tailwind, TypeScript GraphQL and GraphCMS based Blogging application prototype POC, which i will modify thorougly and further add into my NextJS Portfolio website..",
    demo: "https://cms-blog-seven.vercel.app/",
    source: "https://github.com/AashishSinghal/cms_blog",
    tags: [
      { name: "NextJS-TypeScript", url: "" },
      { name: "TailwindCSS", url: "" },
    ],
  },
  {
    name: "Dev Resources",
    imgUrl: "/Assets/images/portfolio/devResources.jpeg",
    imgAlt: "Project Holder",
    description:
      "A simple Portal for managing my dev resources and sharing with my team and other people. The backend is currently in progress so the data is static.",
    demo: "https://dev-resources-via-bookmarks.netlify.app/",
    source: "https://github.com/AashishSinghal/dev-resources",
    tags: [
      { name: "React & TS", url: "" },
      { name: "JSON DB", url: "" },
      { name: "Axios", url: "" },
    ],
  },
  {
    name: "Admin Panel",
    imgUrl: "/Assets/images/portfolio/adminPanel.jpeg",
    imgAlt: "Project Holder",
    description:
      "A Admin panel to upload OTT videos to their server with the video Meta Data from the Complex Forms. ",
    demo: "https://admin-panel-ott.netlify.app/",
    source: "https://github.com/AashishSinghal/admin-panel",
    tags: [
      { name: "React", url: "" },
      { name: "Foms", url: "" },
      { name: "Axios", url: "" },
    ],
  },
  {
    name: "Github User Search",
    imgUrl: "/Assets/images/portfolio/searchUser.jpeg",
    imgAlt: "Project Holder",
    description:
      "A Github User Search portal made with React, Fusion Charts, Github API to let user a more descriptive view of a Github Profile.",
    demo: "https://githubusersearch-app.netlify.app/",
    source: "https://github.com/AashishSinghal/search-users",
    tags: [
      { name: "React", url: "" },
      { name: "Auth0", url: "" },
      { name: "CSS", url: "" },
    ],
  },
  {
    name: "Screen Recorder - ElectronJS",
    imgUrl: "/Assets/images/portfolio/screen.jpeg",
    imgAlt: "Project Holder",
    description:
      "A ElectronJS, Desktop app for Screen recording. You can test it out by downloading the executable fro demo link.",
    demo: "https://drive.google.com/file/d/1LmrsgOv_B_xUf2GCGE7ZHf6OSDjZzP60/view?usp=sharing",
    source: "https://github.com/AashishSinghal/electron-screen-recorder",
    tags: [
      { name: "HTML", url: "" },
      { name: "JS", url: "" },
      { name: "ElectronJS", url: "" },
    ],
  },
  {
    name: "File Encryptor - ElectronJS",
    imgUrl: "/Assets/images/portfolio/fileEncryptor.jpeg",
    imgAlt: "Project Holder",
    description:
      "A ElectronJS, Desktop app for File Encryption Using AES Encryption. You can test it out by downloading the executable fro demo link.",
    demo: "https://drive.google.com/file/d/1gwp8YrGQ85HXnRWJfP1RHAGB7qmzmyXT/view?usp=sharing",
    source: "https://github.com/AashishSinghal/file-encryptor",
    tags: [
      { name: "AES", url: "" },
      { name: "JS", url: "" },
      { name: "ElectronJS", url: "" },
    ],
  },
  {
    name: "Animated Preloader",
    imgUrl: "/Assets/images/portfolio/preloader.jpeg",
    imgAlt: "Project Holder",
    description:
      "A CSS only Animated Preloader for the Company app where i did a small internship.",
    demo: "https://innofarms-preloader.netlify.app",
    source: "https://github.com/AashishSinghal/Innofarms-Preloader",
    tags: [
      { name: "HTML", url: "" },
      { name: "CSS", url: "" },
      // { name: "CSS", url: "" },
    ],
  },
  {
    name: "Flappy Bird Game",
    imgUrl: "/Assets/images/portfolio/FlappyBird.png",
    imgAlt: "Project Holder",
    description: "Flppy Bird game on web using Vanilla JavaScript.",
    demo: "https://flabby-bird-using-js.netlify.app/",
    source: "https://github.com/AashishSinghal/FlappyBird-in-JS",
    tags: [
      { name: "HTML", url: "" },
      { name: "CSS", url: "" },
      { name: "JS", url: "" },
    ],
  },
  // {
  //   name: "Animated Preloader",
  //   imgUrl: "/Assets/images/portfolio/preloader.jpeg",
  //   imgAlt: "Project Holder",
  //   description:
  //     "A CSS only Animated Preloader for the Company app where i did a small internship.",
  //   demo: "https://innofarms-preloader.netlify.app",
  //   source: "https://github.com/AashishSinghal/Innofarms-Preloader",
  //   tags: [
  //     { name: "HTML", url: "" },
  //     { name: "CSS", url: "" },
  //     // { name: "CSS", url: "" },
  //   ],
  // },
  // {
  //   name: "Project Name",
  //   imgUrl: "/Assets/images/holder.png",
  //   imgAlt: "Project Holder",
  //   description:
  //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates non ducimus architecto ullam id ex?",
  //   demo: "",
  //   source: "",
  //   tags: [
  //     { name: "HTML", url: "" },
  //     { name: "JS", url: "" },
  //     { name: "CSS", url: "" },
  //   ],
  // },
];

//
//Work Experience Constants
//

export const WorkExpData = [
  {
    title: "Work Item Heading",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque minus quidem saepe repellat rerum optio obcaecati! Repudiandae, vero numquam neque eius ea reprehenderit quod! Nam.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nulla modi odit. Tempore, assumenda quas totam hic velit numquam culpa sequi, obcaecati dicta, excepturi vero accusantium veniam placeat ea impedit ullam laudantium a earum molestiae tenetur provident eos? Ullam asperiores error sunt reiciendis, recusandae harum. Corporis nam tenetur hic minima!",
    timePeriod: "Time Period",
    location: "Location",
    projects: [
      {
        title: "Project title 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit ea unde excepturi est reprehenderit!",
        tech: "React, Redux, TypeScript",
      },
      {
        title: "Project title 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit ea unde excepturi est reprehenderit!",
        tech: "React, Redux, TypeScript",
      },
      {
        title: "Project title 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit ea unde excepturi est reprehenderit!",
        tech: "React, Redux, TypeScript",
      },
    ],
  },
  {
    title: "Work Item Heading",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque minus quidem saepe repellat rerum optio obcaecati! Repudiandae, vero numquam neque eius ea reprehenderit quod! Nam.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nulla modi odit. Tempore, assumenda quas totam hic velit numquam culpa sequi, obcaecati dicta, excepturi vero accusantium veniam placeat ea impedit ullam laudantium a earum molestiae tenetur provident eos? Ullam asperiores error sunt reiciendis, recusandae harum. Corporis nam tenetur hic minima!",
    timePeriod: "Time Period",
    location: "Location",
    projects: [
      {
        title: "Project title 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit ea unde excepturi est reprehenderit!",
        tech: "React, Redux, TypeScript",
      },
      {
        title: "Project title 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit ea unde excepturi est reprehenderit!",
        tech: "React, Redux, TypeScript",
      },
      {
        title: "Project title 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit ea unde excepturi est reprehenderit!",
        tech: "React, Redux, TypeScript",
      },
    ],
  },
  {
    title: "Work Item Heading",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque minus quidem saepe repellat rerum optio obcaecati! Repudiandae, vero numquam neque eius ea reprehenderit quod! Nam.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nulla modi odit. Tempore, assumenda quas totam hic velit numquam culpa sequi, obcaecati dicta, excepturi vero accusantium veniam placeat ea impedit ullam laudantium a earum molestiae tenetur provident eos? Ullam asperiores error sunt reiciendis, recusandae harum. Corporis nam tenetur hic minima!",
    timePeriod: "Time Period",
    location: "Location",
    projects: [
      {
        title: "Project title 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit ea unde excepturi est reprehenderit!",
        tech: "React, Redux, TypeScript",
      },
      {
        title: "Project title 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit ea unde excepturi est reprehenderit!",
        tech: "React, Redux, TypeScript",
      },
      {
        title: "Project title 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit ea unde excepturi est reprehenderit!",
        tech: "React, Redux, TypeScript",
      },
    ],
  },
];
