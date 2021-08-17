import * as React from "react";
import styles from "./Project.module.scss";

const Project = () => {
  return (
    <div className={styles.project}>
      <img src="/Assets/images/holder.png" alt="Project Holder" />
      <br />
      <div className={styles.metaData}>
        <div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
            voluptatum vero facere nihil ducimus unde!
          </p>
          <div className={styles.tag}></div>
        </div>
        <div className={styles.cta}></div>
      </div>
    </div>
  );
};

export default Project;
