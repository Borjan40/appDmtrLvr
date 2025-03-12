import { makeAutoObservable } from "mobx";

class Page {
  status = 200;
  title = [];

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  update(title, status = 200) {
    this.title = title;
    this.status = status;

    if (!import.meta.env.SSR) {
      document.title = title;
    }
  }
}

export default Page;
