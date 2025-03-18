import { makeAutoObservable } from "mobx";
import RootStore from ".";

class Cart {
  items = [];
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}

export default Cart;
