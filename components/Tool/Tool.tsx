import * as React from "react";
import { TypeTool } from "../../interfaces";
import styles from "./Tool.module.scss";
import Image from "next/image";

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
        {/* <Image src={imgSrc} alt={imgAlt || "tools icon"} width={70} height={70}/> */}
        <span>{name}</span>
      </a>
    </div>
  );
};

export default Tool;
