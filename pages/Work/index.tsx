import * as React from "react";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import styles from "./works.module.scss";
import Project from "../../components/Project/Project";

const WorkPage = () => {
  return (
    <Layout title="Work | Aashish - Portfolio">
      <section className={styles.work}>
        <h1>Things i have built...</h1>
        <div>
          <Project />
        </div>
      </section>
    </Layout>
  );
};

export default WorkPage;
