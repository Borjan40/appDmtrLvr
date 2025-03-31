import ProductsPage from "../pages/ProductsPage";
import ProductItemPage from "../pages/ProductItemPage";
import Navigate from "../components/system/Navigate";
import { RouteObject } from "react-router-dom";
import Error404 from "../components/errors/Error404";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: ProductsPage,
  },
  {
    path: "/catalog/:id",
    Component: ProductItemPage,
  },
  { path: "/oldd", element: <Navigate to="/" /> },
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routes;
