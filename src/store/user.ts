import { makeAutoObservable } from "mobx";
import RootStore from ".";

class User {
  id = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  some() {
    this.rootStore;
  }
}

export default User;
