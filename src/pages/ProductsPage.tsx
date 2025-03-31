import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";
import { observer } from "mobx-react-lite";

const ProductsPage = observer(() => {
  const { catalog } = useStore();

  // console.log("Products.tsx catalog", catalog);

  return (
    <div>
      <h1>Catalog</h1>
      <div className="row">
        {catalog.products.map((pr) => (
          <div className="col col-4 mt-3" key={pr.id}>
            <h3>{pr.title}</h3>
            <Link to={`/catalog/${pr.id}`}>Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ProductsPage;
