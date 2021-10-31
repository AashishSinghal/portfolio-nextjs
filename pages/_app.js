import * as React from "react";
import AOS from "aos";
import useDarkMode from "use-dark-mode";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../utils/theme";
import "aos/dist/aos.css";
import "../styles/globals.scss";

const App = ({ Component, pageProps }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const darkMode = useDarkMode(true);
  const theme = darkMode.value ? darkTheme : lightTheme;
  let i = 0;
  React.useEffect(() => {
    AOS.init();
    setIsMounted(true);
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {isMounted && <Component {...pageProps} />}
    </ThemeProvider>
  );
};

export default App;
