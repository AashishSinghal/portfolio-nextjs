import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <link rel="shortcut icon" href="alarm-clock.png" type="image/x-icon" />
      <meta property="og:title" content="Aashish Singhal - Portfolio" />
      <meta property="og:image" content="/meta-ss.png" />
      <meta property="og:description" content="This is a portfolio website developed by Aashish, to showcase projects, interests etc." />
      <meta property="og:url" content="https://aashishsinghal.com/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#fff" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;600&display=swap" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
