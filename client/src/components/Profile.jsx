import React from "react";
import { useEffect, useState } from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import './Admin.css'


const Profile = (props) => {
    const {isLoggedIn, currentUser} = props;

    return (
        <>
        {isLoggedIn ?
        <h2>Welcome, {currentUser}</h2>
        :
        <h2>Welcome! Please login to get started!</h2>

        }
        <div className='profileBody'>
            <h3>Order History</h3>
        </div>
        </> 
    )  
}

export default Profile;