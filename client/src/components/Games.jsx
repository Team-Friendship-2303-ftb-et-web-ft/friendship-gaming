import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const getAllGames = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/games/`, {
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
          <Link to={`/games/${game.id}`} style={{ textDecoration: 'none' }} key={game.id}>
            <div className="game-card">
              <img className="game-image" src="/images/fotor-ai-20230516102519.jpg" alt={game.title}/>
              <div className="game-info">
                <h2 className="game-title">{game.title}</h2>
                <div className="hover-info">
                  <p className="game-tags">Game Tags: {game.tags.map(tag => tag.name).join(', ')}</p>
                </div>
              </div>
            </div>
          </Link>
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
          <Link to={`/games/${game.id}`} style={{ textDecoration: 'none' }} key={game.id}>
            <div className="game-card">
              <img className="game-image" src="/images/fotor-ai-20230516102524.jpg" alt={game.title}/>
              <div className="game-info">
                <h2 className="game-title">{game.title}</h2>
                <div className="hover-info">
                  <p className="game-tags">Game Tags: {game.tags.map(tag => tag.name).join(', ')}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Games;
