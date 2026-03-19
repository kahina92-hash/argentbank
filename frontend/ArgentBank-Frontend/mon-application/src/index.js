import React from "react"
import ReactDOM from "react-dom/client"
import "./style/main.scss"
import App from "./App"
import { Provider } from "react-redux"
import store from "./utils/store"
import Modal from "react-modal"

// Set the root element of the application for accessibility
Modal.setAppElement("#root")

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>
)
