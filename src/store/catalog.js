import { makeAutoObservable, runInAction } from "mobx";

class Catalog {
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  get one() {
    return (id) => this.products.find((pr) => pr.id === id);
  }

  async load() {
    const data = await this.rootStore.api.products.all();
    runInAction(() => (this.products = data));
  }
}

export default Catalog;
