import React from "react";
import { useEffect } from "react";
import { getCartsWithAllInfo } from "../api";
import './Checkout.css'

const Checkout = ({userCartsList, setUserCartsList, currentUser}) => {

        useEffect(() => {
        const fetchUserCarts = async () => {
                    
             try{
                const userCarts = await getCartsWithAllInfo(currentUser.user.id);
                    console.log("This is userCarts:", userCarts);

                setUserCartsList(userCarts.cart);       
              
            } catch (error){
                console.error(error);
            }
        };
        fetchUserCarts()
    }, []);



    {const cart = userCartsList.filter(cart => cart.purchaseStatus === false)
console.log("This is cart:", cart)
        return (
            <>        
                <h1 className="checkout-header">Checkout</h1>
                    <div className="checkout-body">
                    <div className="checkout-info">
                        
                    <div id="address">
                        <h2>Shipping Address</h2>
                        <input className="input" placeholder="Address"></input>
                        <input className="input"  placeholder="Unit/Apt #"></input>
                        <input className="input"  placeholder="City"></input>
                        <input className="input"  placeholder="State"></input>
                        <input className="input"  placeholder="Zip Code"></input>
                    </div>

                    <div id="billing-info">
                        <h2>Billing Info</h2>
                       <input className="input"  placeholder="Name On Card"></input>
                       <input className="input"  placeholder="Card Number"></input>
                       <input className="input"  placeholder="Exiration Date"></input>
                       <input className="input"  placeholder="CVV"></input>
                       <label htmlFor="accept">
                         <input type="checkbox" id="accept" name="accept" value="yes"/> Billing address same as shipping address?
                       </label> 
                    </div>
                    
                    <div id="billing-address">
                        <h2>Billing Address</h2>
                            <div className="billing-inputs">
                                <input className="billing" placeholder="Address"></input>
                                <input className="billing"  placeholder="Unit/Apt #"></input>
                                <input className="billing"  placeholder="City"></input>
                                <input className="billing"  placeholder="State"></input>
                                <input className="billing"  placeholder="Zip Code"></input>
                            </div>  
                    </div>
                    </div>
                    <div className="cart-info">
    <div id="cart-totals">
      <h2>Cart</h2>
      {cart[0].cartItems.map((cartItem) => {
        return (
          <>
            <li>
              <img className="cartItemImage" src={cartItem.game.imageurl} alt={cartItem.game.title} />
            </li>
            <li>Game: {cartItem.game.title}</li>
            <li>Quantity: {cartItem.quantity}</li>
            <li>Price: {cartItem.game.price}</li>
          </>
        )
      })}
    </div>
  </div>
</div>
            </>
        )    
    }}


export default Checkout;