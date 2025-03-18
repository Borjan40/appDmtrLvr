import createProductsApi from "./products";
import createCartApi from "./cart";
import { AxiosInstance } from "axios";

function createApi(http: AxiosInstance) {
  return {
    products: createProductsApi(http),
    card: createCartApi(http),
  };
}

export default createApi;

export type TApiInstance = ReturnType<typeof createApi>;
