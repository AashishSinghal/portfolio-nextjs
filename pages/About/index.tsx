import * as React from "react";
import styles from "./About.module.scss";
import Layout from "../../components/Layout/Layout";

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <section className={styles.about}>
      <h1 className="pageHeading" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1000">
        More about me...
      </h1>
      <h2 data-aos="fade-up" data-aos-delay="1300" data-aos-duration="3000">
        I leverage my Designing Skills and make Web Designs and Bring them to
        life on the Web with the use of popular frameworks. I intend to succeed
        in a challenging environment that gives a scope of enhancement to my
        technical and management skills and make the best use of them in the
        growth of the organization, I am always eager to learn new things & work
        on exciting projects.
      </h2>
    </section>
  </Layout>
);

export default AboutPage;
