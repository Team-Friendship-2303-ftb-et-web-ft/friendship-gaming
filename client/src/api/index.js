
//REGISTER USER
export const registerUser = async (userObject) => {
    try{
        const response = await fetch(`api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        });
        const result = await response.json();
        console.log(result);
        if (result) {
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
    const response = await fetch(`api/games`, {
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
    const response = await fetch(`api/games`, {
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
    const response = await fetch(`api/games/${gameId}`, {
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

//CREATE CART

//GET ALL CARTS

//GET CART BY USER

//

//GET ALL CART ITEMS

//CREATE CART ITEM
