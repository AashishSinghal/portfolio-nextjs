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
    },
    {
      name: "CSS",
      imgSrc: "/Assets/images/tech/css3.png",
      imgAlt: "CSS SVG ICON TOOLS",
    },
    {
      name: "Bootstrap",
      imgSrc: "/Assets/images/tech/bootstrap.png",
      imgAlt: "Material-UI SVG ICON TOOLS",
    },
    {
      name: "JavaScript",
      imgSrc: "/Assets/images/tech/js.png",
      imgAlt: "JavaScript SVG ICON TOOLS",
    },
    {
      name: "React",
      imgSrc: "/Assets/images/tech/react.png",
      imgAlt: "React SVG ICON TOOLS",
    },
    {
      name: "Material-UI",
      imgSrc: "/Assets/images/tech/mui.png",
      imgAlt: "Material-UI SVG ICON TOOLS",
    },
    {
      name: "Next.Js",
      imgSrc: "/Assets/images/tech/nextjs.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "GraphQL",
      imgSrc: "/Assets/images/tech/graphql.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Tailwind CSS",
      imgSrc: "/Assets/images/tech/tailwind.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
  ],
  backEnd: [
    {
      name: "NodeJS",
      imgSrc: "/Assets/images/tech/node.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "ExpressJS",
      imgSrc: "/Assets/images/tech/express.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "SQL",
      imgSrc: "/Assets/images/tech/mysql.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "MongoDB",
      imgSrc: "/Assets/images/tech/mongodb.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "PostgresSQL",
      imgSrc: "/Assets/images/tech/postgresql.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
  ],
  general: [
    {
      name: "VS Code",
      imgSrc: "/Assets/images/tech/vs-code.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Git",
      imgSrc: "/Assets/images/tech/git.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Github",
      imgSrc: "/Assets/images/tech/github.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Netlify",
      imgSrc: "/Assets/images/tech/netlify.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Illustrator",
      imgSrc: "/Assets/images/tech/illustrator.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Photoshop",
      imgSrc: "/Assets/images/tech/photoshop.png",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
  ],
};

//
// ProjectData Items Constant
//

export const ProjectData = [
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
    name: "Project Name",
    imgUrl: "/Assets/images/holder.png",
    imgAlt: "Project Holder",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates non ducimus architecto ullam id ex?",
    demo: "",
    source: "",
    tags: [
      { name: "HTML", url: "" },
      { name: "JS", url: "" },
      { name: "CSS", url: "" },
    ],
  },
  {
    name: "Project Name",
    imgUrl: "/Assets/images/holder.png",
    imgAlt: "Project Holder",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates non ducimus architecto ullam id ex?",
    demo: "",
    source: "",
    tags: [
      { name: "HTML", url: "" },
      { name: "JS", url: "" },
      { name: "CSS", url: "" },
    ],
  },
  {
    name: "Project Name",
    imgUrl: "/Assets/images/holder.png",
    imgAlt: "Project Holder",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates non ducimus architecto ullam id ex?",
    demo: "",
    source: "",
    tags: [
      { name: "HTML", url: "" },
      { name: "JS", url: "" },
      { name: "CSS", url: "" },
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
];
