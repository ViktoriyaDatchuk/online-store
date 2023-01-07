import { CartProduct } from "../CartProduct/CartProduct";
import "./CartMain.css";
import catImg from "../../assets/img/bg-cat.png";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const CartMain = () => {
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );
  const [modal, setModal] = useState(false);

  return (
    <main className="cartMain">
      {items.length > 0 ? (
        <>
          <div className="totalInfo">
            <h2>Cart</h2>
            <div className="totalInfoContainer">
              <div className="amountAndPrice">
                <div className="totalProductsAmount">
                  {items.length} products
                </div>
                <div className="totalProductsPrice">
                  <div className="priceWithoutPromo">for {totalPrice} Or</div>
                  <div className="priceWithPromo"></div>
                </div>
              </div>
              <div className="promoContainer">
                {/* <div className="addedPromo">
                  <p>Applied codes</p>
                </div> */}
                <input
                  type="search"
                  placeholder="Enter  code"
                  className="promoField"
                ></input>
                <div className="enteredPromo"></div>
                <span className="promos">
                  Promo for test: &apos;orliner&apos;
                </span>
              </div>
              <button className="buyButton" onClick={() => setModal(true)}>
                Buy
              </button>
            </div>
          </div>
          <div className="productsArea">
            {items.map((item, index) => (
              <CartProduct key={index} product={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="emptyCart">
          <img src={catImg} alt="emtyCart" className="emptyCartImg"></img>
          <span className="emptyCartText">Cart is empty</span>
        </div>
      )}
      {modal && <Modal onClose={() => setModal(false)} />}
    </main>
  );
};
