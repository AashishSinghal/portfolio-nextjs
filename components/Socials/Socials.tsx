import {
  GitHub,
  Instagram,
  LinkedIn,
  Mail,
  WhatsApp,
} from "@material-ui/icons";
import * as React from "react";
import styles from "./Socials.module.scss";

const Socials = () => {
  return (
    <>
      <div className={styles.socials}>
        <LinkedIn />
        <GitHub />
        <Instagram />
        <a href="https://wa.me/919672080577" target="_blank">
          <WhatsApp />
        </a>
        <a href="mailto:aashish451singhal@gmail.com">
          <Mail />
        </a>
      </div>
      <span className={styles.copyright}>&copy; 2020 AS</span>
    </>
  );
};

export default Socials;
