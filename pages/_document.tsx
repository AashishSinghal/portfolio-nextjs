import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="alarm-clock.png" type="image/x-icon" />
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
