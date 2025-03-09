import { makeAutoObservable, runInAction } from "mobx";

class Catalog {
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async load() {
    const data = await this.rootStore.api.products.all();
    runInAction(() => (this.products = data));
  }
}

export default Catalog;
