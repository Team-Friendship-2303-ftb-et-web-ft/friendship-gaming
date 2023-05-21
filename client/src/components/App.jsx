import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Header from './Header';
import { Home, Admin, Cart, Checkout, Error, Games, Login, 
  Profile, Register, SearchBar, SingleGame} from "./index";
import reactLogo from '../assets/react.svg'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser,setCurrentUser] = useState('');
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [gamesList, setGamesList] = useState([]);
  const [cartsList, setCartsList] = useState([]);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [selectedCart, setSelectedCart] = useState({});
  const [selectedGame, setSelectedGame] = useState({})

  useEffect(() => {
    const getInitialData = async () => {
      try {
        let games = await getAllGames();
        setGamesList(games);

        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getInitialData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try{
      if (token) {
      const fetchedUser = await getMe(token);
     setCurrentUser(fetchedUser) 
    }
    }
    catch (error) {
    console.error(error)
    }
    };
      fetchUser()
  }, {token});

  return (
    <> 
     <Header 
        isLoggedIn ={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setToken={setToken}/>
    <Routes>
      <Route path="/" element= {<Home/>}/>
      <Route path="/Admin" element= {<Admin/>}/>
      <Route path="/Cart" element= {<Cart/>}/>
      <Route path="/Checkout" element= {<Checkout/>}/>
      <Route path="/Error" element= {<Error/>}/>
      <Route path="/Games" element= {<Games/>}/>
    
      <Route path="/Login" element= {<Login/>}/>
      <Route path="/Profile" element= {<Profile/>}/>
      <Route path="/Register" element= {<Register/>}/>
      <Route path="/SearchBar" element= {<SearchBar/>}/>
      <Route path="/SingleGame" element= {<SingleGame/>}/>
      
    </Routes> 
    
    <div className="App">
      <div>
        
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
    </>
  )
}

export default App
