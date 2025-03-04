import createProductsApi from './products'
import createCartApi from './cart'

function createApi(http){
return {
    products: createProductsApi(http),
    card: createCartApi(http),
}
}

export default createApi;
