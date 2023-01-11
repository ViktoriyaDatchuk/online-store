import { useEffect, useState } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "../../redux/cartSlice";
import CardImg from "../../assets/img/card.png";
import MastercardImg from "../../assets/img/mastercard.png";
import UnionpayImg from "../../assets/img/unionpay.png";
import VisaImg from "../../assets/img/visa.png";

interface ModalProps {
  onClose: () => void;
}

export const Modal = ({ onClose }: ModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [valid, setValid] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [addressDirty, setAddressDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [cardNumberDirty, setCardNumberDirty] = useState(false);
  const [validDirty, setValidDirty] = useState(false);
  const [cvvDirty, setCvvDirty] = useState(false);
  const [nameError, setNameError] = useState("Error! Empty value.");
  const [phoneError, setPhoneError] = useState("Error! Empty value.");
  const [addressError, setAddressError] = useState("Error! Empty value.");
  const [emailError, setEmailError] = useState("Error! Empty value.");
  const [cardNumberError, setCardNumberError] = useState("Error! Empty value.");
  const [validError, setValidError] = useState("Error! Empty value.");
  const [cvvError, setCvvError] = useState("Error! Empty value.");
  const [image, setImage] = useState(CardImg);
  const [formValid, setFormValid] = useState(false);
  const [orderProcessed, setOderProcessed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      nameError ||
      phoneError ||
      addressError ||
      emailError ||
      cardNumberError ||
      validError ||
      cvvError
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    nameError,
    phoneError,
    addressError,
    emailError,
    cardNumberError,
    validError,
    cvvError,
  ]);

  useEffect(() => {
    setNameError("");
    const arrayName = name.trim().split(" ");
    if (!arrayName[0]) {
      setNameError("Error! Empty value.");
    } else if (arrayName.length < 2) {
      setNameError("Error! You need to enter at least 2 words!");
    } else {
      arrayName.forEach((word) => {
        if (word.length < 3) {
          setNameError("Error! Your words are too short!");
        }
      });
    }
  }, [name]);

  useEffect(() => {
    if (phone[0] !== "+" || phone.length < 10 || /\D/.test(phone.slice(1))) {
      setPhoneError("Error! Incorrect value!");
    } else {
      setPhoneError("");
    }
  }, [phone]);

  useEffect(() => {
    setAddressError("");
    const arrayAddress = address.trim().split(" ");
    if (!arrayAddress[0]) {
      setAddressError("Error! Empty value.");
    } else if (arrayAddress.length < 3) {
      setAddressError("Error! You need to enter at least 3 words!");
    } else {
      arrayAddress.forEach((word) => {
        if (word.length < 5) {
          setAddressError("Error! Your words are too short!");
        }
      });
    }
  }, [address]);

  useEffect(() => {
    const emailReg =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!emailReg.test(email)) {
      setEmailError("Error! Invalid email!");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (cardNumber.length !== 16) {
      setCardNumberError("Error! Incorrect card number!");
    } else {
      setCardNumberError("");
    }
    switch (cardNumber[0]) {
      case "2":
        setImage(UnionpayImg);
        break;
      case "4":
        setImage(VisaImg);
        break;
      case "5":
        setImage(MastercardImg);
        break;
      default:
        setImage(CardImg);
        break;
    }
  }, [cardNumber]);

  useEffect(() => {
    if (valid.length < 5 || Number(valid.slice(0, 2)) > 12) {
      setValidError("Error! Incorrect value!");
    } else if (valid[2] === "/" && Number(valid.slice(0, 2)) <= 12) {
      setValidError("");
    }
  }, [valid]);

  useEffect(() => {
    if (cvv.length !== 3) {
      setCvvError("Error! Incorrect cvv");
    } else {
      setCvvError("");
    }
  }, [cvv]);

  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "phone":
        setPhoneDirty(true);
        break;
      case "address":
        setAddressDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "cardNumber":
        setCardNumberDirty(true);
        break;
      case "valid":
        setValidDirty(true);
        break;
      case "cvv":
        setCvvDirty(true);
        break;
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (formValid) {
      dispatch(removeAllProducts());
      localStorage.setItem("appliedPromo", JSON.stringify([]));
      setOderProcessed(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setNameDirty(true);
      setPhoneDirty(true);
      setAddressDirty(true);
      setEmailDirty(true);
      setCardNumberDirty(true);
      setValidDirty(true);
      setCvvDirty(true);
    }
  };

  return (
    <>
      <div className="modalArea" onClick={onClose}></div>
      <div className="modalContent">
        {orderProcessed ? (
          <div className="orderProcessed">Order is processed</div>
        ) : (
          <form className="modalForm" onSubmit={submitHandler}>
            <h3 className="modalTitle">Personal info</h3>
            <input
              onBlur={(e) => blurHandler(e)}
              onChange={(e) => setName(e.target.value)}
              name="name"
              value={name}
              type="text"
              placeholder="Name"
              className="personalInfoInput"
            ></input>
            {nameDirty && nameError && (
              <div className="errorMessage">{nameError}</div>
            )}
            <input
              onBlur={(e) => blurHandler(e)}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              value={phone}
              type="text"
              placeholder="Phone number"
              className="personalInfoInput"
            ></input>
            {phoneDirty && phoneError && (
              <div className="errorMessage">{phoneError}</div>
            )}
            <input
              onBlur={(e) => blurHandler(e)}
              onChange={(e) => setAddress(e.target.value)}
              name="address"
              value={address}
              type="text"
              placeholder="Delivery address"
              className="personalInfoInput"
            ></input>
            {addressDirty && addressError && (
              <div className="errorMessage">{addressError}</div>
            )}
            <input
              onBlur={(e) => blurHandler(e)}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              type="email"
              placeholder="E-mail"
              className="personalInfoInput"
            ></input>
            {emailDirty && emailError && (
              <div className="errorMessage">{emailError}</div>
            )}
            <div className="cardDetails">
              <h4 className="cardDetailsTitle">Cart details</h4>
              <div className="card">
                <div className="cardNumber">
                  <img src={image} alt="cardImage" className="cardImage"></img>
                  <input
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) =>
                      setCardNumber(e.target.value.replace(/\D+/g, ""))
                    }
                    name="cardNumber"
                    value={cardNumber}
                    type="text"
                    placeholder="Card number"
                    maxLength={16}
                    className="cardNumberInput"
                  ></input>
                </div>
                <div className="cardInfo">
                  <div className="cardInfoTitle">
                    VALID:
                    <input
                      onBlur={(e) => blurHandler(e)}
                      onChange={(e) =>
                        setValid(
                          e.target.value
                            .replace(/\D+/g, "")
                            .replace(/(\d{2})(\d+)/, "$1/$2")
                        )
                      }
                      name="valid"
                      value={valid}
                      type="text"
                      placeholder="Valid"
                      maxLength={5}
                      pattern="\d{4}"
                      className="cardInfoInput"
                    ></input>
                  </div>
                  <div className="cardInfoTitle">
                    CVV:
                    <input
                      onBlur={(e) => blurHandler(e)}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D+/g, ""))
                      }
                      name="cvv"
                      value={cvv}
                      type="text"
                      placeholder="CVV"
                      maxLength={3}
                      className="cardInfoInput"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            {cardNumberDirty && cardNumberError && (
              <div className="errorMessage">{`Card number - ${cardNumberError}`}</div>
            )}
            {validDirty && validError && (
              <div className="errorMessage">{`Valid - ${validError}`}</div>
            )}
            {cvvDirty && cvvError && (
              <div className="errorMessage">{`CVV - ${cvvError}`}</div>
            )}
            <button className="modalButton">Confirm</button>
          </form>
        )}
      </div>
    </>
  );
};
