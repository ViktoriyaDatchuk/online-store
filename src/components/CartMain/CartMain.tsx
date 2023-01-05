import { stubProducts, totalAmount, totalPrice } from "../../stubs/stubs";
import { CartProduct } from "../CartProduct/CartProduct";
import "./CartMain.css";
import catImg from "../../assets/img/bg-cat.png";

export const CartMain = () => {
  return (
    <main>
      {totalAmount > 0 ? (
        <div className="cartMainWrapper">
          <div className="totalInfo">
            <h2>Cart</h2>
            <div className="totalInfoContainer">
              <div className="amountAndPrice">
                <div className="totalProductsAmount">
                  {totalAmount} products
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
              <button className="buyButton">Buy</button>
            </div>
          </div>
          <div className="productsArea">
            {stubProducts.map((item, index) => (
              <CartProduct
                key={index}
                product={item.descript}
                count={item.count}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="emptyCart">
          <img src={catImg} alt="emtyCart" className="emptyCartImg"></img>
          <span className="emptyCartText">Cart is empty</span>
        </div>
      )}
    </main>
  );
};
