import { createContext } from "react";
import { TApiInstance } from "../api";

const apiContext = createContext<TApiInstance | null>(null);

export default apiContext;
