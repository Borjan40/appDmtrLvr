import { makeAutoObservable, runInAction } from "mobx";


class Catalog {
  products = [];

  constructor(api) {
    makeAutoObservable(this);
    this.api = api;
  }

  async load() {
    const data = await this.api.all();
    runInAction(() => this.products = data)
  }
}

export default Catalog;
