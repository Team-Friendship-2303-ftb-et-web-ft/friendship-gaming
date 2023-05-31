import React from "react";
import { useEffect, useState } from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import './Profile.css'
import { getCartsWithAllInfo } from "../api";
const Profile = (props) => {
    const {isLoggedIn, currentUser, token, cartsList, setCartsList, isAdmin } = props;
    const [userCartsList, setUserCartsList] = useState([]);
    const navigate = useNavigate();
  
    console.log("This is currentUser:", currentUser.user.id);
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

    console.log("This is UserCartsList:", userCartsList); 


    return (
        <>
        {isLoggedIn  && isAdmin ?
        <div className='profileMain' >
           <div className="welcome"><h2><strong>Welcome, {currentUser.user.username}</strong> </h2>
           <button className="update" onClick={() => navigate('../Admin')}>Admin Dashboard</button>
           <button onClick={() => navigate('/UpdateUser')} className='update'>Update Information</button>
           </div> 

        <div className='profileBody'>
            <h3>   Order History :</h3>
        
            {userCartsList.map((cart, index) =>{
                console.log("This is cart:", cart);
                if(cart.purchaseStatus === true)
                return(
                    <div key={index}>
                        <h3>Order Number : {cart.id}</h3>
                        <div className="cartItemsList">
                            <h4>Items:</h4>
                       {cart.cartItems.map((cartItem) => {
                            console.log("This is cartItem MAP:", cartItem)
                            return(
                                <div>

                                    <li>{cartItem.game.title}   Quantity: {cartItem.quantity}  Price: {cartItem.priceAtPurchase}</li>

                                </div>
                                
                            )
                        })
                       }
                    </div>
                    </div>
            )
})}
        
        </div>
        </div>
        :
        <div className='profileMain' >
           <div className="welcome"><h2><strong>Welcome, {currentUser.user.username}</strong> </h2>
           <button onClick={() => navigate('./UpdateUserForm')} className='update'>Update Information</button>
           </div> 

        <div className='profileBody'>
            <h3>   Order History :</h3>
        
            {userCartsList.map((cart, index) =>{
                console.log("This is cart:", cart);
                if(cart.purchaseStatus === true)
                return(
                    <div key={index}>
                        <h3>Order Number : {cart.id}</h3>
                        <div className="cartItemsList">
                            <h4>Items:</h4>
                       {cart.cartItems.map((cartItem) => {
                            console.log("This is cartItem MAP:", cartItem)
                            return(
                                <div>
                                    <li>{cartItem.games.title}   Quantity: {cartItem.quantity}</li>
                                </div>
                                
                            )
                        })
                       }
                    </div>
                    </div>
            )
})}
        
        </div>
        </div>
        }
        
        </> 
    )  
}

export default Profile;