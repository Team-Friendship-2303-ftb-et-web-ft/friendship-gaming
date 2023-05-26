import './Admin.css'
import { destroyGame } from '../api';

const AdminGames = ({gamesList, token, isAdmin}) => {

    return(
        <div className="container">

        {isAdmin &&
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
                <button onClick={console.log('add update form function here')}>Update</button>
                <button onClick={async()=>{await destroyGame(game.id, token)}}>Delete</button>
            </div>
            </div>
          )
          })
        }
        </div>  
    );
}

export default AdminGames;