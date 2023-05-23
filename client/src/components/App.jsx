import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Header from './Header';
import { Home, Admin, Cart, Checkout, Error, Games, Login, 
  Profile, Register, SearchBar, SingleGame, CreateGameForm} from "./index";
// import reactLogo from '../assets/react.svg'
import {getAllGames, getMe, getAllUsers} from '../api';
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
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try{
        console.log(token)
        if (token) {
          const fetchedUser = await getMe(token);
          // console.log(fetchedUser)
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
    const fetchGames = async () => {
      try{
          const fetchedGames = await getAllGames();
          setGamesList(fetchedGames)
      }
    catch (error) {
    console.error(error)
    }
    };
      fetchGames()
  }, []);

  //no longer in state so no longer in admin
  useEffect(() => {
    const fetchUsers = async () => {
      try{
          let allUsers = await getAllUsers();
          console.log(allUsers)
          setUsersList(allUsers)
         
      }
    catch (error) {
    console.error(error)
    }
    };
      fetchUsers()
  }, []);

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
      <Route path="/Admin" element= {<Admin gamesList={gamesList} usersList={usersList}/>}/>
      <Route path="/Cart" element= {<Cart/>}/>
      <Route path="/Checkout" element= {<Checkout/>}/>
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
      <Route path="/Profile" element= {<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} />}/>
      <Route path="/Register" element= {<Register isLoggedIn ={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setToken={setToken}/>}/>
      <Route path="/SearchBar" element= {<SearchBar/>}/>
      <Route path="/SingleGame" element= {<SingleGame/>}/>
      
    </Routes> 
    
    <div className="App">
      <div>
        
        
      </div>
    </div>
    </>
  )
}

export default App
