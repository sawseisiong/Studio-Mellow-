import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./stylesheets/all.scss";

createRoot(document.getElementById("root")).render(
  //部署搭配 GitHub ，basename 讓所有 router 的頁面可以銜接在/Studio-Mellow-/，正常顯示頁面
  <BrowserRouter basename="/Studio-Mellow-/">
    <App />
  </BrowserRouter>
);
