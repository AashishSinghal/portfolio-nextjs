import * as React from "react";
import styles from "./Project.module.scss";
import { TypeProject } from "../../interfaces";
import Link from "next/link";

const Project = ({
  animationName,
  delay,
  duration,
  demoUrl,
  description,
  imgAlt,
  imgUrl,
  projectName,
  sourceUrl,
  tags,
}: TypeProject) => {
  return (
    <div
      className={styles.project}
      data-aos={animationName}
      data-aos-duration={`${duration}`}
      data-aos-delay={`${delay}`}
    >
      <p>{projectName}</p>
      <img src={imgUrl} alt={imgAlt} />
      <div className={styles.metaData}>
        <div className={styles.details}>
          <span>{description}</span>
          <div className={styles.tag}>
            {tags.map((item, i) => (
              <Link key={i} href={item.url}>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.cta}>
          <Link href={demoUrl}>
            <button>
              Demo<i className="fi-rr-arrow-small-right"></i>
            </button>
          </Link>
          <Link href={sourceUrl}>
            <button>
              Source<i className="fi-rr-arrow-small-right"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Project;
