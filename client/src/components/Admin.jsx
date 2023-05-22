import React from "react";
import {CreateGameForm} from "./index";
import {NavLink, useNavigate} from 'react-router-dom';
import './Admin.css'

const Admin = ({gamesList}) => {
    const isAdmin = true;
    console.log(gamesList);
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
        {isAdmin &&
        gamesList.map(game => {


            return (
            
                <div key={game.id} id="allGames">
                <p>{game.id}</p>
                <p>{game.authorName}</p>
                <p>{game.genre}</p>
                <p>{game.title}</p>
                {/* <p>{game.tags}</p> */}
                <p>{game.price}</p>
                <p>{game.inventory}</p>
                <p>{game.featured}</p>
                <p>{game.description}</p>
                <button onClick={handleUpdateGame}>Update</button>
                </div>
           
           
           )
           
        })
    }
        <button onClick={handleCreateGame}>Add Game</button>
        <h1>This is Admin!</h1>
        </> 
    )  
}

export default Admin;