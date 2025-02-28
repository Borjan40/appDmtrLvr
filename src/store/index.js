import User from "./user";

/* const rootStore = {
    user: new User
}

export default rootStore; */


function createRootStore(){
    const rootStore = {
        user: new User()
    }
    return rootStore;
}

export default createRootStore