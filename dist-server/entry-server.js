var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { jsxs, jsx } from "react/jsx-runtime";
import { observer } from "mobx-react";
import { createContext, useState, useContext } from "react";
import { makeAutoObservable } from "mobx";
import axios from "axios";
const storeContext = createContext(null);
function App() {
  const [cnt, setCnt] = useState(0);
  const store = useContext(storeContext);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Hello ",
      cnt,
      " react from EM room!"
    ] }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setCnt(cnt + 1), children: "+1" }),
    /* @__PURE__ */ jsx("hr", {}),
    store.user.id
  ] });
}
const observedApp = observer(App);
class User {
  constructor() {
    __publicField(this, "id", null);
    makeAutoObservable(this);
    this.id = Math.random();
  }
}
function createRootStore() {
  const rootStore = {
    user: new User()
  };
  return rootStore;
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
function createApp() {
  const http = createHttpPlugin("https://faceprog.ru/reactcourseapi/");
  const api = createApi(http);
  const rootStore = createRootStore();
  http.interceptors.request.use((config) => {
    console.log(1);
    return config;
  });
  api.products.all();
  const app = /* @__PURE__ */ jsx(storeContext.Provider, { value: rootStore, children: /* @__PURE__ */ jsx(observedApp, {}) });
  return app;
}
function createServerApp() {
  console.log("here");
  const app = createApp();
  return app;
}
export {
  createServerApp as default
};
