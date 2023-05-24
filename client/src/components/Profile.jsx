import React from "react";
import { useEffect, useState } from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import './Profile.css'
//import {carts} from './Carts.jsx';
const Profile = (props) => {
    const {isLoggedIn, currentUser, token, cartsList, setCartsList } = props;
    const [userCartsList, setUserCartsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserCarts = async () => {
            try{
                const carts = await getAllCarts();
                const filteredCarts = carts.filter((cart) => cart.userId === currentUser.div
                );
                setUserCartsList(filteredCarts);
            } catch (error){
                console.error(error);
            }
        };
        fetchUserCarts()
    }, [currentUser.id]);
    return (
        <>
        {isLoggedIn ?
        <div className="welcome">
           <div><h2>Welcome, {currentUser}</h2>
           <button onClick={() => navigate('./UpdateUserInfo.jsx')}>Update Information</button>
           </div> 

        <div className='profileBody'>
            <h3>   Order History :</h3>
            {userCartsList.map((cart, index) =>{
                return(
                    <li key={index}>
                        <h3>Order Number : {cart.Id}</h3>
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