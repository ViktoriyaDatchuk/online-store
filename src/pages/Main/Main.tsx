import { Content } from "../../components/Content/Content";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./Main.css";
import { products } from "../../stubs/stubs";

export function Main() {
  return (
    <div className="wrapper">
      <Header />
      <Content prods={products} />
      <Footer />
    </div>
  );
}
