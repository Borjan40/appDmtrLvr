import ProductsPage from "../pages/ProductsPage";
import ProductItemPage from "../pages/ProductItemPage";
import Navigate from "../components/system/Navigate";
import { Params, RouteObject } from "react-router-dom";
import Error404 from "../components/errors/Error404";
import RootStore from "../store";
import { TApiInstance } from "../api";

type Route = RouteObject & {
  data?: (context: RouteDataLoader) => Promise<unknown>;
};

type RouteDataLoader = {
  store: RootStore;
  api: TApiInstance;
  params: Params<string>;
};

const routes: Route[] = [
  {
    path: "/",
    Component: ProductsPage,
  },
  {
    path: "/catalog/:id",
    Component: ProductItemPage,
    async data(context) {
      await context.api.products.one(parseInt(context.params.id ?? ""));
    },
  },
  { path: "/oldd", element: <Navigate to="/" /> },
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routes;
