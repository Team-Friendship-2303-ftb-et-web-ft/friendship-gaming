
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
      console.log('result',result);
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
    // console.log(games);
    return games;
  } catch (err) {
    console.error(err);
  }
}

// GET ALL USERS
export const getAllUsers = async () => {
    try {

      const response = await fetch(`api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const users = await response.json();
      console.log(users);
      return users;
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
export const createCart = async (newCart) => {
  try {
    const response = await fetch(`api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newCart)
    });
    const newCart = await response.json();
    console.log(newCart);
    return newCart;
  } catch (err) {
    console.error(err);
  }
}

//GET ALL CARTS

//GET CART BY USER

//CREATE CART ITEM
export const createCartItems = async (newCartItem) => {
  try {
    const response = await fetch(`api/cartItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newCartItems)
    });

    const newCartItems = await response.json();
    console.log(newCartItems);

    return newCartItems;

  } catch (err) {
    console.error(err);
  }
}


//GET USERS WITH INFO
export const getUsersWithInfo = async (token) => {
  try {
    const response = await fetch(`api/users/admin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch(error) {
    console.error(error);
  }
}

//GET ALL CART ITEMS
export const getAllCartItems = async () => {
  try {
    const response = await fetch(`api/cartItems`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  

    const cartItems = await response.json();
    console.log("This is all the cartItems:", cartItems);

    return cartItems;

  } catch (err) {
    console.error(err);
  }
}

//GET ALL CART ITEMS BY ID
export const getCartItemsById = async (orderId) => {
  try {
    const response = await fetch(`api/cartItems/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const cartItemsById = await response.json();
    console.log("This is cartItemsById:", cartItemsById);

    return cartItemsById;

  } catch (err) {
    console.error(err);
  }
}
