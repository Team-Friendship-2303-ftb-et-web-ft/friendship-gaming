import React, { useReducer } from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import './Admin.css'

const Admin = ({gamesList}) => {
    //delete this when done
    const isAdmin = true;
    //

    const navigate = useNavigate();

    const handleUpdateUser = () => {
        console.log('in progess')
    };
    
    const handleCreateGame = () => {
        navigate('/CreateGame');
    };

    const handleUpdateGame = () => {
        navigate('/UpdateGame');
    };
    
    return (
        <>
        <h1>This is Admin!</h1>
        <button onClick={handleCreateGame}>Add Game</button>
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
                <div key={game.id} id="allGames">
                        <div className="titlebox">
                          <p className="title">{game.title}</p>
                          {game.featured &&
                            <p className="featured">(Featured)</p>
                          }
                        </div>

                        <p>Author: {game.authorName}</p>
                        <p>Genre: {game.genre}</p>

                        {game.tags.length ? 
                        <p>Tags: {tagArr.join(' ')}</p> :
                        <p>Tags: N/A</p>
                        } 

                        <p>Price: {game.price}</p>
                        <p>Inventory: {game.inventoryqty}</p>
                        {/* <p>Featured: {game.featured}</p> */}
                        <p>Description: {game.description}</p>
                        <button onClick={handleUpdateGame}>Update</button>
                        <button onClick={() => {console.log('add delete function here')}}>Delete</button>
                    </div>
                )
        })
    }
        </> 
    )  
}

export default Admin;