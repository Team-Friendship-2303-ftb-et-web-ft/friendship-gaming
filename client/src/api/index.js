
//REGISTER USER
export const registerUser = async (userObject) => {
    try{
        const response = await fetch(`api/users/register`, {
            method: 'POST',
            headers: {
                'Content=Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        });
        const result = await response.json();
        console.log(result);
        if (result.user) {
            const {message, userObject, token} = result;
            localStorage.setItem('token', token);
            return {message, userObject, token};
        }
        if (result.error) {
            return result;
        }
        return;
    } catch (error){
        console.error(error);
    }
};
//LOGIN USER
export const loginUser = async (userObject) => {
    try{
        const response = await fetch(`api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        });
        const result = await response.json();
        console.log("line 39",result);
        if (result.user){
            const {message, user, token} = result;
            localStorage.setItem('token', token);
            return {message, token, user};
        }
        if (result.error){
            return result;
        }
        const token = result.token;
        console.log(token);
        return;
    } catch (error) {
        console.error(error);
    }  
};
//GET ME
export const getMe = async (token) => {

    try {
      const response = await fetch(`api/users/me`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
// GET ALL GAMES
export const getAllGames = async () => {
  try {
    const response = await fetch(`${BASE}/games`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const games = await response.json();
    console.log(games);
    return games;
  } catch (err) {
    console.error(err);
  }
}

// CREATE GAME
export const createGame = async (gameData) => {
  try {
    const response = await fetch(`${BASE}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(gameData)
    });
    const newGame = await response.json();
    console.log(newGame);
    return newGame;
  } catch (err) {
    console.error(err);
  }
}

// GET GAME BY ID
export const getGameById = async (gameId) => {
  try {
    const response = await fetch(`${BASE}/games/${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const game = await response.json();
    console.log(game);
    return game;
  } catch (err) {
    console.error(err);
  }
}
// GET GAMES BY GENRE
export const getGamesByGenre = async (genre) => {
    try {
      const response = await fetch(`${BASE}/games/genre/${genre}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const games = await response.json();
      console.log(games);
      return games;
    } catch (err) {
      console.error(err);
    }
  }
  
  // GET GAMES BY TAG
  export const getGamesByTag = async (tagId) => {
    try {
      const response = await fetch(`${BASE}/games/tag/${tagId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const games = await response.json();
      console.log(games);
      return games;
    } catch (err) {
      console.error(err);
    }
  }
  
  // GET GAMES BY AUTHOR
  export const getGamesByAuthor = async (authorName) => {
    try {
      const response = await fetch(`${BASE}/games/author/${authorName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const games = await response.json();
      console.log(games);
      return games;
    } catch (err) {
      console.error(err);
    }
  }
  
  // UPDATE GAME
  export const updateGame = async (gameId, gameData) => {
    try {
      const response = await fetch(`${BASE}/games/${gameId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(gameData)
      });
      const updatedGame = await response.json();
      console.log(updatedGame);
      return updatedGame;
    } catch (err) {
      console.error(err);
    }
  }
  
  // DELETE GAME
  export const destroyGame = async (gameId) => {
    try {
      const response = await fetch(`${BASE}/games/${gameId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const deletedGame = await response.json();
      console.log(deletedGame);
      return deletedGame;
    } catch (err) {
      console.error(err);
    }
  }
  
  // PURCHASE GAME
  export const purchaseGame = async (gameId, quantityPurchased) => {
    try {
      const response = await fetch(`${BASE}/games/${gameId}/purchase`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantityPurchased })
      });
      if (response.status === 204) {
        console.log("Purchase Successful");
      }
    } catch (err) {
      console.error(err);
    }
  }
  
//CREATE CART

//GET ALL CARTS

//GET CART BY USER

//

//GET ALL CART ITEMS

//CREATE CART ITEM
