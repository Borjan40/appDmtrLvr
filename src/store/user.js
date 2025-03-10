import { makeAutoObservable } from "mobx";

class User {
  id = null;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}

export default User;
