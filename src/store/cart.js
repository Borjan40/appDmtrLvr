import { makeAutoObservable } from "mobx";

class Cart {
  items = [];

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}

export default Cart;
