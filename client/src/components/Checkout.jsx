import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartsWithAllInfo, updatePurchaseStatus, purchaseGame, createCart } from "../api";
import './Checkout.css'

const Checkout = ({ userCartsList, setUserCartsList, currentUser, token, setCurrentCart }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [billingAddress, setBillingAddress] = useState("");
  const [billingUnit, setBillingUnit] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");

  useEffect(() => {
    const fetchUserCarts = async () => {
      try {
        const userCarts = await getCartsWithAllInfo(currentUser.user.id);
        setUserCartsList(userCarts.cart);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserCarts();
  }, []);

  const cart = userCartsList.filter(cart => cart.purchaseStatus === false);

  async function handlePurchase(event) {
    event.preventDefault();

    if (!address || !unit || !city || !state || !zipCode || !cardName || !cardNumber || !expiryDate || !cvv ||
      (!sameAsShipping && (!billingAddress || !billingUnit || !billingCity || !billingState || !billingZipCode))) {
      alert("Please fill all fields");
      return;
    }

    try {
      for (const cartItem of cart[0].cartItems) {
        await purchaseGame(cartItem.game.id, cartItem.quantity, token);
      }

      const cartObj = {
        purchaseStatus: true
      };

      await updatePurchaseStatus(cart[0].id, cartObj, token);

      const newCart = {
        userId: currentUser.user.id,
        purchaseStatus: false
      };

      const createdCart = await createCart(newCart);

      setCurrentCart(createdCart);
      setUserCartsList(prevCartsList => [...prevCartsList, createdCart]);
      
      alert("Purchase successful");
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handlePurchase}>
      <h1 className="checkout-header">Checkout</h1>
      <div className="checkout-body">
        <div className="checkout-info">
          <div id="shipping-address">
            <h2>Shipping Address</h2>
            <input className="checkout-input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"></input>
            <input className="checkout-input" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unit/Apt #"></input>
            <input className="checkout-input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"></input>
            <input className="checkout-input" value={state} onChange={(e) => setState(e.target.value)} placeholder="State"></input>
            <input className="checkout-input" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip Code"></input>
          </div>
          <div id="billing-info">
            <h2>Billing Info</h2>
            <input className="checkout-input" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Name On Card"></input>
            <input className="checkout-input" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number"></input>
            <input className="checkout-input" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="Expiration Date"></input>
            <input className="checkout-input" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV"></input>
            <label htmlFor="billing-same-as-shipping">
              <input type="checkbox" id="billing-same-as-shipping" checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)} name="billing-same-as-shipping" value="yes" /> Billing address same as shipping address?
            </label>
          </div>
          {!sameAsShipping && <div id="billing-address">
            <h2>Billing Address</h2>
            <div className="billing-inputs">
              <input className="billing-input" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} placeholder="Address"></input>
              <input className="billing-input" value={billingUnit} onChange={(e) => setBillingUnit(e.target.value)} placeholder="Unit/Apt #"></input>
              <input className="billing-input" value={billingCity} onChange={(e) => setBillingCity(e.target.value)} placeholder="City"></input>
              <input className="billing-input" value={billingState} onChange={(e) => setBillingState(e.target.value)} placeholder="State"></input>
              <input className="billing-input" value={billingZipCode} onChange={(e) => setBillingZipCode(e.target.value)} placeholder="Zip Code"></input>
            </div>
          </div>}
        </div>
        <div className="cart-info">
          <div id="cart-totals">
            <h2>Cart</h2>
            {cart[0].cartItems.map((cartItem) => {
              const subtotal = cartItem.game.price * cartItem.quantity;
              return (
                <div key={cartItem.game.id}>
                  <li>
                    <img className="cart-item-image" src={cartItem.game.imageurl} alt={cartItem.game.title} />
                  </li>
                  <h3>{cartItem.game.title}</h3>
                  <p>{cartItem.game.platform}</p>
                  <p>${cartItem.game.price}</p>
                  <p>Quantity: {cartItem.quantity}</p>
                  <p>Subtotal: ${subtotal}</p>
                </div>
              )
            })}
            <h2>Total: ${cart[0].cartItems.reduce((total, cartItem) => total + cartItem.game.price * cartItem.quantity, 0)}</h2>
            <button className="purchase-button" type="submit">Purchase</button>
          </div>
          
        </div>
        
      </div>
    </form>
  )
}

export default Checkout;
