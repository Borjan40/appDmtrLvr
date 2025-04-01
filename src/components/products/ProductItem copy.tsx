import useApiRequest from "../../hooks/useApiRequest";
import { TProduct } from "../../types/data";

function ProductItem({ product }: { product: TProduct }) {
  const { done, data } = useApiRequest("products.one", product.id);

  return (
    <div>
      <h1>ProductItem: {product.title}</h1>
      {done && (
        <div>
          Reviews: {data.reviews.length}
        </div>
      )}
    </div>
  );
}

export default ProductItem;