import useStore from "../hooks/useStore";
import { observer } from "mobx-react-lite";

function ProductItem() {
  const { catalog } = useStore();

  console.log(catalog.one(100));

  return <h1>ProductItem</h1>;
}

const observerProductsItem = observer(ProductItem);

export default observerProductsItem;
