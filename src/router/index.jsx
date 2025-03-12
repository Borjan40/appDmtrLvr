import { Component } from "react";
import Products from "../pages/Products";
import ProductItem from "../pages/ProductItem";

const routes = [
  {
    path: "/",
    Component: Products,
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
 