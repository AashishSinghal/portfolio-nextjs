import * as React from "react";
import styles from "./About.module.scss";
import Layout from "../../components/Layout/Layout";

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <section className={styles.about}>
      <h1 data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1000">
        More about me...
      </h1>
    </section>
  </Layout>
);

export default AboutPage;
