import { useState } from "react";
import ProductResponse from "../../interfaces/ProductResponse";
import "../Content/Content.css";
import { Product } from "../product/Product";
import listImg from "../../assets/img/listview.png";
import tileImg from "../../assets/img/tileview.png";

export function Content(props: { products: ProductResponse[] }) {
  const { products } = props;
  const [value, setValue] = useState("");
  const [isList, setView] = useState(true);

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
              onChange={(event) => setValue(event.target.value)}
              className="products__search-field"
              placeholder="Search product"
            />
            <button
              className="controls__view-button"
              onClick={() => setView(!isList)}
            >
              <img src={isList ? tileImg : listImg} alt="view" />
            </button>
          </div>
          {products
            .filter((p) => {
              return (
                p.title.toLowerCase().includes(value.toLowerCase()) ||
                p.category.toLowerCase().includes(value.toLowerCase())
              );
            })
            .map((p) => (
              <Product key={p.id} product={p} isList={isList} />
            ))}
        </div>
      </div>
    </main>
  );
}
