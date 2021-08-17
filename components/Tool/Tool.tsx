import * as React from "react";
import { TypeTool } from "../../interfaces";
import styles from "./Tool.module.scss";

const Tool = ({ imgSrc, name, imgAlt }: TypeTool) => {
  return (
    <div className={styles.tool}>
      <img src={imgSrc} alt={imgAlt || "tools icon"} />
      <span>{name}</span>
    </div>
  );
};

export default Tool;
