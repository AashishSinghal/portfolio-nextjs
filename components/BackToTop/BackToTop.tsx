import { ArrowUpward } from "@material-ui/icons";
import * as React from "react";
import styles from "./BackToTop.module.scss";

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    console.log("Scrolling to Top !");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      //   Not using Auto since it is Abrupt
    });
  };

  window.addEventListener("scroll", toggleVisible);
  if (visible) {
    return (
      <div
        className={styles.backtotop}
        onClick={scrollToTop}
        data-aos="zoom-in"
        data-aos-delay="100"
        data-aos-duration="300"
      >
        <button>
          <ArrowUpward />
        </button>
      </div>
    );
  }
  return null;
};

export default BackToTop;
