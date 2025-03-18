import { AxiosInstance } from "axios";

function createCartApi(http: AxiosInstance) {
  return {
    async add() {
      return (await http.get("products/cart.php")).data;
    },
  };
}
export default createCartApi;
