import ProductResponse from "../../interfaces/ProductResponse";
import { useState } from "react";

export const Images = ({ product }: { product: ProductResponse }) => {
  const [srcImg, setSrcImg] = useState("");
  return (
    <div className="images">
      <img src={srcImg || product.thumbnail} className="main-image" alt="" />
      <div className="images__additional">
        {product.images?.map((el, i) => (
          <img
            key={i}
            src={el}
            alt="product image"
            className="add-image"
            onClick={(event) => {
              setSrcImg((event.target as HTMLImageElement).src);
            }}
          />
        ))}
      </div>
    </div>
  );
};
