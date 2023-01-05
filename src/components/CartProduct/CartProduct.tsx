import { Link } from "react-router-dom";
import ProductResponse from "../../interfaces/ProductResponse";
import "./CartProduct.css";

interface CartProductProps {
  product: ProductResponse;
  count: number;
}

export const CartProduct = ({ product, count }: CartProductProps) => {
  return (
    <div className="productContainer">
      <div className="productImgContainer">
        <img src={product.thumbnail} alt="product" className="productImg" />
      </div>
      <div className="productDescription">
        <Link to={`/product/${product.id}`} className="productTitle">
          {product.title}
        </Link>
        <p className="productDescriptionText">{product.description}</p>
        <div className="productRaiting">
          <span>Rating: {product.rating}</span>
        </div>
        <div className="productDiscount">
          <span>Discount: {product.discountPercentage}%</span>
        </div>
      </div>
      <div className="amountContainer">
        <div className="changeAmountContainer">
          <div className="changeAmount">
            <button className="changeAmountButton">+</button>
            {count}
            <button className="changeAmountButton">-</button>
          </div>
          <div className="priceValue">{product.price * count} Or</div>
        </div>
        <div className="stockValue">Stock: {product.stock}</div>
      </div>
    </div>
  );
};
