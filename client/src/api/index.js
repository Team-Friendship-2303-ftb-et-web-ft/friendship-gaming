
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
        console.log("This is result:", result);
        if (result) {
            const {message, user, token} = result;
            localStorage.setItem('token', token);
            return {message, user, token};
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
        console.log("This is token:", token);
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
      // console.log(users);
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
// GET GAMES BY GENRE
export const getGamesByGenre = async (genre) => {
    try {
      const response = await fetch(`api/games/genre/${genre}`, {
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
      const response = await fetch(`api/games/tag/${tagId}`, {
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
      const response = await fetch(`api/games/author/${authorName}`, {
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
      const response = await fetch(`api/games/${gameId}`, {
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
  export const destroyGame = async (gameId, token) => {
    try {
      const response = await fetch(`api/games/${gameId}`, {
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
      const response = await fetch(`api/games/${gameId}/purchase`, {
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
export const getAllCarts = async () => {
  try {
    const response = await fetch(`api/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const carts = await response.json();
    // console.log(carts);
    return carts;
  } catch (err) {
    console.error(err);
  }
}

//GET CART BY USER
export const getCartByUserId = async (userId, token) => {
  try {
    const response = await fetch(`api/cart/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const userCart = await response.json();
    console.log(userCart);
    return userCart;
  } catch (err) {
    console.error(err);
  }
}

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

export const getCartById = async (userId) => {
  try {
    const response = await fetch(`api/cart/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const cartById = await response.json();
    console.log("This is cartById:", cartById);

    return cartById;

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
