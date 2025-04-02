import { createContext } from "react";

const casheContext = createContext<Record<string, unknown>>({});

export default casheContext;
