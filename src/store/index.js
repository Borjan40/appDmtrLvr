import Cart from "./cart";
import User from "./user";
import Catalog from "./catalog";
import Page from "./page";

class RootStore {
  constructor(api) {
    this.api = api;

    this.catalog = new Catalog(this);
    this.user = new User(this);
    this.cart = new Cart(this);
    this.page = new Page(this);
  }
}

export default RootStore;
 