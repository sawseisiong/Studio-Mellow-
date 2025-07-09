
import { createRoot } from "react-dom/client"
import {  BrowserRouter  } from "react-router-dom"

import App from "./App.jsx"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./stylesheets/all.scss"


createRoot(document.getElementById("root")).render(

    < BrowserRouter basename="/Studio-Mellow-/">
    <App />
    </ BrowserRouter >

)
