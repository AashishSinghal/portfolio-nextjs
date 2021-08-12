import * as React from "react";
import styles from "./Tool.module.scss";

interface IProps {
  name: string;
  imgSrc: string;
  imgAlt?: string;
}

const Tool = (props: IProps) => {
  const { imgSrc, name, imgAlt } = props;
  return (
    <div className={styles.tool}>
      <img src={imgSrc} alt={imgAlt || "tools icon"} />
      <span>{name}</span>
    </div>
  );
};

export default Tool;
