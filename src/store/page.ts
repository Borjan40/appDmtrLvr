import { makeAutoObservable } from "mobx";
import RootStore from ".";

class Page {
  status = 200;
  title = "";
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  update(title: string, status = 200) {
    this.title = title;
    this.status = status;

    if (!import.meta.env.SSR) {
      document.title = title;
    }
  }
}

export default Page;
