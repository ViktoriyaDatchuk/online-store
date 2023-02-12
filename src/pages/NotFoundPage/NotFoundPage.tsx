import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import notFoundImg from "../../assets/img/page-not-found.png";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <div className="not-found__container">
      <Header />
      <main>
        <p className="not-found__text">Ops... This page not found</p>
        <img src={notFoundImg} alt="" className="not-found__img" />
      </main>
      <Footer />
    </div>
  );
}
