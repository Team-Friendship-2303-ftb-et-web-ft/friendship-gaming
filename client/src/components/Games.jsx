import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const getAllGames = async () => {
  try {
    const response = await fetch(`/api/games`, {
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
  const [filteredGames, setFilteredGames] = useState([]);
  const [activeGenre, setActiveGenre] = useState('All Games');

  useEffect(() => {
    getAllGames().then(games => {
      setGames(games);
      setFilteredGames(games);
    });
  }, []);

  const featuredGames = games.filter(game => game.featured);
  const genres = ["Action", "FPS", "Horror", "Arcade", "All Games"];

  const filterByGenre = (genre) => {
    setActiveGenre(genre);
    if (genre === 'All Games') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => game.genre === genre);
      setFilteredGames(filtered);
    }
  }

  return (
    <div id="game-component">
      <h1 id="featured-title">Featured Games</h1>
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
          <button className="genre-button" key={index} onClick={() => filterByGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>

      <h1 id="all-games-title">{activeGenre}</h1>
      <div id="all-games-section">
        {filteredGames.map(game => (
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
