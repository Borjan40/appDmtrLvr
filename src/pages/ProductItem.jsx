import useStore from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

function ProductItem() {
  const { catalog, page } = useStore();
  console.log()
  const { id } = useParams();
  const validId = /^[1-9]+\d*$/.test(id);
  const product = catalog.one(+id);

  if (!validId || !product) {
    return <div>404</div>;
  }

  page.update(`${product.title} - very good price, buy now!`);

  return <h1>ProductItem:{product.title}</h1>;
}

const observerProductsItem = observer(ProductItem);
export default observerProductsItem;
