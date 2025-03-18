import { createContext } from "react";
import { TApiInstance } from "../api";
import RootStore from "../store";

const storeContext = createContext<RootStore | null>(null);

export default storeContext;
