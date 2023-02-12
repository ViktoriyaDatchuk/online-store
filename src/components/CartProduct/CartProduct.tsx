import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  cartProduct,
  decrementProductCount,
  incrementProductCount,
} from "../../redux/cartSlice";
import "./CartProduct.css";

export const CartProduct = ({
  number,
  product,
}: {
  key: number;
  number: number;
  product: cartProduct;
}) => {
  const dispatch = useDispatch();

  const incrementCount = () => {
    dispatch(incrementProductCount(product));
  };

  const decrementCount = () => {
    dispatch(decrementProductCount(product));
  };
  return (
    <div className="productContainer">
      <span className="productNumber">{number + 1}</span>
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
            <button className="changeAmountButton" onClick={decrementCount}>
              -
            </button>
            {product.count}
            <button className="changeAmountButton" onClick={incrementCount}>
              +
            </button>
          </div>
          <div className="priceValue">{product.price * product.count} Or</div>
        </div>
        <div className="stockValue">Stock: {product.stock}</div>
      </div>
    </div>
  );
};
