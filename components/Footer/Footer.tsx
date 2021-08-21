import * as React from "react";
import Socials from "../Socials/Socials";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Socials />
      All Rights Reserved.
      <br />
      &copy; 2021 Aashish Singhal
    </div>
  );
};

export default Footer;
