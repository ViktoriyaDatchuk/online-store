import "./Header.css";
import LogoImg from "../../assets/img/orliner-logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export function Header() {
  const { items, discountPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );
  const total = items.reduce((acc, item) => acc + item.count, 0);

  return (
    <header>
      <div className="container">
        <Link to="/" data-testid="main-link">
          <img src={LogoImg} alt="orliner" className="logoImg" />
        </Link>
        <div>
          <span className="totalPrice">Total: {discountPrice} Or</span>
        </div>
        <Link to="/cart" data-testid="cart-link">
          <div className="cart">
            <div className="cartCounter">{total}</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
