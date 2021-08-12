import * as React from "react";
import $ from "jquery";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Build, Home, Info, Storage } from "@material-ui/icons";
import Socials from "../Socials/Socials";
import { NavBarConstants } from "../../utils/Constants";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const [navState, changeNavState] = React.useState(NavBarConstants);
  function toggleActiveStyle(index) {
    if (router.asPath === index) {
      return styles.active;
    } else {
      return "null";
    }
  }

  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">
          <div className={styles.logo}>
            <div className={styles.profile_pic}>
              <img src="/Assets/images/profile_pic3.jpg" />
            </div>
            Aashish Singhal
          </div>
        </Link>

        {navState.navItemsArray.map((nav, i) => (
          <Link key={i} href={nav.to}>
            <div
              className={`${nav.style} ${styles.navitem} ${toggleActiveStyle(
                nav.to
              )}`}
            >
              {/* <Home fontSize="inherit" /> */}
              {nav.icon}
              <span>{nav.span}</span>
            </div>
          </Link>
        ))}

        <div className={`${styles.socials}`}>
          <Socials />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
