var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { jsxs, jsx } from "react/jsx-runtime";
import { Link, useRoutes } from "react-router-dom";
import { createContext, useContext } from "react";
import { observer } from "mobx-react-lite";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { StaticRouter } from "react-router-dom/server.mjs";
import "http";
const storeContext = createContext(null);
function useStore(...names) {
  const store = useContext(storeContext);
  return store;
}
function Products() {
  const { catalog } = useStore();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Catalog" }),
    /* @__PURE__ */ jsx("div", { className: "row", children: catalog.products.map((pr) => /* @__PURE__ */ jsxs("div", { className: "col col-4 mt-3", children: [
      /* @__PURE__ */ jsx("h3", { children: pr.title }),
      /* @__PURE__ */ jsx(Link, { to: `/catalog/${pr.id}`, children: "Read more" })
    ] }, pr.id)) })
  ] });
}
const observerProducts = observer(Products);
function ProductItem() {
  return /* @__PURE__ */ jsx("div", { children: "ProductItem" });
}
const routes = [
  {
    path: "/",
    Component: observerProducts
  },
  {
    path: "/catalog/:id",
    Component: ProductItem
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsx("div", { children: "404" })
  }
];
function App() {
  const view = useRoutes(routes);
  return /* @__PURE__ */ jsxs("div", { className: "container mt-2", children: [
    /* @__PURE__ */ jsx("h1", { children: "Hello react from EM room!" }),
    /* @__PURE__ */ jsx("hr", {}),
    view
  ] });
}
class Cart {
  constructor(rootStore) {
    __publicField(this, "items", []);
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}
class User {
  constructor(rootStore) {
    __publicField(this, "id", null);
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
  some() {
    this.rootStore.users.products;
  }
}
class Catalog {
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
  async load() {
    const data = await this.rootStore.api.products.all();
    runInAction(() => this.products = data);
  }
}
class RootStore {
  constructor(api) {
    this.api = api;
    this.catalog = new Catalog(this);
    this.user = new User(this);
    this.cart = new Cart(this);
  }
}
function createHttpPlugin(baseURL) {
  const http = axios.create({
    baseURL,
    timeout: 1e4
  });
  return http;
}
function createProductsApi(http) {
  return {
    async all() {
      return (await http.get("products/all.php")).data;
    }
  };
}
function createCartApi(http) {
  return {
    async add(id) {
      return (await http.get("products/cart.php")).data;
    }
  };
}
function createApi(http) {
  return {
    products: createProductsApi(http),
    card: createCartApi(http)
  };
}
async function createApp() {
  const http = createHttpPlugin("https://faceprog.ru/reactcourseapi/");
  const api = createApi(http);
  const rootStore = new RootStore(api);
  await rootStore.catalog.load();
  const app = /* @__PURE__ */ jsx(storeContext.Provider, { value: rootStore, children: /* @__PURE__ */ jsx(App, {}) });
  return app;
}
async function createServerApp(context) {
  console.log("here");
  const app = await createApp();
  return /* @__PURE__ */ jsx(StaticRouter, { location: context.url, children: app });
}
export {
  createServerApp as default
};
