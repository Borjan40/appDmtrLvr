import { makeAutoObservable, runInAction } from "mobx";
import RootStore from ".";
import { TProduct } from "../types/data";

class Catalog {
  products: TProduct[] = [];
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  get one() {
    return (id: number) => this.products.find((pr) => pr.id === id);
  }

  async load() {
    const data = await this.rootStore.api.products.all();
    runInAction(() => (this.products = data));
  }
}

export default Catalog;
