import React, { useState } from "react";
const SearchBar = (props) => {

  const { gamesList, setReturnedGamesList } = props;

  const [searchForGame, setSearchForGame] = useState('');
  const searchAllGames = (gamesArray, searchTerm) => {
    const result = gamesArray.filter((games) =>
    games.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return result;
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
        }}
        className="search-button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

