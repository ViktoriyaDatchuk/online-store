import axios from "axios";
import { useEffect, useState } from "react";
import { Content } from "../../components/Content/Content";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./Main.css";

export function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=30");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="wrapper">
      <Header />
      <Content products={products} />
      <Footer />
    </div>
  );
}
