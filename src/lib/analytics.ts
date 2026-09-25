declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

// Injects the gtag.js snippet; a no-op when no measurement ID is configured
export function loadGoogleAnalytics(measurementId?: string) {
  if (!measurementId) return

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag expects the raw `arguments` object, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", measurementId)
}
