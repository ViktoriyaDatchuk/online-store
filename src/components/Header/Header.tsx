import "./Header.css";
import LogoImg from "../../assets/img/orliner-logo.png";
import { totalAmount, totalPrice } from "../../stubs/stubs";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={LogoImg} alt="orliner" className="logoImg" />
        </Link>
        <div>
          <span className="totalPrice">Total: {totalPrice}</span>
        </div>
        <Link to="/cart">
          <div className="cart">
            <div className="cartCounter">{totalAmount}</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
