import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";

const Header = ({ setCurrentUser, isLoggedIn, setIsLoggedIn, setToken }) => {
    const navigate = useNavigate();
    return (
        <>
        <section className="header">
            <div>
                "Logo image here"
            </div>
            <nav id="navBar">
                <navLink to="/Home" id="navButton">
                    Home
                </navLink>
                {isLoggedIn ?
                <button
                    onClick={() => {
                        setIsLoggedIn(false);
                        setCurrentUser('');
                        setToken('');
                            localStorage.removeItem('currentUser');
                            localStorage.removeItem('token');
                            navigate('/Home');  
                                }}
                                > Logout </button> 
                            :
                            <button
                                onClick={() => {
                                    navigate('/Login');
                                }}
                            > Log In </button>
                         }
                <navLink to="/Cart" id="navButton">
                    Cart
                </navLink>
            </nav>
        </section>

        </>

    );
};

export default Header;