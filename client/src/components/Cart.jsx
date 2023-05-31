import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartsWithAllInfo } from "../api";
import './Cart.css'

const Cart = ({userCartsList, setUserCartsList, isLoggedIn, currentUser}) => {
    const navigate = useNavigate();

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
    
    return (
        <>
                {isLoggedIn ?

        <div className='cartBody'>
            <h1 className="shoppingHeader">Shopping Cart</h1>
        
            {userCartsList.map((cart, index) =>{
                // console.log("This is cart:", cart);
                    if(cart.purchaseStatus === false)

                return(
                <>
                    <div key={index}>   
                        <div className="cartItemsList">
                            <h2 className="itemsHeader">Items:</h2>
                                {cart.cartItems.map((cartItem) => {
                            // console.log("This is cartItem MAP:", cartItem);
                            return(
                                <div>
                                    <li>{cartItem.games.title} ${cartItem.games.price}</li>
                                    <input className="quantity" type="number" min="1" max="6"/> {cartItem.quantity}
                                    <button>Remove</button>
                                </div>
                                   
                            )
                        })
                       }
                    </div>
                    </div>
                    <div className="checkout">
                        <span className="totalHeader">
                            <h3>Total:</h3>
                            <button className="checkoutButton" onClick={() => navigate("/Checkout")}>Checkout</button>
                        </span>
                    </div>
                </>
            )
            })}
            
        </div>
        :
        <div className="notLoggedIn">
        <h2 className="notLoggedInText">Welcome! Please login to get started!</h2>
        </div>
        }
        
        </> 
    )  
}
    

export default Cart;