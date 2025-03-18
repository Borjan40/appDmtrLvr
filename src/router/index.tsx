import { Component } from "react";
import Products from "../pages/Products";
import ProductItem from "../pages/ProductItem";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
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
