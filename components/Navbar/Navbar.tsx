import * as React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { RiHome6Line, RiInformationLine } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";
import { VscTools } from "react-icons/vsc";
import { Build, Home, Info, Storage } from "@mui/icons-material";
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
  // function getIcon(name: any) {
  //   return <name />;
  // }
  const icons = [
    <RiHome6Line />,
    <MdOutlineWorkOutline />,
    <VscTools />,
    <RiInformationLine />,
  ];

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
              {icons[i]}
              <span>{nav.span}</span>
            </div>
          </Link>
        ))}

        {/* <Link href="#">
          <div className={`${styles.home} ${styles.navitem}`}>
            <RiHome6Line />
            <span>Work</span>
          </div>
        </Link> */}

        <div className={`${styles.socials}`}>
          <Socials />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
