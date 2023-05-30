import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleGame.css';

function SingleGame({game, setGame}) {
  const { gameId } = useParams();


  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(`/api/games/${gameId}`, {
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
    <div id="single-game-component">
      <div id="game-header">
        <h1 id="single-game-title">{game.title}</h1>
        <p className="game-author">By {game.authorName}</p>
      </div>
      <img id="single-game-image" src={game.imageUrl || "/images/fotor-ai-20230516102519.jpg"} alt={game.title}/>
      <div id="single-game-info">
        <div className="game-details">
          <p className="game-description">{game.description}</p>
          <div className="game-tags">
            {game.tags.map(tag => <span className="tag">{tag.name}</span>)}
          </div>
        </div>
        <div className="game-purchase">
          <p className="game-price">${game.price}</p>
          <button id="add-to-cart-button">Buy</button>
        </div>
      </div>
    </div>
  );
}

export default SingleGame;
