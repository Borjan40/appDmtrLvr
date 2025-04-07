import { useContext } from "react";
import casheContext from "../contexts/cashe";
function useCashe() {
  const cashe = useContext(casheContext);

  if (cashe === null) {
    throw new Error(
      "Store moron run sysytem without cashe provider, please check who is it"
    );
  }
  return cashe;
}

export default useCashe;
