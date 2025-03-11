import { Component } from "react";
import observerProducts from "../pages/Products";
import ProductItem from "../pages/ProductItem";

const routes = [
  {
    path: "/",
    Component: observerProducts,
  },
  {
    path: "/catalog/:id",
    Component: ProductItem,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];

export default routes;
