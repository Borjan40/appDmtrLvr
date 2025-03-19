import useStore from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import Buttons from "../components/forms/Buttons";
import { useState } from "react";

function ProductItem() {
  const { catalog, page } = useStore();
  const params = useParams();
  const id = params.id ?? "";
  const validId = /^[1-9]+\d*$/.test(id);
  const product = catalog.one(+id);
  const [prodVar, setProdVar] = useState("0");

  if (!validId || !product) {
    return <div>404</div>;
  }

  page.update(`${product.title} - very good price, buy now!`);

  return (
    <div>
      <h1>ProductItem:{product.title}</h1>
      <Buttons
        variants={[
          { text: "M", value: "0" },
          { text: "L", value: "1" },
          { text: "XL", value: "2" },
        ]}
        value={prodVar}
        title={"Set Size"}
        changed={setProdVar}
        className="my-3 alert alert-success"
        tabIndex={1}
      />
    </div>
  );
}

const observerProductsItem = observer(ProductItem);
export default observerProductsItem;
