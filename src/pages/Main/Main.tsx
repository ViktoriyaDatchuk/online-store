import { Content } from "../../components/Content/Content";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { productArray } from "../../stubs/ProductStub";
import "./Main.css";

export function Main() {
  return (
    <div className="wrapper">
      <Header />
      <Content products={productArray} />
      <Footer />
    </div>
  );
}
