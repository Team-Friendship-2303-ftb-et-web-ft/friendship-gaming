import React, {useState} from "react";
import { Link } from 'react-router-dom';
import Games from './Games';
import SearchBar from "./SearchBar";
import GameSearchResult from './GameSearchResult'

const Home = (props) => {
    const {gamesList} = props;
    
    const [returnedGamesList, setReturnedGamesList] = useState([]);

    return (
        <>
        <div className="search-bar">
            <SearchBar gamesList={gamesList} setReturnedGamesList={setReturnedGamesList} />
            </div>
            {returnedGamesList.length ?
        <div className="search-results">
             <button className="back" onClick={() => { 
                window.location.reload();
                }}>Back</button>
             <h2>Results:</h2>
    {returnedGamesList.map((game, index) =>{

        return(
            <div key={index}>
                <div className="games">
                   <GameSearchResult game={game}/>
            </div>
            
            </div>
    )
    })}
    </div>
    : 
    <Games />
};

       
        </>
    )   
}

export default Home;
