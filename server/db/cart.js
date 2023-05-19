const cartRouter = require('../api/cart');
const client = require('./client');

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
           WHERE id = $1
          `, [ userId ]);
          
           return order;
        
         } catch (error) {
           throw error;
         }
        }
      
// async function updatePurchaseStatus(id) {
//   // const cart = await getCartByOrder(id);
//   const isTrueOrFalse = true || false;

//   try {
//       const { rows: [ order ] } = await client.query(`
//         UPDATE cart
//         SET "purchaseStatus" = ${isTrueOrFalse}
//         WHERE cart.id = $1
//         RETURNING *
//       `, [ bool ])
//   } catch (error) {
//       throw error;
//   }
// }

async function updatePurchaseStatus({ id, ...fields }) {
  // console.log('This is id & fields', { id, ...fields})
  try {
    const keys = Object.keys(fields);
    const setString = keys.map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');
   
      const { rows: [ order ] } = await client.query(`
      UPDATE cart
      SET ${ setString }
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields)
    );

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
      const { rows: [ order ] } = await client.query(`
       SELECT * FROM cartItems
       WHERE id = ${ id }
      `);
      
       return order;
    
     } catch (error) {
       throw error;
     }
    }

async function attachCartItemsToCart(id) {
  try {
      const { rows: [ orderItems ] } = await client.query(`
        SELECT * FROM cartItems
        JOIN cart ON cart.id = cartItems."cartId"
        WHERE cart.id = $1
      `, [ id ]);
      console.log('This is orderItems', orderItems);

        return orderItems;

  } catch (error) {
      throw error;
  }
}

async function deleteCartItems(id) {
  try {
    await client.query(`
      ALTER TABLE cartItems
      DROP COLUMN "cartId" CASCADE
    `)
    await client.query(`
      DELETE FROM cartItems
      WHERE cartItems.id=$1
    `, [id]);

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
      attachCartItemsToCart,
      deleteCartItems
    }

