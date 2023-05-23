import React, { useState, useEffect } from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import './Admin.css'

const Admin = ({gamesList, usersList}) => {
    console.log('UL',usersList)
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
         {/* ADMIN HOME */}
          {adminRequest.includes('adminDb') &&
            <div id="outerContainer">
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>
                <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
                {/* <p>Games</p> */}
                <button onClick={()=>{setAdminRequest('seeGames')}}>See Games</button>
                {/* <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
                {/* <p>Users</p> */}
                <button onClick={()=>{setAdminRequest('seeUsers')}}>See Users</button>
                <button onClick={()=>{setAdminRequest('addUser')}}>Add User</button>
              </div>
              <div id="adminHome">
                <h1>This is Home!</h1>
              </div>
            </div>
          }

          {/* ADD GAME BUTTON */}
          {adminRequest.includes('createGame') &&
            <div id="outerContainer">
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>
                <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
                {/* <p>Games</p> */}
                <button onClick={()=>{setAdminRequest('seeGames')}}>See Games</button>
                {/* <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
                {/* <p>Users</p> */}
                <button onClick={()=>{setAdminRequest('seeUsers')}}>See Users</button>
                <button onClick={()=>{setAdminRequest('addUser')}}>Add User</button>
              </div>
                <h1>This is create game!</h1>
            </div>
          }

          {/* SEE ALL USERS */}
          {adminRequest.includes('seeUsers') &&
            <div id="outerContainer">
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>
                <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
                {/* <p>Games</p> */}
                <button onClick={()=>{setAdminRequest('seeGames')}}>See Games</button>
                {/* <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
                {/* <p>Users</p> */}
                <button onClick={()=>{setAdminRequest('seeUsers')}}>See Users</button>
                <button onClick={()=>{setAdminRequest('addUser')}}>Add User</button>
              </div>
                <div className="usersList">
                <h1>This is see Users!</h1>
                {isAdmin &&
                usersList.map(user => {
                    return(
                        <div key={user.id}>
                            <p>User: {user.username}</p>
                        </div>
                    )
                })
                }
                </div>
            </div>
          }

          {/* ADD USER BUTTON */}
            {adminRequest.includes('addUser') &&
            <div id="outerContainer">
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>
                <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
                {/* <p>Games</p> */}
                <button onClick={()=>{setAdminRequest('seeGames')}}>See Games</button>
                {/* <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
                {/* <p>Users</p> */}
                <button onClick={()=>{setAdminRequest('seeUsers')}}>See Users</button>
                <button onClick={()=>{setAdminRequest('addUser')}}>Add User</button>
              </div>
                <h1>This is Add User!</h1>
            </div>
          }

          {/* SEE ALL GAMES */}
          {adminRequest.includes('seeGames') &&
            <div id="outerContainer">
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>
                <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
                {/* <p>Games</p> */}
                <button onClick={()=>{setAdminRequest('seeGames')}}>See Games</button>
                {/* <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
                {/* <p>Users</p> */}
                <button onClick={()=>{setAdminRequest('seeUsers')}}>See Users</button>
                <button onClick={()=>{setAdminRequest('addUser')}}>Add User</button>
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
                          <button onClick={console.log('add update form function here')}>Update</button>
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