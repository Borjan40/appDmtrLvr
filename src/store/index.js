import Cart from "./cart";
import User from "./user";
import Catalog from "./catalog";

class RootStore {
  constructor(api) {
    this.api = api;

    this.catalog = new Catalog(this);
    this.user = new User(this);
    this.cart = new Cart(this);
  }
}

export default RootStore;
