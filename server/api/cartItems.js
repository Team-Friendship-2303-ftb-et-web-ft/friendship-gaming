const express = require('express');
const cartItemsRouter = express.Router();
const { createCartItems, getAllCartItems, getCartItemsByOrder, getCartItemsByCartId, updateCartItemQty, deleteCartItems, getGameById } = require('../db');
const { requireUser } = require('./utils');

//GET /api/cartItems//order/:orderId - Get CartItems By OrderId
cartItemsRouter.get('/order/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const cartItems = await getCartItemsByOrder(orderId);
        // console.log("This is cart:", cart);
    
            res.send({ cartItems });
    
    } catch (error) {
        next(error);
    }
    })

//GET api/cartItems/cartId/:cartId - Get CartItems By CartId
cartItemsRouter.get('/cartId/:cartId', async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cartItems = await getCartItemsByCartId(cartId);
        // console.log("This is cart:", cart);
        
            res.send({ cartItems });
        
    } catch (error) {
        next(error);
    }
    })

//GET /api/cartItems - Get All CartItems
cartItemsRouter.get('/', async (req, res, next) => {
    try {
        const cartItems = await getAllCartItems();

            res.send({ cartItems });

    } catch (error) {
        next(error);
    }    
});

//PATCH /api/cartItems/:cartId - Get All CartItems By CartId and Update Quantity
cartItemsRouter.patch('/:cartId', requireUser, async (req, res, next) => {

    try {
        const { cartId } = req.params;
        const { quantity } = req.body;
        const cartItem = await getCartItemsByCartId(cartId);
        // console.log("This is cart:", cart);
        
        const updatedCartItems = await updateCartItemQty(cartItem)

          res.send({ updatedCartItems })

    } catch (error) {
        next(error);
    }
  });

//DELETE /api/cartItems/:cartId - Deletes CartItems
cartItemsRouter.delete('/:cartId', requireUser, async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cartItem = await getCartItemsByCartId(cartId);
  
        const deletedCartItem = await deleteCartItems(cartItem);
  
            res.send({ deletedCartItem })

    } catch (error) {
        next(error);
    }
});

//POST /api/cartItems - Create New CartItems 
cartItemsRouter.post('/', requireUser, async (req,res,next) => {
    const { cartId, gameId, quantity, priceAtPurchase } = req.body;

try{
    const newCartItem = await createCartItems({
        cartId,
        gameId,
        quantity,
        priceAtPurchase
    });

    const game = await getGameById(gameId);

    newCartItem.game = game;

    res.send({ newCartItem });

} catch (error){
    next(error);
}
});




module.exports = cartItemsRouter;