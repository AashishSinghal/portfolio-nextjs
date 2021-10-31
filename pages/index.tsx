import * as React from "react";
import Layout from "../components/Layout/Layout";
import styles from "./Home.module.scss";
// import ArrowSVG from "../public/Assets/SVGs/arrow.svg";

const IndexPage = () => (
  <Layout title="Aashish | Developer | Designer | Explorer">
    <div
      data-aos="flip-left"
      data-aos-duration="1000"
      data-aos-delay="3000"
      className={styles.indicator}
    >
      {/* <ArrowSVG /> */}
      <p>
        this is me
        <br />
        btw...!
      </p>
    </div>
    <section className={styles.home} id="home">
      <img
        data-aos="fade-down"
        data-aos-duration="300"
        data-aos-delay="100"
        src="/Assets/images/profile_pic3.jpg"
        className={styles.profile_pic}
      />
      <h1 data-aos="zoom-in" data-aos-delay="100" data-aos-duration="300">
        Hi, I'm Aashish Singhal
      </h1>
      <h2 data-aos="fade-up" data-aos-delay="300" data-aos-duration="500">
        I'm a<span> Full-Stack Developer</span> & <span>UI Designer</span>,
        constanly working and learning new technologies to stay with the trend.
        I'm open to <span>Freelance</span> or
        <span> Job Opportunities.</span>
      </h2>
    </section>
  </Layout>
);

export default IndexPage;
