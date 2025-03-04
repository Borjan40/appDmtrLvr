function createCartApi (http){
    return {
        async add(id){
            return (await http.get('products/cart.php')).data;
        }
    }
}
export default createCartApi;