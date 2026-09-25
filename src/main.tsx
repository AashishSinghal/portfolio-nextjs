import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./app"
import { loadGoogleAnalytics } from "./lib/analytics"
import "./styles/globals.css"

loadGoogleAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
