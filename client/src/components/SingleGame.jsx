import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const getGameById = async (gameId) => {
  try {
    const response = await fetch(`api/games/${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const game = await response.json();
    return game;
  } catch (err) {
    console.error(err);
  }
}

function SingleGame() {
  const [game, setGame] = useState(null);
  const { gameId } = useParams();

  useEffect(() => {
    getGameById(gameId).then(game => setGame(game));
  }, [gameId]);

  if (!game) return 'Loading...';

  return (
    <div className="single-game-component">
      <img className="game-image" src={game.imageUrl} alt={game.title}/>
      <div className="game-info">
        <h2 className="game-title">{game.title}</h2>
        <p className="game-description">{game.description}</p>
        <p className="game-price">{game.price}</p>
        <p className="game-author">{game.authorName}</p>
        <p className="game-tags">{game.tags.map(tag => tag.name).join(', ')}</p>
      </div>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
}

export default SingleGame;
