import "animate.css";
import "tippy.js/dist/tippy.css";
import "styles/globals.css";

import Navigation from "components/Navigation";
import NoSSR from "components/NoSSR";
import ThemeProvider from "contexts/ThemeProvider";
import type { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Aashish Singhal - Developer | Designer | Explorer</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:title" content="Aashish Singhal - Portfolio" />
        <meta property="og:image" content="/meta-ss.png" />
        <meta
          property="og:description"
          content="This is a portfolio website developed by Aashish, to showcase projects, interests etc."
        />
        <meta property="og:url" content="https://aashishsinghal.com/" />
      </Head>

      <ThemeProvider>
        <Component {...pageProps} />

        <NoSSR>
          <Navigation />
        </NoSSR>
      </ThemeProvider>
    </>
  );
};

export default App;
