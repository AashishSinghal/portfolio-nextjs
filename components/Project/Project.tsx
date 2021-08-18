import * as React from "react";
import styles from "./Project.module.scss";
import { TypeProject } from "../../interfaces";
import Link from "next/link";

const Project = ({ animationName, delay, duration }: TypeProject) => {
  return (
    <div
      className={styles.project}
      data-aos={animationName}
      data-aos-duration={`${duration}`}
      data-aos-delay={`${delay}`}
    >
      <p>Project Name</p>
      <img src="/Assets/images/holder.png" alt="Project Holder" />
      {/* <br /> */}
      <div className={styles.metaData}>
        <div className={styles.details}>
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
          <Link href="#">
            <button>
              Demo<i className="fi-rr-arrow-small-right"></i>
            </button>
          </Link>
          <button>
            Source<i className="fi-rr-arrow-small-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
