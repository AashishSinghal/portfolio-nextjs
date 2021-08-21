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
}: TypeTool) => {
  return (
    <div
      className={styles.tool}
      data-aos={animationName}
      data-aos-duration={`${duration}`}
      data-aos-delay={`${delay}`}
    >
      <img src={imgSrc} alt={imgAlt || "tools icon"} />
      <span>{name}</span>
    </div>
  );
};

export default Tool;
