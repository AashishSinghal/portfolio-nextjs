import * as React from "react";
import styles from "./Project.module.scss";

const Project = () => {
  return (
    <div className={styles.project}>
      <img src="/Assets/images/holder.png" alt="Project Holder" />
      {/* <br /> */}
      <div className={styles.metaData}>
        <div>
          <span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
            voluptatum vero facere nihil ducimus unde!
          </span>
          <div className={styles.tag}>
            <span>HTML</span>
            <span>JS</span>
            <span>CSS</span>
          </div>
        </div>
        <div className={styles.cta}>
          <button>Demo</button>
          <button>Source</button>
        </div>
      </div>
    </div>
  );
};

export default Project;
