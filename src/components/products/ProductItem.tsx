import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { TProduct, TProductItem } from "../../types/data";

function ProductItem({ product }: { product: TProduct }) {
  const { products: prApi } = useApi();
  const [info, setInfo] = useState<TProductItem | null>(null);
  console.log(info)
  useEffect(() => {
    prApi.one(product.id).then((data) => setInfo(data));
  }, [product, prApi]);
  return (
    <div>
      <h1>ProductItem:{product.title}</h1>
      {info && <div>Reviews: {info.reviews.length}</div>}
    </div>
  );
}
export default ProductItem;
