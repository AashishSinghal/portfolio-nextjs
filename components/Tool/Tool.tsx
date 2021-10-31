import * as React from "react";
import { TypeTool } from "../../interfaces";
import styles from "./Tool.module.scss";

const Tool = ({
  imgSrc,
  name,
  imgAlt,
  animationName,
  delay,
  duration,
  hyperlink,
}: TypeTool) => {
  return (
    <div
      // className={styles.tool}
      data-aos={animationName}
      data-aos-duration={`${duration}`}
      data-aos-delay={`${delay}`}
    >
      <a
        href={hyperlink}
        className={styles.tool}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={imgSrc} alt={imgAlt || "tools icon"} />
        <span>{name}</span>
      </a>
    </div>
  );
};

export default Tool;
