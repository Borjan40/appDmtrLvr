import { useContext } from "react";
import storeContext from "../contexts/store";

function useStore() {
  const store = useContext(storeContext);

  if (store === null) {
    throw new Error("Store moron run sysytem without store provider");
  }
  return store;
}

export default useStore;
