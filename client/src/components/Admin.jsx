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
    }
    const handleUpdateGame = () => {
        navigate('/UpdateGame');
    }
    
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
                        <p>{game.id}</p>
                        <p>{game.authorName}</p>
                        <p>{game.genre}</p>
                        <p>{game.title}</p>

                        {game.tags.length ? 
                        <p>{tagArr.join(' ')}</p> :
                        <p>No Game Tags Yet!</p>
                        } 

                        <p>{game.price}</p>
                        <p>{game.inventory}</p>
                        <p>{game.featured}</p>
                        <p>{game.description}</p>
                        <button onClick={handleUpdateGame}>Update</button>
                    </div>
                )
        })
    }
        </> 
    )  
}

export default Admin;