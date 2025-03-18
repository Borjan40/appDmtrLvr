import Cart from "./cart";
import User from "./user";
import Catalog from "./catalog";
import Page from "./page";
import { TApiInstance } from "../api";

class RootStore {
  api: TApiInstance;
  user: User;
  cart: Cart;
  page: Page;
  catalog: Catalog;

  constructor(api: TApiInstance) {
    this.api = api;

    this.catalog = new Catalog(this);
    this.user = new User(this);
    this.cart = new Cart(this);
    this.page = new Page(this);
  }
}

export default RootStore;
