import axios from "axios";
import { useEffect, useState } from "react";
import { Content } from "../../components/Content/Content";
import "./Main.css";

export function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=100");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  return <Content products={products} />;
}
