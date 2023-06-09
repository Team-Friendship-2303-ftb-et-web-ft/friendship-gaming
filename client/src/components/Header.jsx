import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";
import './Header.css';

const Header = ({ setCurrentUser, isLoggedIn, setIsLoggedIn, setToken, gamesList, setGamesList}) => {
    const navigate = useNavigate();
    return (
        <>
        <section className="header" id="header-component">
            <div className="logo">
            <a onClick={() => navigate('./') } target="_blank">
          <img src="/images/logo3t.png" className="logoimage" alt=" logo" />
        </a>     
        </div>          

                {isLoggedIn ?
                       <nav id="navBar">
                       <button className="nav" onClick={() => { 
                           navigate('/');
                        //    window.location.reload();
                           }}>
                           <p>
                           <span className="bg"></span>
                           <span className="base"></span>
                           <span className="text">Home</span>
                           </p>
                           </button>
                <button className="nav"
                    onClick={() => {
                        setIsLoggedIn(false);
                            localStorage.removeItem('currentUser');
                            localStorage.removeItem('token');
                            navigate('/');  
                                }}
                                > <p>
                                <span className="bg"></span>
                                <span className="base"></span>
                                <span className="text"> Log Out </span>
                                </p>
                                </button> 
                     <button className="nav"
                                onClick={() => {
                                    navigate('/Profile');
                                }}
                            > <p>
                            <span className="bg"></span>
                            <span className="base"></span>
                            <span className="text">Profile</span>
                            </p> 
                            </button>
                                <button className="nav"
                         onClick={() => {
                            navigate('/Cart')
                         }}>
                            <p>
                    <span className="bg"></span>
                    <span className="base"></span>
                    <span className="text">Cart</span>
                    </p>
                         </button>
                        
                         </nav>
                            :
                            <nav>
                        <button className="nav" onClick={() => { 
                           navigate('/');
                           }}>
                           <p>
                           <span className="bg"></span>
                           <span className="base"></span>
                           <span className="text">Home</span>
                           </p>
                           </button>
                            <button className="nav"
                                onClick={() => {
                                    navigate('/Login');
                                }}
                            > <p>
                            <span className="bg"></span>
                            <span className="base"></span>
                            <span className="text">Log In</span>
                            </p> 
                            </button>
                         
                         </nav>
                         }
            
                         

           
        </section>

        </>

    );
};


export default Header;