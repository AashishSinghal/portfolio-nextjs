import * as React from "react";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import styles from "./Tools.module.scss";
import Tool from "../../components/Tool/Tool";

const ToolsPage = () => {
  const ToolsData = {
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
    ],
  };

  return (
    <Layout title="Tools | Aashish - Portfolio">
      <section className={styles.tools} id="tools">
        <h1 data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1000">
          This is my Arsenal...
        </h1>
        <div className={styles.frontend}>
          <h3>Front-End</h3>
          <div className={styles.tools__container}>
            {ToolsData.frontEnd.map((tool) => {
              return (
                <Tool
                  name={tool.name}
                  imgSrc="/Assets/SVGs/Tools/html5.svg"
                  imgAlt={tool.imgAlt}
                />
              );
            })}
          </div>
        </div>
        <p>
          <Link href="/">
            <a>Go home</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default ToolsPage;
