import useApiRequest from "../../hooks/useApiRequest";
import { TProduct } from "../../types/data";

function ProductItem({ product }: { product: TProduct }) {
  const { success, data } = useApiRequest('products.one', product.id); 
  console.log(success, data);
  return (
    <div>
      <h1>ProductItem: {product.title}</h1>
      {success && <div>Reviews: {data.reviews.length}</div>}
    </div>
  );
}

export default ProductItem;
