import "./product.css";
import ProductResponse from "../../interfaces/ProductResponse";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { AddBtn } from "../AddBtn/AddBtn";

export const Product = ({
  product,
  isList,
}: {
  product: ProductResponse;
  isList: boolean;
}) => {
  return (
    <div className={classNames("product-container", { card: !isList })}>
      <div className="product__img-container">
        <img src={product.thumbnail} alt="product" className="product__img" />
      </div>
      <div className="product__description">
        <Link to={`/product/${product.id}`} className="product__title">
          {product.title}
        </Link>
        <p className="product__description-text">{product.description}</p>
        <div className="product__raiting">
          <div
            className="product__rating_active"
            style={{ width: `calc(100%*(${product.rating}/5))` }}
          ></div>
          <span>{product.rating}</span>
        </div>
      </div>
      <div className="product__price">
        <span>From {product.price} Or</span>
        <AddBtn product={product} />
      </div>
    </div>
  );
};
