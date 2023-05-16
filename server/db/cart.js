const client = require('./client');

//----------Cart----------//

async function createCart({ orderId, userId, purchaseStatus }) {
    try {
        const { rows: [ order ] } = await client.query(`
        INSERT INTO cart (
            "orderId"
            "userId"
            purchaseStatus
        )
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [ orderId, userId, purchaseStatus]);

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

async function createCartItems({ orderId, gameId, Qty, priceAtPurchase }) {
    try {
        const { rows: [ order ] } = await client.query(`
        INSERT INTO cart (
            "orderId"
            "gameId"
            Qty
            priceAtPurchase
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [ orderId, gameId, Qty, priceAtPurchase]);

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

