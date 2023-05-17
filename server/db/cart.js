const client = require('./client');

//----------Cart----------//

async function createCart({ userId, purchaseStatus }) {
    try {
        const { rows: [ order ] } = await client.query(`
        INSERT INTO cart (
            "userId"
            purchaseStatus
        )
        VALUES ($1, $2)
        RETURNING *;
        `, [ userId, purchaseStatus]);
        
        return order;
    } catch (error) {
        throw error;
    }
}

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
    



//----------Cart Items----------//

async function createCartItems({ cartId, gameId, quantity, priceAtPurchase }) {
    try {
        const { rows: [ order ] } = await client.query(`
        INSERT INTO cartItems (
            "cartId"
            "gameId"
            quantity
            priceAtPurchase
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [ cartId, gameId, quantity, priceAtPurchase]);

            return order;
    } catch (error) {
        throw error;
    }
}

async function getAllCartItems() {
  try {
    const { rows: order } = await client.query(`
    SELECT * FROM activities
    `);
    
    return order;
    
  } catch (error) {
    throw error;
  }
}

async function getCartItemsByOrder(id) {
    try {
      const { rows: [ order ] } = await client.query(`
       SELECT * FROM cartItems
       WHERE id = ${ id }
      `);
      
       return order;
    
     } catch (error) {
       throw error;
     }
    }

    module.exports = {
      createCart,
      getCartByOrder,
      getCartByUserId,
      createCartItems,
      getAllCartItems,
      getCartItemsByOrder
    }

