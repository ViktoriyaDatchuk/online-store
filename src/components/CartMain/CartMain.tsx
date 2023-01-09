import { CartProduct } from "../CartProduct/CartProduct";
import "./CartMain.css";
import catImg from "../../assets/img/bg-cat.png";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { changeDiscount } from "../../redux/cartSlice";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";

interface discountType {
  orliner: string;
  RS: string;
}

export const CartMain = () => {
  const { items, totalPrice, discountPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );
  const [searcParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useState(searcParams.get("modal") === "true");
  const [promo, setPromo] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<string[]>(
    JSON.parse(localStorage.getItem("appliedPromo")!) || []
  );
  let myDiscount: number;
  const dispatch = useDispatch();

  const discountAll: discountType = {
    orliner: "20%",
    RS: "10%",
  };

  useEffect(() => {
    if (appliedPromo.length) {
      const sumDiscount = appliedPromo.reduce(
        (acc, item) =>
          (acc += Number(
            discountAll[item as keyof typeof discountAll].slice(0, 2)
          )),
        0
      );
      myDiscount = 1 - sumDiscount / 100;
    } else {
      myDiscount = 1;
    }
    dispatch(changeDiscount(myDiscount));
    localStorage.setItem("appliedPromo", JSON.stringify(appliedPromo));
  }, [appliedPromo]);

  const addPromoHandler = () => {
    setAppliedPromo([...appliedPromo, promo]);
  };

  const dropPromoHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAppliedPromo(
      appliedPromo.filter(
        (item) => item !== (event.target as HTMLButtonElement).id
      )
    );
  };

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
                  <div
                    className={classNames("priceWithoutPromo", {
                      crossOut: appliedPromo.length,
                    })}
                  >
                    for {totalPrice} Or
                  </div>
                  {appliedPromo.length ? (
                    <div className="priceWithPromo">for {discountPrice} Or</div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="promoContainer">
                {appliedPromo.length ? (
                  <div className="appliedPromo">
                    <h4 className="promoTitle">Aplied promo</h4>
                    {appliedPromo.map((promo, index) => (
                      <div key={index} className="appliedPromoContainer">
                        <div className="appliedPromoName">
                          {promo} -{" "}
                          {discountAll[promo as keyof typeof discountAll]}
                        </div>
                        <button
                          id={promo}
                          className="promoDrop"
                          onClick={dropPromoHandler}
                        >
                          Drop
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}
                <input
                  type="search"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Enter code"
                  className="promoField"
                ></input>
                {promo && Object.keys(discountAll).includes(promo) ? (
                  <div className="addPromoContainer">
                    <div className="enteredPromo">
                      {promo} - {discountAll[promo as keyof typeof discountAll]}
                    </div>
                    {appliedPromo.includes(promo) ? (
                      <div></div>
                    ) : (
                      <button className="promoAdd" onClick={addPromoHandler}>
                        Add
                      </button>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
                <span className="promos">
                  Promo for test: &apos;orliner&apos;, &apos;RS&apos;
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
