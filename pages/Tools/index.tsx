import * as React from "react";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import styles from "./Tools.module.scss";
import Tool from "../../components/Tool/Tool";
import { ToolsData } from "../../utils/Constants";

const ToolsPage = () => {
  return (
    <Layout title="Tools | Aashish - Portfolio">
      <section className={styles.tools} id="tools">
        <h1 data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1000">
          This is my Arsenal...
        </h1>
        <div className={styles.frontend}>
          <h3 data-aos="fade-up" data-aos-delay="1300" data-aos-duration="3000">
            Front-End
          </h3>
          <div className={styles.tools__container}>
            {ToolsData.frontEnd.map((tool, i) => {
              return (
                <Tool
                  key={i}
                  name={tool.name}
                  imgSrc="/Assets/SVGs/Tools/html5.svg"
                  imgAlt={tool.imgAlt}
                />
              );
            })}
          </div>
          <br />
          <h3>Back-End</h3>
          <div className={styles.tools__container}>
            {ToolsData.backEnd.map((tool, i) => {
              if (i <= 5) {
                return (
                  <Tool
                    key={i}
                    name={tool.name}
                    imgSrc="/Assets/SVGs/Tools/html5.svg"
                    imgAlt={tool.imgAlt}
                  />
                );
              }
            })}
          </div>
          <br />
          <h3>General</h3>
          <div className={styles.tools__container}>
            {ToolsData.general.map((tool, i) => {
              if (i <= 4) {
                return (
                  <Tool
                    key={i}
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
