import { Component } from "react";
import PageA from "../pages/A";
import PageB from "../pages/B";

const routes = [
  {
    path: "/",
    Component: PageA,
  },
  {
    path: "/b",
    Component: PageB,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];

export default routes;
