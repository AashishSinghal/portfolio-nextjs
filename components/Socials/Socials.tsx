import {
  GitHub,
  Instagram,
  LinkedIn,
  Mail,
  WhatsApp,
} from "@mui/icons-material";
import * as React from "react";
import styles from "./Socials.module.scss";

const Socials = () => {
  return (
    <>
      <div className={styles.socials}>
        <a href="https://www.linkedin.com/in/iamaashish5/" target="_blank">
          <LinkedIn />
        </a>
        <a href="https://github.com/AashishSinghal" target="_blank">
          <GitHub />
        </a>
        <a href="https://www.instagram.com/karmabeliever.o_o/" target="_blank">
          <Instagram />
        </a>
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
