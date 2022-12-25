import "./product.css";
import ProductResponse from "../../interfaces/ProductResponse";
import classNames from "classnames";

export function Product(props: { product: ProductResponse; isList: boolean }) {
  const { product, isList } = props;

  return (
    <div className={classNames("product-container", { tile: !isList })}>
      <div className="product__img-container">
        <img src={product.thumbnail} alt="product" className="product__img" />
      </div>
      <div className="product__description">
        <span className="product__title">{product.title}</span>
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
        <a href="#" className="add">
          Add to cart
        </a>
      </div>
    </div>
  );
}
