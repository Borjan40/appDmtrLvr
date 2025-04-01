import createProductsApi from "./products";
import createCartApi from "./cart";
import { AxiosInstance } from "axios";
import { FlattenObjectKeys } from "../types/utility/objects";

function createApi(http: AxiosInstance) {
  return {
    products: createProductsApi(http),
    card: createCartApi(http),
  };
}

export default createApi;

export type TApiInstance = ReturnType<typeof createApi>;
export type TApiInstanceKeys = FlattenObjectKeys<TApiInstance, true>;
