import { jsxs, jsx } from "react/jsx-runtime";
import { Link, useParams, useRoutes } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { observer as observer$1 } from "mobx-react";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { StaticRouter } from "react-router-dom/server.mjs";
const storeContext = createContext(null);
function useStore() {
  const store = useContext(storeContext);
  if (store === null) {
    throw new Error("Store moron run sysytem without store provider");
  }
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
function Buttons({
  title,
  variants,
  value,
  onChange,
  ...rootAttrs
}) {
  return /* @__PURE__ */ jsxs("div", { ...rootAttrs, children: [
    title && /* @__PURE__ */ jsx("h3", { children: title }),
    variants.map((variant) => {
      const btnStateCl = variant.value === value ? "btn-primary" : "btn-danger";
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: `btn me-3 ${btnStateCl}`,
          onClick: () => onChange(variant.value),
          children: variant.text
        },
        variant.value
      );
    })
  ] });
}
const Error404 = observer$1(function({
  title = "Page not found"
}) {
  const { page } = useStore();
  page.update(title, 404);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { children: title }) });
});
function ProductItem() {
  const { catalog, page } = useStore();
  const params = useParams();
  const id = params.id ?? "";
  const validId = /^[1-9]+\d*$/.test(id);
  const product = catalog.one(+id);
  const [prodVar, setProdVar] = useState("0");
  if (!validId || !product) {
    return /* @__PURE__ */ jsx(Error404, { title: "Product not found" });
  }
  page.update(`${product.title} - very good price, buy now!`);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "ProductItem:",
      product.title
    ] }),
    /* @__PURE__ */ jsx(
      Buttons,
      {
        variants: [
          { text: "M", value: "0" },
          { text: "L", value: "1" },
          { text: "XL", value: "2" }
        ],
        value: prodVar,
        title: "Set Size",
        onChange: setProdVar,
        rootAttrs: { className: "my-3 alert alert-success", tabIndex: 1 }
      }
    )
  ] });
}
const observerProductsItem = observer(ProductItem);
const routes = [
  {
    path: "/",
    Component: observerProducts
  },
  {
    path: "/catalog/:id",
    Component: observerProductsItem
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsx(Error404, {})
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
    this.items = [];
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}
class User {
  constructor(rootStore) {
    this.id = null;
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
  some() {
    this.rootStore;
  }
}
class Catalog {
  constructor(rootStore) {
    this.products = [];
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
  get one() {
    return (id) => this.products.find((pr) => pr.id === id);
  }
  async load() {
    const data = await this.rootStore.api.products.all();
    runInAction(() => this.products = data);
  }
}
class Page {
  constructor(rootStore) {
    this.status = 200;
    this.title = "";
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
  update(title, status = 200) {
    this.title = title;
    this.status = status;
  }
}
class RootStore {
  constructor(api) {
    this.api = api;
    this.catalog = new Catalog(this);
    this.user = new User(this);
    this.cart = new Cart(this);
    this.page = new Page(this);
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
      return (await http.get("products/index.php")).data;
    },
    async one(id) {
      return (await http.get(`products/index.php?id=${id}`)).data;
    }
  };
}
function createCartApi(http) {
  return {
    async add() {
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
  const store = new RootStore(api);
  console.log("app.jsx store", store);
  await store.catalog.load();
  const app = /* @__PURE__ */ jsx(storeContext.Provider, { value: store, children: /* @__PURE__ */ jsx(App, {}) });
  return { app, store };
}
async function createServerApp(context) {
  const { app, store } = await createApp();
  const serverApp = /* @__PURE__ */ jsx(StaticRouter, { location: context.url, children: app });
  return { app: serverApp, store };
}
export {
  createServerApp as default
};
