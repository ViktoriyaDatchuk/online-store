import React, {useState} from "react";
import { Logo } from "../../shared/Logo";
import './Header.css';

export function Header() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    
    return (
        <div className="container">
            <Logo />
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