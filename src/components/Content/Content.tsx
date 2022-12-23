import ProductResponse from "../../interfaces/ProductResponse";
import "../Content/Content.css";
import { Product } from "../product/Product";

export function Content(props: { products: ProductResponse[] }) {
  const { products } = props;
  return (
    <main>
      <div className="mainContainer">
        <div className="filtersSpace"></div>
        <div className="products">
          <div className="controls">
            <input
              type="search"
              name=""
              id=""
              className="products__search-field"
              placeholder="Search product"
            />
          </div>
          {fillContent(products)}
        </div>
      </div>
    </main>
  );
}

function fillContent(prods: ProductResponse[]) {
  const content = [];
  for (const prod of prods) {
    content.push(<Product product={prod} />);
  }
  return content;
}
