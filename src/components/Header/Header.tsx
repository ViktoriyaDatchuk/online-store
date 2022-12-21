import './Header.css';
import LogoImg from '../../assets/img/orliner-logo.png';
import { totalAmount, totalPrice } from '../../stubs/stubs';

export function Header() {
    return (
        <div className="container">
            <img src = {LogoImg} alt='orliner' className="logoImg" />
            <div>
                <span className="totalPrice">
                    Total: {totalPrice}
                </span>
            </div>
            <div className="cart">
                <div className="cartCounter">
                    {totalAmount}
                </div>
            </div>
        </div>
    )
}
