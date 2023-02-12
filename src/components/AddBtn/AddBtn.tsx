import ProductResponse from "../../interfaces/ProductResponse";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import classNames from "classnames";
import "./AddBtn.css";

export const AddBtn = ({ product }: { product: ProductResponse }) => {
  const { items } = useSelector((state: RootState) => state.cartSlice);

  const dispatch = useDispatch();

  const [productIsAdded, setProductIsAdded] = useState(false);

  useEffect(() => {
    setProductIsAdded(
      items.find((item) => item.id === product.id) !== undefined
    );
  }, [product]);

  const item = {
    description: product.description,
    discountPercentage: product.discountPercentage,
    id: product.id,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    thumbnail: product.thumbnail,
    title: product.title,
    count: 1,
  };

  const addToCart = () => {
    dispatch(addProduct(item));
    setProductIsAdded(!productIsAdded);
  };

  const removeFromCart = () => {
    dispatch(removeProduct(item));
    setProductIsAdded(!productIsAdded);
  };

  return (
    <a
      data-testid="test-button"
      className={classNames("add", { added: productIsAdded })}
      onClick={!productIsAdded ? addToCart : removeFromCart}
    >
      {!productIsAdded ? "Add to cart" : "Remove from cart"}
    </a>
  );
};
