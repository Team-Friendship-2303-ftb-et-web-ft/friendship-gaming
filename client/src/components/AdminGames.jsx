import React, { useState } from 'react';
import EditGameForm from './EditGameForm';
import { destroyGame } from '../api';
import './Admin.css';

const AdminGames = ({ gamesList, setGamesList, token, isAdmin }) => {
    const [selectedGameId, setSelectedGameId] = useState(null);

    const deleteGame = async (gameId) => {
        try {
            await destroyGame(gameId, token);
            const updatedGames = gamesList.filter(game => game.id !== gameId);
            setGamesList(updatedGames);
        } catch (error) {
            console.error(`Failed to delete game: ${error}`);
        }
    };

    const handleUpdate = (updatedGame) => {
        setSelectedGameId(null);
        setGamesList(gamesList.map(game => game.id === updatedGame.id ? updatedGame : game));
    };

    return (
        <div className="container">
            {isAdmin && gamesList.map(game => {
                let tagArr = [];
                if (game.tags.length) {
                    let tagNames = Object.values(game.tags);
                    tagNames.map(tag => tagArr.push(tag.name));
                }
                return (
                    <div key={game.id} id="game">
                        <div className="titlebox">
                            <p className="title">{game.title}</p>
                            {game.featured && <p className="featured">(Featured)</p>}
                        </div>
                        <p>Author: {game.authorName}</p>
                        <p>Genre: {game.genre}</p>
                        {game.tags.length ? <p>Tags: {tagArr.join(' ')}</p> : <p>Tags: N/A</p>}
                        <p>Price: {game.price}</p>
                        <p>Inventory: {game.inventoryqty}</p>
                        <p>Description: {game.description}</p>
                        <div className="button">
                            <button onClick={() => setSelectedGameId(game.id)}>Update</button>
                            <button onClick={() => deleteGame(game.id)}>Delete</button>
                        </div>
                        {selectedGameId === game.id && 
                            <EditGameForm
                                game={game}
                                token={token}
                                onGameUpdate={handleUpdate}
                                onCancel={() => setSelectedGameId(null)}
                            />
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default AdminGames;
