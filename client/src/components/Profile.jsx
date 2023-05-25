import React from "react";
import { useEffect, useState } from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import './Profile.css'
import { getCartItemsById, getCartByUserId } from "../api";
const Profile = (props) => {
    const {isLoggedIn, currentUser, token, cartsList, setCartsList } = props;
    const [userCartsList, setUserCartsList] = useState([]);
    const navigate = useNavigate();
    const userCartItems = getCartItemsById(2);
    console.log(userCartItems)

    useEffect(() => {
        const fetchUserCarts = async () => {
            console.log(token)
            console.log(currentUser.user.id)
                console.log("This is carts:", carts);
                
                const filteredCarts = carts.filter(cart => cart.userId == currentUser.div);
                setUserCartsList(filteredCarts);            try{

             const userCarts = await getCartByUserId(currentUser.user.id, token);
             setUserCartsList(userCarts.userCart)

            } catch (error){
                console.error(error);
            }
        };
        fetchUserCarts()
    }, []);

    //I need to create an array of all item qty's where the cart.id matches then loop through the array and gather a sum, give it a variable and call it below. same process for purchase total
    function totalQty(arr){ 
        let sum = 0
        for (let i=0; i < arr.length; i += 1){
            sum += arr[i]
        }
        return sum
    }
    return (
        <>
        {isLoggedIn ?
        <div className='profileMain' >
           <div className="welcome"><h2><strong>Welcome, {currentUser.user.username}</strong> </h2>
           <button onClick={() => navigate('./UpdateUserInfo.jsx')} className='update'>Update Information</button>
           </div> 

        <div className='profileBody'>
            <h3>   Order History :</h3>
        
            {userCartsList.map((cart, index) =>{

                return(
                    <div key={index}>
                        <h3>Order Number : {cart.id}</h3>
                        <div className="cartItemsList">
                            <h4>Items:</h4>
                       {

                        // cart.map((cartItem) => {

                        //     return(
                        //         <li></li>
                        //     )
                        // })
                       }
                    </div>
                        <p>Purchase Total: </p>
                    </div>
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