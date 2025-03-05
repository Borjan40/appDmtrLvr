import User from "./user";
import Catalog from "./catalog";
/* const rootStore = {
    user: new User
}
export default rootStore; */


function createRootStore(api){
    const rootStore = {
        user: new User(api),
        catalog: new Catalog(api.products)
    }
    return rootStore;
}

export default createRootStore