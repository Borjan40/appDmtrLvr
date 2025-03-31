import { useContext } from "react";
import apiContext from "../contexts/api";

function useApi() {
  const api = useContext(apiContext);

  if (api === null) {
    throw new Error("Store moron run sysytem without api provider");
  }
  return api;
}

export default useApi;
