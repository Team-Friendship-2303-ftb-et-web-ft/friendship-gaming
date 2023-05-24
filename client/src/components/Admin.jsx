import React, { useState, useEffect } from "react";
import {CreateGameForm, AdminGames, AdminUsers} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import {getUsersWithInfo} from '../api';
import './Admin.css'

const Admin = ({gamesList, currentUser, isAdmin}) => {
    const navigate = useNavigate();

    const [adminUsersList, setAdminUsersList] = useState([]);
    const [showGames, setShowGames] = useState(true);
    const [showAddGameForm, setShowAddGameForm] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const token = localStorage.getItem("token");
          const fetchedUsers = await getUsersWithInfo(token);
          setAdminUsersList(fetchedUsers.usersWithInfo)
        } catch (error) {
          console.error(error)
        }
      };
        fetchUsers()
    }, []);

    return (
        <>
            <div id="outerContainer">
      {/******************************* SIDEBAR *******************************/}
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>

                <button onClick={()=>{
                  setShowGames(true);
                  setShowUsers(false);
                  setShowAddGameForm(false);
                }}>Games</button>
                
                {(showGames || showAddGameForm) &&
                <button className="add" onClick={()=>{
                  setShowGames(false);
                  setShowUsers(false);
                  setShowAddGameForm(true);
                }}>Add Game</button>
                }

                <button onClick={()=>{
                  setShowGames(false);
                  setShowUsers(true);
                  setShowAddGameForm(false);
                }}>Users</button>

                {/* {showUsers&& 
                <button className="add" onClick={()=>{setShowGames(false);}}>Add User</button>
                } */}
              </div>
      {/***********************************************************************/}
              <div id="adminInfo">
                {/* SEE ALL GAMES */}
                {showGames &&
                  <div className="container">
                    <AdminGames gamesList={gamesList} isAdmin={isAdmin}/>
                  </div>
                }
                {showAddGameForm &&
                  <div className="container">
                    <CreateGameForm />
                  </div>
                }
                {showUsers &&
                  <div className="container">
                    <AdminUsers gamesList={gamesList} isAdmin={isAdmin} adminUsersList={adminUsersList}/>
                    <p>coming soon</p>
                  </div>
                }
              </div>
          </div>
        </> 
    )  
}


export default Admin;