import { createContext } from "react";
import RootStore from "../store";

const storeContext = createContext<RootStore | null>(null);

export default storeContext;
