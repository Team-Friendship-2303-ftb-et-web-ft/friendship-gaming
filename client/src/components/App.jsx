import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Admin, Cart, Checkout, Error, Games, Header, Login, 
  Profile, Register, SearchBar, SingleGame} from "./index";
import reactLogo from '../assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element= {<Home/>}/>
      <Route path="/Admin" element= {<Admin/>}/>
      <Route path="/Cart" element= {<Cart/>}/>
      <Route path="/Checkout" element= {<Checkout/>}/>
      <Route path="/Error" element= {<Error/>}/>
      <Route path="/Games" element= {<Games/>}/>
      <Route path="/Header" element= {<Header/>}/>
      <Route path="/Login" element= {<Login/>}/>
      <Route path="/Profile" element= {<Profile/>}/>
      <Route path="/Register" element= {<Register/>}/>
      <Route path="/SearchBar" element= {<SearchBar/>}/>
      <Route path="/SingleGame" element= {<SingleGame/>}/>
      
    </Routes> 
    
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
    </>
  )
}

export default App
