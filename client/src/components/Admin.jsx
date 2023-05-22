import React, { useState, useEffect } from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import './Admin.css'

const Admin = ({gamesList}) => {
    const navigate = useNavigate();
    //delete this when done
    const isAdmin = true;
    //

    const [adminRequest, setAdminRequest] = useState('adminDb');

    useEffect(()=>{
        // console.log('adminRequest changed')
    }, [adminRequest])
    
    return (
        <>

          {adminRequest.includes('adminDb') &&
            <div id="outerContainer">
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>
                <button onClick={()=>{setAdminRequest('adminDb')}}>Admin Home</button>
                <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button>
                <button onClick={()=>{setAdminRequest('seeGames')}}>See Games</button>
              </div>
                <h1>This is Profile!</h1>
            </div>
          }
          {adminRequest.includes('createGame') &&
            <div id="outerContainer">
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>
                <button onClick={()=>{setAdminRequest('adminDb')}}>Admin Home</button>
                <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button>
                <button onClick={()=>{setAdminRequest('seeGames')}}>See Games</button>
              </div>
                <h1>This is create game!</h1>
            </div>
          }
          {adminRequest.includes('seeGames') &&
            <div id="outerContainer">
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>
                <button onClick={()=>{setAdminRequest('adminDb')}}>Admin Home</button>
                <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button>
                <button onClick={()=>{setAdminRequest('seeGames')}}>See Games</button>
              </div>
              <div id="adminInfo">
                <div className="container">
                  {isAdmin &&
                    gamesList.map(game => {
                    let tagArr = [] 

                    if (game.tags.length) {
                      let tagNames = Object.values(game.tags);
    
                      tagNames.map(tag => {
                          tagArr.push(tag.name);
                      })
                    }
    
                    return (
                      <div key={game.id} id="game">
                      <div className="titlebox">
                          <p className="title">{game.title}</p>
                          {game.featured && <p className="featured">(Featured)</p>}
                      </div>
                      <p>Author: {game.authorName}</p>
                      <p>Genre: {game.genre}</p>
                      {game.tags.length ? <p>Tags: {tagArr.join(' ')}</p> :<p>Tags: N/A</p>} 
                      <p>Price: {game.price}</p>
                      <p>Inventory: {game.inventoryqty}</p>
                      <p>Description: {game.description}</p>
                      <div className="button">
                          <button onClick={console.log('add delete function here')}>Update</button>
                          <button onClick={() => {console.log('add delete function here')}}>Delete</button>
                      </div>
                      </div>
                    )
                    })
                  }
                </div>
              </div>
            </div>
          }
        </> 
    )  
}

export default Admin;