import * as React from "react";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import styles from "./Tools.module.scss";
import Tool from "../../components/Tool/Tool";
import { ToolsData } from "../../utils/Constants";
import AOS from "aos";
import $ from "jquery";

const ToolsPage = () => {
  return (
    <Layout title="Tools | Aashish - Portfolio">
      <section className={styles.tools} id="tools">
        <h1 data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1000">
          This is my Arsenal...
        </h1>
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-duration="1000"
          className={styles.frontend}
        >
          <h2 data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">
            Front-End
          </h2>
          <div className={styles.tools__container}>
            {ToolsData.frontEnd.map((tool, i) => {
              return (
                <Tool
                  key={i}
                  animationName="fade-up"
                  delay={500 + i * 100}
                  duration="1000"
                  name={tool.name}
                  imgSrc="/Assets/SVGs/Tools/html5.svg"
                  imgAlt={tool.imgAlt}
                />
              );
            })}
          </div>
          <h2 data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">
            Back-End
          </h2>
          <div className={styles.tools__container}>
            {ToolsData.backEnd.map((tool, i) => {
              if (i <= 5) {
                return (
                  <Tool
                    key={i}
                    animationName="fade-up"
                    delay={1300 + i * 100}
                    duration="1000"
                    name={tool.name}
                    imgSrc="/Assets/SVGs/Tools/html5.svg"
                    imgAlt={tool.imgAlt}
                  />
                );
              }
            })}
          </div>
          <h2 data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">
            General
          </h2>
          <div className={styles.tools__container}>
            {ToolsData.general.map((tool, i) => {
              if (i <= 4) {
                return (
                  <Tool
                    key={i}
                    animationName="fade-up"
                    delay={1300 + i * 100}
                    duration="1000"
                    name={tool.name}
                    imgSrc="/Assets/SVGs/Tools/html5.svg"
                    imgAlt={tool.imgAlt}
                  />
                );
              }
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
