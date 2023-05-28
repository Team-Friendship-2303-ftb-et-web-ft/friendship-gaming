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
            <SearchBar gamesList={gamesList} setReturnedGamesList={setReturnedGamesList} />
            
            {returnedGamesList.length ?
        <div className="search-results">
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
