import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import './SingleGame.css';

function SingleGame() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(`api/games/${gameId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const game = await response.json();
      setGame(game);
    };
    fetchGame();
  }, [gameId]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div className="single-game-component">
      <h1 className="game-title">{game.title}</h1>
      <img className="game-image" src="placeholder.png" alt={game.title}/>
      <div className="game-info">
        <p className="game-author">By {game.authorName}</p>
        <p className="game-description">{game.description}</p>
        <p className="game-price">${game.price}</p>
        <p className="game-tags">{game.tags.map(tag => tag.name).join(', ')}</p>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
}

export default SingleGame;
