import ReactDOM from "react-dom/client";
import createApp from "./app";
import { BrowserRouter } from "react-router-dom";

(async function () {
  try {
    const { app } = await createApp();
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <BrowserRouter>{app}</BrowserRouter>
    );
  } catch (e) {
    document.body.innerHTML = `<div>Site cant work now!</div>`;
  }
})();

import "bootstrap/dist/css/bootstrap.min.css";
