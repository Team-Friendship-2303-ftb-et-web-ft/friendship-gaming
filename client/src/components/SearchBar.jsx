import React, { useState } from "react";
import { Navigate } from "react-router-dom";
const SearchBar = (props) => {

  const { gamesList, setReturnedGamesList } = props;

  const [searchForGame, setSearchForGame] = useState('');
  const searchAllGames = (gamesArray, searchTerm) => {
    const result = gamesArray.filter((games) =>

    games.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const resultTags = gamesArray.filter((games) =>
    
    games.tags.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const resultGenre = gamesArray.filter((games) =>
    
    games.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if(result){
    return result;
  } else if(resultTags){
    return resultTags;
  } else if(resultGenre){
    return resultGenre
  } else{
    return
  }
};

return (
    <div className="search-bar">
      <label htmlFor="searchgames">Search for a Game:</label>
      <input
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
          //Navigate('./SearchResults')
        }}
        className="search-button"
      >
        Search
      </button>
    </div>
  );
};


export default SearchBar;

