import useStore from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import Error404 from "../components/errors/Error404";
import ProductItem from "../components/products/ProductItem";

const ProductItemPage = observer(() => {
  const { catalog, page } = useStore();
  const params = useParams();
  const id = params.id ?? "";
  const validId = /^[1-9]+\d*$/.test(id);
  const product = catalog.one(+id);

  if (!validId || !product) {
    return <Error404 title="Product not found" />;
  }

  page.update(`${product.title} - very good price, buy now!`);

  return <ProductItem product={product} />;
});

export default ProductItemPage;
