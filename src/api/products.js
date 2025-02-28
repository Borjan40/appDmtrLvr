import http from "../plugins/http";

export default {
    async all(){
        return (await http.get('products/all.php')).data;
    }
}