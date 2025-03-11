import { useContext } from "react";
import storeContext from "../contexts/store";

function useStore(...names) {
  const store = useContext(storeContext);
  return store;
}

export default useStore;
