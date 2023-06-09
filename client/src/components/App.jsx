import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Header from './Header';
import { Footer, Home, Admin, Cart, Checkout, Error, Games, Login, 
  Profile, Register, SearchBar, SingleGame, CreateGameForm, UpdateUserForm} from "./index";
import reactLogo from '../assets/react.svg'
import {getAllGames, getAllUsers, getMe, getUsersWithInfo} from '../api';
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser,setCurrentUser] = useState('');
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [gamesList, setGamesList] = useState([]);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [selectedCart, setSelectedCart] = useState({});
  const [selectedGame, setSelectedGame] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [game, setGame] = useState(null);
  const [currentCart, setCurrentCart] = useState({});
  const [userCartsList, setUserCartsList] = useState([]);

  const updateCurrentCart = (newCart) => {
    setCurrentCart(newCart);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('currentUser');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setCurrentUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);
 
  useEffect(() => {
    const fetchUser = async () => {
      try{
        if (token) {
          const fetchedUser = await getMe(token);
          console.log('thisis fetched user ',fetchedUser);
          setIsAdmin(fetchedUser.user.isAdmin);
          setCurrentUser(fetchedUser)
        }
      }
    catch (error) {
    console.error(error)
    }
    };
      fetchUser()
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      try{
          let allUsers = await getAllUsers();
          console.log(allUsers);
          setUsersList(allUsers);
      }
    catch (error) {
    console.error(error);
    }
    };
      fetchUsers()
  }, []);


  useEffect(() => {
    const fetchGames = async () => {
      try{
          const fetchedGames = await getAllGames();
          // console.log(fetchedGames);
          setGamesList(fetchedGames);
      }
    catch (error) {
    console.error(error);
    }
    };
      fetchGames()
  }, []);

  return (
    <> 
    
     <Header 
        isLoggedIn ={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setToken={setToken}/>
      <div className="background-container">
          <div className="background-image"></div>
        </div>
    <Routes>
      <Route path="/" element= {<Home gamesList={gamesList} setGamesList={setGamesList}  />}/>


      <Route path="/Admin" element= {<Admin token={token} isAdmin={isAdmin} gamesList={gamesList} setGamesList={setGamesList} currentUser={currentUser} />}/>


      <Route path="/Cart" element= 
      {<Cart
        isLoggedIn={isLoggedIn}
        userCartsList={userCartsList}
        setUserCartsList={setUserCartsList}
        currentUser={currentUser}
        token={token}
      />}/>


      <Route path="/Checkout" element=
       {<Checkout
        userCartsList={userCartsList}
        setUserCartsList={setUserCartsList}
        currentUser={currentUser}
        token={token}
        setCurrentCart={setCurrentCart}
       />}/>

      <Route path="/Error" element= {<Error/>}/>

      <Route path="/Games" element= {<Games/>}/>

      <Route path="/CreateGame" element= {<CreateGameForm/>}/>

      <Route path="/UpdateGame" element= {<CreateGameForm/>}/>
    
      <Route path="/Login" element= {<Login token={token}
          setToken={setToken} 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser}  
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}/>}/>

      <Route path="/UpdateUser" element= {<UpdateUserForm currentUser={currentUser} token={token}/>}/>

      <Route path="/Profile" element= {<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
      currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} cartItemsList={cartItemsList} 
      setCartItemsList={setCartItemsList} userCartsList={userCartsList} setUserCartsList={setUserCartsList} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}/>

      <Route path="/Register" element= {<Register isLoggedIn ={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setToken={setToken}
        currentCart={currentCart} setCurrentCart={setCurrentCart}/>}/>

      <Route path="/SearchBar" element= {<SearchBar gamesList={gamesList}/>}/>

      <Route path="/games/:gameId" element= {
      <SingleGame 
        game={game} 
        currentUser={currentUser} 
        currentCart={currentCart} 
        token={token} 
        setGame={setGame}
        updateCurrentCart={updateCurrentCart} 
      />
    }/>

    </Routes> 
      <Footer/>
    
    <div className="App">
      <div>
        
        
      </div>
    </div>
    </>
  )
}

export default App
