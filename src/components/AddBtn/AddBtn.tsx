import ProductResponse from "../../interfaces/ProductResponse";
import { useState, useEffect } from "react";
import classNames from "classnames";
import "./AddBtn.css";

export const AddBtn = ({ product }: { product: ProductResponse }) => {
  const storageData = JSON.parse(localStorage.getItem("data")!) || {
    productsId: [],
    totalAmount: 0,
  };

  const [productIsAdded, setProductIsAdded] = useState(false);

  useEffect(() => {
    setProductIsAdded(storageData.productsId.includes(product.id));
  }, [product]);

  const addOrRemoveFromCart = () => {
    if (productIsAdded) {
      storageData.productsId.splice(
        storageData.productsId.indexOf(product.id),
        1
      );
      storageData.totalAmount = storageData.totalAmount - product.price;
    } else {
      storageData.productsId.push(product.id);
      storageData.totalAmount = storageData.totalAmount + product.price;
    }
    setProductIsAdded(!productIsAdded);
    localStorage.setItem("data", JSON.stringify(storageData));
    console.log(storageData);
  };

  return (
    <a
      className={classNames("add", { added: productIsAdded })}
      onClick={addOrRemoveFromCart}
    >
      {!productIsAdded ? "Add to cart" : "Remove from cart"}
    </a>
  );
};
