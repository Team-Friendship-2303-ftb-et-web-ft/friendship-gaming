import './Admin.css'
import { destroyGame } from '../api';
import { EditGameForm } from './index'
import { useState } from 'react';

const AdminGames = ({game, setGame, gamesList, token, isAdmin}) => {
    const [showGames, setShowGames] = useState(true);
    const [showForm, setShowForm] = useState(false)

    return(
        <div className="container">


        {isAdmin && showGames &&
        
          gamesList.map(game => {
          let tagArr = [] 
        
          if (game.tags.length) {
            let tagNames = Object.values(game.tags);
        
            tagNames.map(tag => {
                tagArr.push(tag.name);
            })
          }
        
          return (
            <div key={game.id} id="game">
            <div className="titlebox">
                <p className="title">{game.title}</p>
                {game.featured && <p className="featured">(Featured)</p>}
            </div>
            <p>Author: {game.authorName}</p>
            <p>Genre: {game.genre}</p>
            {game.tags.length ? <p>Tags: {tagArr.join(' ')}</p> :<p>Tags: N/A</p>} 
            <p>Price: {game.price}</p>
            <p>Inventory: {game.inventoryqty}</p>
            <p>Description: {game.description}</p>
            <div className="button">
                <button onClick={()=>{
                  setGame(game);
                  setShowForm(true);
                  setShowGames(false);
                  setShowUsers(false);
                  setShowAddGameForm(false);
                  }}>Update</button>
                <button onClick={async()=>{await destroyGame(game.id, token)}}>Delete</button>
            </div>
            </div>
          )
          })
        }


        {isAdmin && showForm &&
          <div className="container">
            <EditGameForm token={token} game={game}/>
          </div>
        }
          
        
        </div>  
    );
}

export default AdminGames;