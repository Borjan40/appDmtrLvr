import { AxiosInstance } from "axios";
import { TProduct, TProductItem } from "../types/data";

function createProductsApi(http: AxiosInstance) {
  return {
    async all() {
      return (await http.get<TProduct[]>("products/index.php")).data;
    },
    async one(id: number) {
      return (await http.get<TProductItem>(`products/index.php?id=${id}&delay`)).data;
    },
  };
}

export default createProductsApi;
