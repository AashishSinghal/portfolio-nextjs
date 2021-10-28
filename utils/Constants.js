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
      imgSrc: "/Assets/SVGs/Tools/html5.svg",
      imgAlt: "HTMl SVG ICON TOOLS",
    },
    {
      name: "CSS",
      imgSrc: "/Assets/SVGs/Tools/css.svg",
      imgAlt: "CSS SVG ICON TOOLS",
    },
    {
      name: "Bootstrap",
      imgSrc: "/Assets/SVGs/Tools/bootstrap.svg",
      imgAlt: "Material-UI SVG ICON TOOLS",
    },
    {
      name: "JavaScript",
      imgSrc: "/Assets/SVGs/Tools/javascript.svg",
      imgAlt: "JavaScript SVG ICON TOOLS",
    },
    {
      name: "React",
      imgSrc: "/Assets/SVGs/Tools/react.svg",
      imgAlt: "React SVG ICON TOOLS",
    },
    {
      name: "Material-UI",
      imgSrc: "/Assets/SVGs/Tools/material-ui.svg",
      imgAlt: "Material-UI SVG ICON TOOLS",
    },
    {
      name: "Next.Js",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "GraphQL    ",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Gatsby",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
  ],
  backEnd: [
    {
      name: "NodeJS",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "SQL",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "MongoDB",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Redis",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
  ],
  general: [
    {
      name: "VS Code",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Git",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Github",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Netlify",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Illustrator",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
    {
      name: "Photoshop",
      imgSrc: "/Assets/SVGs/Tools/nextjs.svg",
      imgAlt: "Next.Js NextJs next SVG ICON TOOLS",
    },
  ],
};

//
// ProjectData Items Constant
//

export const ProjectData = [
  {
    name: "Admin Panel",
    imgUrl: "/Assets/images/portfolio/adminPanel.jpeg",
    imgAlt: "Project Holder",
    description: "",
    demo: "https://pedantic-fermi-a606af.netlify.app/",
    source: "https://github.com/AashishSinghal/admin-panel",
    tags: [
      { name: "React", url: "" },
      { name: "Foms", url: "" },
      { name: "axios", url: "" },
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
];
