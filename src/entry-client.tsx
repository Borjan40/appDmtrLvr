import React from "react";
import ReactDOM from "react-dom/client";
import createApp from "./app";
import { BrowserRouter } from "react-router-dom";

(async function () {
  const { app } = await createApp();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <BrowserRouter>{app}</BrowserRouter>
    // </React.StrictMode>
  );
})();

import "bootstrap/dist/css/bootstrap.min.css";
