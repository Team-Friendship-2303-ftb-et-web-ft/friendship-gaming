const express = require('express');
const cartItemsRouter = express.Router();
const { createCartItems, getAllCartItems, getCartItemsByOrder } = require('../db');

//GET /api/cartItems/:orderId
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

//GET /api/cartItems
cartItemsRouter.get('/', async (req, res, next) => {
    try {
        const cartItems = await getAllCartItems();

            res.send({ cartItems });

    } catch (error) {
        next(error);
    }    
})



//POST /api/cartItems
cartItemsRouter.post('/', async (req,res,next) => {
    const { cartId, gameId, quantity, priceAtPurchase } = req.body;

try{
    const newCartItem = await createCartItems({
        cartId,
        gameId,
        quantity,
        priceAtPurchase
    });

    res.send({ newCartItem });

} catch (error){
    next(error);
}
});




module.exports = cartItemsRouter;