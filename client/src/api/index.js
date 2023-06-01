//------------ USERS ------------//

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

  export const deleteUser = async (id, token) => {
    console.log(id, token);
    try {
      const response = await fetch(`api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const deletedUser = await response.json();
      console.log(deletedUser);
      return deletedUser;
    } catch (err) {
      console.error(err);
    }
  }  

  
// GET USERS WITH INFO
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

export const updateUser = async (userId, userData, token) => {
  console.log(userData)
  try {
    const response = await fetch(`api/users/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    const updatedUser = await response.json();
    console.log('this is updaatedUser->',updatedUser);
    return updatedUser;
  } catch (err) {
    console.error(err);
  }
}

export const changeAdminStatus = async (target, token) => {
  try {
    const response = await fetch(`api/users/admin`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(target)
    });
    const updatedUser = await response.json();
    console.log('this is updaatedUser->',updatedUser);
    return updatedUser;
  } catch (err) {
    console.error(err);
  }
}

//------------ GAMES ------------//

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
export const purchaseGame = async (gameId, quantityPurchased, token) => {
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

//------------ CARTS ------------//

//CREATE CART
export const createCart = async (newCart) => {
  console.log('input for create cart', newCart);
  try {
    const response = await fetch(`api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCart)
    });
    const result = await response.json();
    console.log(result);

    return result;

  } catch (err) {
    console.error(err);
  }
}

//GET CARTS WITH ALL INFO BY USERID
export const getCartsWithAllInfo = async (userId) => {
  try {
    const response = await fetch(`api/cart/cartInfo/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const cartWithInfo = await response.json();
    console.log("This is carts with all:", cartWithInfo);

    return cartWithInfo;

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

// UPDATE CART PURCHASE STATUS
export const updatePurchaseStatus = async (orderId, cartObj, token) => {
  try {
    const response = await fetch(`/api/cart/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(cartObj)
    });
    const updatedCart = await response.json();
    console.log(updatedCart);

    return updatedCart;

  } catch (err) {
    console.error(err);
  }
}

//------------ CART ITEMS ------------//

//CREATE CART ITEM
export const createCartItems = async (CartItemObj, token) => {
  try {
    const response = await fetch(`/api/cartItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(CartItemObj)
    });

    const newCartItem = await response.json();
    console.log(newCartItem);

    return newCartItem;

  } catch (err) {
    console.error(err);
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

//GET ALL CART ITEMS BY CART ID
export const getCartItemsByCartId = async (cartId, token) => {
  try {
    const response = await fetch(`api/cartItems/cartId${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const cartItemsByCartId = await response.json();
    console.log("This is cartItemsById:", cartItemsByCartId);

    return cartItemsByCartId;

  } catch (err) {
    console.error(err);
  }
}

// UPDATE CART ITEMS QUANTITY
export const updateCartItemsQuantity = async (cartId, cartItemsObj, token) => {
  try {
    const response = await fetch(`api/cartitems/${cartId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(cartItemsObj)
    });
    const updatedCartItem = await response.json();
    console.log(updatedCartItem);

    return updatedCartItem;

  } catch (err) {
    console.error(err);
  }
}

// DELETE CART ITEM 
export const deleteCartItem = async (cartItemId, token) => {
  try {
    const response = await fetch(`api/cartItems/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const deletedCartItem = await response.json();
    console.log(deletedCartItem);

    return deletedCartItem;

  } catch (err) {
    console.error(err);
  }
}



