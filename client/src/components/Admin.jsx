import React, { useState, useEffect } from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import {getUsersWithInfo} from '../api';
import './Admin.css'

const Admin = ({gamesList}) => {
    const navigate = useNavigate();
    //delete this when done
    const isAdmin = true;
    //
    const [usersList, setUsersList] = useState([]);
    const [showGames, setShowGames] = useState(true);
    // const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
      const fetchUsers = async () => {
        try{
          const token = localStorage.getItem("token");
          const fetchedUsers = await getUsersWithInfo(token);
          console.log(fetchedUsers)
          setUsersList(fetchedUsers)
        } catch (error) {
          console.error(error)
        }
      };
        fetchUsers()
    }, []);

    return (
        <>
            <div id="outerContainer">
              <div id="adminTabs">
                <h1 className="admin">Admin Dashboard</h1>
                {/* <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button> */}

                <button onClick={()=>{
                  setShowGames(true);
                  // setShowUsers(false);
                }}>Games</button>
                {/* <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
                {/* <button className="add" onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
                {showGames&&
                <button className="add" onClick={()=>{navigate('/CreateGame')}}>Add Game</button>
                }
                <button onClick={()=>{
                    setShowGames(false);
                    // setShowUsers(true);
                }}>Users</button>
                {!showGames&& 
                <button className="add" onClick={()=>{setShowGames(false);}}>Add User</button>
                }
              </div>
              <div id="adminInfo">
          {/* SEE ALL GAMES */}
          {showGames ?
                <div className="container">
   
                  <CreateGameForm />

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
                </div> :
                <div className="container">
                  <CreateGameForm />
                </div>
          }
          </div>
        </div>
        </> 
    )  
}

export default Admin;

// {/* ADMIN HOME */}
// {adminRequest.includes('adminDb') &&
// <div id="outerContainer">
//   <div id="adminTabs">
//     <h1 className="admin">Admin Dashboard</h1>
//     <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
//     <button onClick={()=>{setAdminRequest('seeGames')}}>Games</button>
//     <button onClick={()=>{setAdminRequest('seeUsers')}}>Users</button>
//   </div>
//   <div id="adminHome">
//     <h1>This is Home!</h1>
//   </div>
// </div>
// }

// {/* ADD GAME BUTTON */}
// {adminRequest.includes('createGame') &&
// <div id="outerContainer">
//   <div id="adminTabs">
//     <h1 className="admin">Admin Dashboard</h1>
//     <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
//     {/* <p>Games</p> */}
//     <button onClick={()=>{setAdminRequest('seeGames')}}>Games</button>
//     {/* <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
//     <button className="add" onClick={()=>{navigate('/CreateGame')}}>Add Game</button>
//     <button onClick={()=>{setAdminRequest('seeUsers')}}>Users</button>
//     {/* <button className="add" onClick={()=>{setAdminRequest('addUser')}}>Add User</button> */}
//   </div>
//     <h1>This is create game!</h1>
// </div>
// }

// {/* SEE ALL USERS */}
// {adminRequest.includes('seeUsers') &&
// <div id="outerContainer">
//   <div id="adminTabs">
//     <h1 className="admin">Admin Dashboard</h1>
//     <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
//     <button onClick={()=>{setAdminRequest('seeGames')}}>Games</button>
//     <button onClick={()=>{setAdminRequest('seeUsers')}}>Users</button>
//     <button className="add" onClick={()=>{setAdminRequest('addUser')}}>Add User</button>
//   </div>
//   <div id="adminInfo">
//     {/* 
//     <div className="stats">
//         <div className="total">
//             <p>Total Users:</p>
//             <p>{usersList.length}</p>
//         </div>
//         <div className="total">
//             <p>Total Users Created Today:</p>
//             <p>{usersList.length}</p>
//         </div>
//         <div className="total">
//             <p>Total Admin Users:</p>
//             <p>{usersList.length}</p>
//         </div>
//     </div> */}
//     <div className="usersList">
//         {isAdmin &&
//         usersList.map(user => {
//             return(
//                 <div key={user.id} className="user">
//                     <p>User: {user.username}</p>
//                     <div className="button">
//                     <button onClick={console.log('add update form function here')}>Update</button>
//                     <button onClick={() => {console.log('add delete function here')}}>Delete</button>
//                     </div>
//                 </div>
//                 )
//             })
//         }
//     </div>
//   </div>
// </div>
// }

// {/* ADD USER BUTTON */}
// {adminRequest.includes('addUser') &&
// <div id="outerContainer">
//   <div id="adminTabs">
//     <h1 className="admin">Admin Dashboard</h1>
//     <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
//     {/* <p>Games</p> */}
//     <button onClick={()=>{setAdminRequest('seeGames')}}>Games</button>
//     <button className="add" onClick={()=>{setAdminRequest('createGame')}}>Add Game</button>
//     <button onClick={()=>{setAdminRequest('seeUsers')}}>Users</button>
//     <button className="add" onClick={()=>{setAdminRequest('addUser')}}>Add User</button>
//   </div>
//     <h1>This is Add User!</h1>
// </div>
// }

// {/* SEE ALL GAMES */}
// {adminRequest.includes('seeGames') &&
// <div id="outerContainer">
//   <div id="adminTabs">
//     <h1 className="admin">Admin Dashboard</h1>
//     <button onClick={()=>{setAdminRequest('adminDb')}}>Home</button>
//     {/* <p>Games</p> */}
//     <button onClick={()=>{setAdminRequest('seeGames')}}>Games</button>
//     {/* <button onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
//     {/* <button className="add" onClick={()=>{setAdminRequest('createGame')}}>Add Game</button> */}
//     <button className="add" onClick={()=>{navigate('/CreateGame')}}>Add Game</button>
//     <button onClick={()=>{setAdminRequest('seeUsers')}}>Users</button>
//   </div>
//   <div id="adminInfo">
//     <div className="container">
//       {isAdmin &&
//         gamesList.map(game => {
//         let tagArr = [] 

//         if (game.tags.length) {
//           let tagNames = Object.values(game.tags);

//           tagNames.map(tag => {
//               tagArr.push(tag.name);
//           })
//         }

//         return (
//           <div key={game.id} id="game">
//           <div className="titlebox">
//               <p className="title">{game.title}</p>
//               {game.featured && <p className="featured">(Featured)</p>}
//           </div>
//           <p>Author: {game.authorName}</p>
//           <p>Genre: {game.genre}</p>
//           {game.tags.length ? <p>Tags: {tagArr.join(' ')}</p> :<p>Tags: N/A</p>} 
//           <p>Price: {game.price}</p>
//           <p>Inventory: {game.inventoryqty}</p>
//           <p>Description: {game.description}</p>
//           <div className="button">
//               <button onClick={console.log('add update form function here')}>Update</button>
//               <button onClick={() => {console.log('add delete function here')}}>Delete</button>
//           </div>
//           </div>
//         )
//         })
//       }
//     </div>
//   </div>
// </div>
// }