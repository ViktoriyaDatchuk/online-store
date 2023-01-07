import { CartMain } from "../../components/CartMain/CartMain";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./Cart.css";

export const Cart = () => {
  return (
    <div className="wrapper">
      <Header />
      <CartMain />
      <Footer />
    </div>
  );
}
