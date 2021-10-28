import * as React from "react";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import styles from "./works.module.scss";
import Project from "../../components/Project/Project";
import { ProjectData } from "../../utils/Constants";

const WorkPage = () => {
  let i = 10;
  return (
    <Layout title="Work | Aashish - Portfolio">
      <section className={styles.work}>
        <h1 data-aos="zoom-in" data-aos-delay="100" data-aos-duration="300">
          Things i have built...
        </h1>
        <div className={styles.worklist}>
          {ProjectData.map((item, i) => (
            <Project
              key={i}
              animationName="fade-up"
              delay={300}
              duration="500"
              projectName={item.name}
              demoUrl={item.demo}
              sourceUrl={item.source}
              description={item.description}
              imgUrl={item.imgUrl}
              imgAlt={item.imgAlt}
              tags={item.tags}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default WorkPage;
