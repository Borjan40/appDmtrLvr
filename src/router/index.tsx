import { Component } from "react";
import Products from "../pages/Products";
import ProductItem from "../pages/ProductItem";
import Navigate from "../components/system/Navigate";
import { RouteObject } from "react-router-dom";
import Error404 from "../components/errors/Error404";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Products,
  },
  {
    path: "/catalog/:id",
    Component: ProductItem,
  },
  { path: "/oldd", element: <Navigate to="/" /> },
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routes;
