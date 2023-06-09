import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleGame.css';
import { getCartByUserId, createCartItems } from '../api';

function SingleGame({game, currentUser, token, currentCart, setGame}) {
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
      <img id="single-game-image" src={game.imageurl} alt={game.title}/>
      <div id="single-game-info">
        <div className="game-details">
          <p className="game-description">{game.description}</p>
          <div className="game-tags">
          {game.tags && Array.isArray(game.tags) && game.tags.map(tag => <span key={tag.id} className="tag">{tag.name}</span>)}

          </div>
        </div>
        <div className="game-purchase">
          <p className="game-price">${game.price}</p>
          <button id="add-to-cart-button" onClick={async()=>{
            console.log("This is current Cart:", currentCart)
            // const usercart = await getCartByUserId(2);
            // console.log(usercart);
            createCartItems({cartId: currentCart.newCart.id, gameId: game.id, quantity:1, priceAtPurchase: game.price}, token)
            }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default SingleGame;
