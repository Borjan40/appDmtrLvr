import { jsxs, jsx } from "react/jsx-runtime";
import { Link, useParams, useRoutes } from "react-router-dom";
import { createContext, useContext } from "react";
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
const ProductsPage = observer(() => {
  const { catalog } = useStore();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Catalog" }),
    /* @__PURE__ */ jsx("div", { className: "row", children: catalog.products.map((pr) => /* @__PURE__ */ jsxs("div", { className: "col col-4 mt-3", children: [
      /* @__PURE__ */ jsx("h3", { children: pr.title }),
      /* @__PURE__ */ jsx(Link, { to: `/catalog/${pr.id}`, children: "Read more" })
    ] }, pr.id)) })
  ] });
});
const Error404 = observer$1(function({
  title = "Page not found"
}) {
  const { page } = useStore();
  page.update(title, 404);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { children: title }) });
});
const apiContext = createContext(null);
function useApi() {
  const api = useContext(apiContext);
  if (api === null) {
    throw new Error("Store moron run sysytem without api provider");
  }
  return api;
}
function getByDotKey(obj, key) {
  return key.split(".").reduce((t, k) => {
    if (t[k] === void 0) {
      throw new Error("dottet key is wrong");
    }
    return t[k];
  }, obj);
}
const casheContext = createContext({});
function useApiRequestServer(schema, ...params) {
  const api = useApi();
  getByDotKey(api, schema);
  const cashe = useContext(casheContext);
  const key = schema + ":" + JSON.stringify(params);
  const result = cashe[key] ? {
    done: true,
    success: true,
    data: cashe[key],
    error: null
  } : {
    done: false,
    success: false,
    data: null,
    error: null
  };
  return result;
}
let useApiRequest;
{
  useApiRequest = useApiRequestServer;
}
const useApiRequest$1 = useApiRequest;
function ProductItem({ product }) {
  const { success, data } = useApiRequest$1("products.one", product.id);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "ProductItem: ",
      product.title
    ] }),
    success && /* @__PURE__ */ jsxs("div", { children: [
      "Reviews: ",
      data.reviews.length
    ] })
  ] });
}
const ProductItemPage = observer(() => {
  const { catalog, page } = useStore();
  const params = useParams();
  const id = params.id ?? "";
  const validId = /^[1-9]+\d*$/.test(id);
  const product = catalog.one(+id);
  if (!validId || !product) {
    return /* @__PURE__ */ jsx(Error404, { title: "Product not found" });
  }
  page.update(`${product.title} - very good price, buy now!`);
  return /* @__PURE__ */ jsx(ProductItem, { product });
});
let Navigate;
{
  Navigate = function Navigate2({ to }) {
    const { page } = useStore();
    page.redirect(typeof to === "object" ? to.pathname ?? "/" : to);
    return null;
  };
}
const Navigate$1 = Navigate;
const routes = [
  {
    path: "/",
    Component: ProductsPage
  },
  {
    path: "/catalog/:id",
    Component: ProductItemPage
  },
  { path: "/oldd", element: /* @__PURE__ */ jsx(Navigate$1, { to: "/" }) },
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
    this.redirectTo = null;
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
  update(title, status = 200) {
    this.title = title;
    this.status = status;
  }
  redirect(url, status = 301) {
    this.redirectTo = url;
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
      return (await http.get(`products/index.php?id=${id}&delay`)).data;
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
  await store.catalog.load();
  const app = /* @__PURE__ */ jsx(apiContext.Provider, { value: api, children: /* @__PURE__ */ jsx(storeContext.Provider, { value: store, children: /* @__PURE__ */ jsx(App, {}) }) });
  return { app, store, api };
}
async function createServerApp(context) {
  const { app, store } = await createApp();
  const cashe = {};
  const serverApp = /* @__PURE__ */ jsx(StaticRouter, { location: context.url, children: /* @__PURE__ */ jsx(casheContext.Provider, { value: cashe, children: app }) });
  return { app: serverApp, store };
}
export {
  createServerApp as default
};
