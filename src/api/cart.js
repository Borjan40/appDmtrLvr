import http from "../plugins/http";

export default {
    async add(id){
        return (await http.get('products/cart.php')).data;
    }
}