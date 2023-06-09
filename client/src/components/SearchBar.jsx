import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import './SearchBar.css';
const SearchBar = (props) => {

  const { gamesList, setReturnedGamesList } = props;

  const [searchForGame, setSearchForGame] = useState('');
  const searchAllGames = (gamesArray, searchTerm) => {
    const result = gamesArray.filter((games) =>
    games.title.toLowerCase().includes(searchTerm.toLowerCase()) || games.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );
   
    if(result){
    return result;
  } else{
    return
  }
};

return (
    <div className="searchBox">
      <input
        className="searchInput"
        type="text"
        name="searchgames"
        value={searchForGame}
        placeholder="Search"
        onChange={(event) => setSearchForGame(event.target.value)}
      />
      <button
        onClick={() => {
          console.log(searchForGame);
          console.log(gamesList);
          let filteredList = searchAllGames(gamesList, searchForGame);
          console.log(filteredList);
          setReturnedGamesList(filteredList);
        }}
        className="searchButton"
      >
       &#x1F50D;
      </button>
    </div>
  );
};


export default SearchBar;

