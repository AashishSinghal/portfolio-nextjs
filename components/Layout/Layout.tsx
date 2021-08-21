import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.scss";
import { TypeLayout } from "../../interfaces";
import Footer from "../Footer/Footer";

const Layout = ({
  children,
  title = "This is the default title",
}: TypeLayout) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <meta charSet="utf-8" />
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
          crossOrigin="anonymous"
        />
      </Head>
      <Navbar />
      <main>
        {children}
        <Footer />
      </main>
    </div>
  );
};
export default Layout;
