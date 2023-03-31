import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App"

function start() {
    const container = document.getElementById("app")
    if (!container) throw Error("Missing element with id #app!")
    createRoot(container).render(<App />)

    const splash = document.getElementById("splash")
    if (splash) {
        splash.parentNode?.removeChild(splash)
    }
}

start()
