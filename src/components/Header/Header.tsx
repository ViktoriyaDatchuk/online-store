import "./Header.css";
import LogoImg from "../../assets/img/orliner-logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export function Header() {
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={LogoImg} alt="orliner" className="logoImg" />
        </Link>
        <div>
          <span className="totalPrice">Total: {totalPrice} Or</span>
        </div>
        <Link to="/cart">
          <div className="cart">
            <div className="cartCounter">{items.length}</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
