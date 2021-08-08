import * as React from "react";
import $ from "jquery";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Build, Home, Info, Storage } from "@material-ui/icons";
import Socials from "../Socials/Socials";

const Navbar = () => {
  // React.useEffect(() => {
  //   $(window).on('load', function(){
  //     alert("JQuery is Working")
  //   } )
  // }, []);

  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">
          <div className={styles.logo}>
            <img
              src="/Assets/images/profile_pic2.jpg"
              className={styles.profile_pic}
            />
            Aashish Singhal
          </div>
        </Link>
        <Link href="/">
          <div className={`${styles.home} ${styles.navitem}`}>
            <Home fontSize="inherit" />
            <span>Home</span>
          </div>
        </Link>
        <Link href="/Work">
          <div className={`${styles.work} ${styles.navitem}`}>
            <Storage fontSize="inherit" />
            <span>Work</span>
          </div>
        </Link>
        <Link href="/Tools">
          <div className={`${styles.tools} ${styles.navitem}`}>
            <Build fontSize="inherit" />
            <span>Tools</span>
          </div>
        </Link>
        <Link href="/About">
          <div className={`${styles.about} ${styles.navitem}`}>
            <Info fontSize="inherit" />
            <span>About</span>
          </div>
        </Link>
        <div className={`${styles.socials}`}>
          <Socials />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
