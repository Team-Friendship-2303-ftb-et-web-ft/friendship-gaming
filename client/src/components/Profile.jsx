import React from "react";
import { useEffect, useState } from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import './Profile.css'
import { getAllCarts, getCartByUserId } from "../api";
const Profile = (props) => {
    const {isLoggedIn, currentUser, token, cartsList, setCartsList } = props;
    const [userCartsList, setUserCartsList] = useState([]);
    const navigate = useNavigate();
console.log(currentUser)
    useEffect(() => {
        const fetchUserCarts = async () => {
            console.log(token)
            console.log(currentUser.user.id)
            try{
             const userCarts = await getCartByUserId(currentUser.user.id, token);
             setUserCartsList(userCarts.userCart)
            } catch (error){
                console.error(error);
            }
        };
        fetchUserCarts()
    }, []);
    return (
        <>
        {isLoggedIn ?
        <div className="welcome">
           <div><h2>Welcome, {currentUser.user.username} </h2>
           <button onClick={() => navigate('./UpdateUserInfo.jsx')}>Update Information</button>
           </div> 

        <div className='profileBody'>
            <h3>   Order History :</h3>
        
            {userCartsList.map((cart, index) =>{

                return(
                    <li key={index}>
                        <h3>Order Number : {userCart.cart.Id}</h3>
                        <p>Item Qty :</p>
                        <p>Purchase Total: </p>
                    </li>
            )
            })}
            
        </div>
        </div>
        :
        <h2>Welcome! Please login to get started!</h2>

        }
        
        </> 
    )  
}

export default Profile;