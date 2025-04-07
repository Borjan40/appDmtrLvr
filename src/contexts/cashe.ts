import { createContext } from "react";

export interface Cashe {
  data: Record<string, unknown>;
  awaiting: Record<string, Promise<unknown>>;
}

const casheContext = createContext<Cashe | null>(null);
export default casheContext;
