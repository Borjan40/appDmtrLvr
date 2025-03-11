import { makeAutoObservable } from "mobx";

class User {
  id = null;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  some() {
    this.rootStore.users.products;
  }
}

export default User;
