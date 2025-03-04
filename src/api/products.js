function createProductsApi (http){
return{
      async all(){
        return (await http.get('products/all.php')).data;
    }  
}
}

export default createProductsApi;
