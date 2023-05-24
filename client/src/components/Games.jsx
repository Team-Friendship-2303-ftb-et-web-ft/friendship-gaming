import React, { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const getAllGames = async () => {
  try {
    const response = await fetch(`api/games`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const games = await response.json();
    return games;
  } catch (err) {
    console.error(err);
  }
}

function Games() {

  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames().then(games => setGames(games));
  }, []);

  const featuredGames = games.filter(game => game.featured);

  const genres = ["Action", "Shooter", "Horror", "Arcade"];

  return (
    <div id="game-component">

      <h1 id="featured-title">Featured</h1>
      <div id="featured-section">
        {featuredGames.map(game => (
          <div className="game-card" key={game.id}>
            <img className="game-image" src="placeholder.png" alt={game.title}/>
            <div className="game-info">
            <Link to={`/games/${game.id}`} className="game-title">{game.title}</Link>
              <p className="game-description">{game.description}</p>
              <p className="game-price">{game.price}</p>
              <p className="game-author">{game.authorName}</p>
              <p className="game-tags">{game.tags.map(tag => tag.name).join(', ')}</p>

            </div>
          </div>
        ))}
      </div>

      <h1 id="genre-title">Genres</h1>
      <div id="genre-section">
        {genres.map((genre, index) => (
          <button className="genre-button" key={index}>{genre}</button>
        ))}
      </div>

      <h1 id="all-games-title">All Games</h1>
      <div id="all-games-section">
        {games.map(game => (
          <div className="game-card" key={game.id}>
            <img className="game-image" src="placeholder.png" alt={game.title}/>
            <div className="game-info">
            <Link to={`/games/${game.id}`} className="game-title">{game.title}</Link>
              <p className="game-description">{game.description}</p>
              <p className="game-price">{game.price}</p>
              <p className="game-author">{game.authorName}</p>
              <p className="game-tags">{game.tags.map(tag => tag.name).join(', ')}</p>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Games;
