import { useState } from "react";
import ProductResponse from "../../interfaces/ProductResponse";
import "../Content/Content.css";
import { Product } from "../product/Product";
import listImg from "../../assets/img/listview.png";
import cardImg from "../../assets/img/tileview.png";

export const Content = ({ products }: { products: ProductResponse[] }) => {
  const [value, setValue] = useState("");
  const [isList, setIsList] = useState(true);

  return (
    <main>
      <div className="mainContainer">
        <div className="filtersSpace"></div>
        <div className="products">
          <div className="controls">
            <input
              type="search"
              onChange={(event) => setValue(event.target.value)}
              className="products__search-field"
              placeholder="Search product"
            />
            <button
              className="controls__view-button"
              onClick={() => setIsList(!isList)}
            >
              <img src={isList ? cardImg : listImg} alt="view" />
            </button>
          </div>
          {products
            .filter((product) => {
              return (
                product.title.toLowerCase().includes(value.toLowerCase()) ||
                product.category.toLowerCase().includes(value.toLowerCase())
              );
            })
            .map((product) => (
              <Product key={product.id} product={product} isList={isList} />
            ))}
        </div>
      </div>
    </main>
  );
};
