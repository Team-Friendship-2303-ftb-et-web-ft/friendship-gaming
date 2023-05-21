import React from "react";
import SearchBar from "./SearchBar";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";
import './Header.css';

const Header = ({ setCurrentUser, isLoggedIn, setIsLoggedIn, setToken }) => {
    const navigate = useNavigate();
    return (
        <>
        <section className="header">
            <div>
                "Logo image here"
            </div>
            <div className="navSearch">
            <SearchBar  />
            </div>
            <nav id="navBar">
            <button className="nav"
                onClick={() => {
                    navigate('/')
                    }}><p>
                    <span className="bg"></span>
                    <span className="base"></span>
                    <span className="text">Home</span>
                    </p>
                    </button>
                {isLoggedIn ?
                <button className="nav"
                    onClick={() => {
                        setIsLoggedIn(false);
                        setCurrentUser('');
                        setToken('');
                            localStorage.removeItem('currentUser');
                            localStorage.removeItem('token');
                            navigate('/Home');  
                                }}
                                > <p>
                                <span className="bg"></span>
                                <span className="base"></span>
                                <span className="text">Log Out</span>
                                </p>
                                </button> 
                            :
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
                         }
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
        </section>

        </>

    );
};

export default Header;