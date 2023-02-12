import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductResponse from "../../interfaces/ProductResponse";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Images } from "../../components/Images/Images";
import { AddBtn } from "../../components/AddBtn/AddBtn";
import { addProduct } from "../../redux/cartSlice";
import "./ProductPage.css";
import { useDispatch } from "react-redux";

export function ProductPage() {
  const [product, setProduct] = useState({} as ProductResponse);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }

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
  };

  return (
    <div className="main-container">
      <Header />
      <div className="description-container">
        <div className="description__title">
          <h1 className="">{product.title} in catalog Orliner</h1>
          <AddBtn product={product} />
          <Link to="/cart?modal=true" className="add" onClick={addToCart}>
            Buy now
          </Link>
        </div>
        <p className="product-path">
          STORE &gt; {product.category} &gt; {product.brand} &gt;{" "}
          {product.title}{" "}
        </p>
        <Images product={product} />
        <ul className="product-desription">
          <li>
            <span>Description: </span>
            {product.description}
          </li>
          <li>
            <span>Category: </span>
            {product.category}
          </li>
          <li>
            <span>Brand: </span>
            {product.brand}
          </li>
          <li>
            <span>Rating: </span>
            {product.rating}
          </li>
          <li>
            <span>Stock: </span>
            {product.stock}
          </li>
          <li>
            <span>Discount Percentage: </span> {product.discountPercentage}
          </li>
        </ul>
        <p></p>
      </div>
      <Footer />
    </div>
  );
}
