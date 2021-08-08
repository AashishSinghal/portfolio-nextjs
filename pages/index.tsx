import Link from "next/link";
import Layout from "../components/Layout/Layout";
import styles from "./Home.module.scss";

const IndexPage = () => (
  <Layout title="Aashish Singhal | Home">
    <section className={styles.home} id="home">
      <img
        src="/Assets/images/profile_pic2.jpg"
        className={styles.profile_pic}
      />
      <h1>Hi, I'm Aashish Singhal</h1>
      <h2>
        I'm a<span> Full-Stack Developer</span> & <span>UI Designer</span>,
        constanly working and learning new technologies to stay with the trend.
        I'm open to <span>Freelance</span>, <span>Internship </span>
        or
        <span> Job Opportunities.</span>
      </h2>
    </section>
  </Layout>
);

export default IndexPage;
