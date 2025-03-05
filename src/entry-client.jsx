import React from "react";
import ReactDOM from "react-dom/client";
import createApp from "./app";

(async function () {
  const app = await createApp();

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>{app}</React.StrictMode>
  );
})();
