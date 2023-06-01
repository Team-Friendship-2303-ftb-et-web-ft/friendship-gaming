const client = require('./client');
const { getGameById } = require("./games");

//----------Cart----------//

async function createCart({ userId, purchaseStatus }) {
    try {
        const { rows: [ order ] } = await client.query(`
        INSERT INTO cart (
            "userId",
            "purchaseStatus"
        )
        VALUES ($1, $2)
        RETURNING *;
        `, [ userId, purchaseStatus ]);

          console.log(order)
            return order;

    } catch (error) {
        throw error;
    }
}

// async function getAllCarts() {
//   try {
//     const { rows: order } = await client.query(`
//       SELECT * FROM cart;
//     `);
   
//     return order;

//   } catch (error) {
//     console.error(error);
//   }
// }

async function getCartByOrder(id) {
    try {
      const { rows: [ order ] } = await client.query(`
       SELECT * FROM cart
       WHERE id = ${ id }
      `);
      
       return order;
    
     } catch (error) {
       throw error;
     }
    }

async function getCartByUserId(userId) {
  console.log("This is userId",userId);
    try {
        const { rows: order  } = await client.query(`
          SELECT * FROM cart
           WHERE "userId" = ${userId}
          `);

           return order;
        
         } catch (error) {
           throw error;
         }
        }

async function updatePurchaseStatus({ id }) {
  try {
   
      const { rows: [ order ] } = await client.query(`
      UPDATE cart
      SET "purchaseStatus" = true
      WHERE id=${id}
      RETURNING *;
    `);

      return order;

  } catch (error) {
      throw error;
  }
}

async function getCartsWithAllInfo(userId) {
  try {
    const allCarts = await getCartByUserId(userId);
    
    const getInfo = async (cart) => {
      const cartItems = await getCartItemsByCartId(cart.id);
      console.log("Cart Items: ", cartItems); // Debugging line

      await Promise.all(
        cartItems.map(async (cartItem) => {
          console.log("Single Cart Item: ", cartItem); // Debugging line
          const game = await getGameById(cartItem.gameId);

          if (game) {
            cartItem.game = game;
          }
        })
      );

      return { ...cart, cartItems };
    };

    const cartInfoPromises = allCarts.map(getInfo);
    const cartInfo = await Promise.all(cartInfoPromises);

    return cartInfo;
  } catch (error) {
    console.error("Error getting carts with all info:", error);
    throw error;
  }
}


//----------Cart Items----------//

async function createCartItems({ cartId, gameId, quantity, priceAtPurchase }) {
    try {
        const { rows: [ order ] } = await client.query(`
        INSERT INTO cartItems (
            "cartId",
            "gameId",
            quantity,
            "priceAtPurchase"
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [ cartId, gameId, quantity, priceAtPurchase ]);
          console.log(order);
            return order;
    } catch (error) {
        throw error;
    }
}

async function getAllCartItems() {
  try {
    const { rows: order } = await client.query(`
    SELECT * FROM cartItems
    `);
    
    return order;
    
  } catch (error) {
    throw error;
  }
}

async function getCartItemsByOrder(id) {
    try {
      const { rows:  order  } = await client.query(`
       SELECT * FROM cartItems
       WHERE id = ${ id }
      `);
      
       return order;
    
     } catch (error) {
       throw error;
     }
    }

    async function getCartItemsByCartId(id) {
      try {
        const { rows: order  } = await client.query(`
         SELECT * FROM cartItems
         WHERE "cartId" = ${ id }
        `);
        
         return order;
      
       } catch (error) {
         throw error;
       }
      }

    // async function attachCartItemsToCart(id) {
    //   try {
    //       const { rows:  orderItems  } = await client.query(`
    //         SELECT * FROM cart
    //         JOIN cartItems ON cart.id = cartItems."cartId"
    //         WHERE cart.id = $1
    //       `, [ id ]);
    //       // console.log('This is orderItems', orderItems);
    
    //         return orderItems;
    
    //   } catch (error) {
    //       throw error;
    //   }
    // }

//in progress
// async function addGamesToCartItem(userId, gameId) {
//   try {
//     const gameToAdd = getGameById(gameId)
//     await createCartItem(...)
//     //insert games into cartItems
//   await client.query(`
//     INSERT INTO cartItems
//     VALUES $2, $3
//     WHERE "gameId" =$1
//   `, [gameId])
//   //instert cart items into cart
//   const rows = await client.query(`
//     INSERT INTO cart
//     VALUES $1, $2, $3
//     WHERE "userId" =$1
//   `, [userId])
//   return rows
//   } catch (error) {
//     console.error(error)
//   }
// }

async function updateCartItemQty({id, quantity}) {
  try {
    if (quantity) {
      const { rows: [cartItem] } = await client.query(`
        UPDATE cartItems
        SET quantity = $1
        WHERE id = $2
        RETURNING *;
      `, [quantity, id]);
      console.log("This is cartItem:", cartItem)

      return cartItem;
    }
  } catch (error) {
    throw error;
  }
}

async function deleteCartItems(id) {
  try {
  const {rows: [ deletedCartItem ]} = await client.query(`
      DELETE FROM cartItems
      WHERE id = $1
      RETURNING *
    `, [id]);

    return deletedCartItem

  } catch (error) {
    console.error(error);
  }
}

    module.exports = {
      createCart,
      getCartByOrder,
      getCartByUserId,
      updatePurchaseStatus,
      createCartItems,
      getAllCartItems,
      getCartItemsByOrder,
      updateCartItemQty,
      getCartsWithAllInfo,
      deleteCartItems,
      getCartItemsByCartId
    }

