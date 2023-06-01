import React from 'react';
import { Link } from 'react-router-dom';


const GameSearchResult = (props) => {

    const {game, gamesList} = props;

    return(
        <>
          <div className='game-list'>
          <Link to={`/games/${game.id}`} style={{ textDecoration: 'none' }} key={game.id}>
          <div className="game-card">
          <img className="game-image" src={game.imageurl} alt={game.title}/>
          <div className="game-info">
              <h2 className="game-title">{game.title}</h2>
              <div className="hover-info">
              <p className="game-tags">Game Tags: {game.tags.map(tag => tag.name).join(', ')}</p>
              </div>
          </div>
          </div>
          </Link>
          </div>
        </>
    )
}

export default GameSearchResult;