const express = require('express');
const cartRouter = express.Router();
const { getAllCarts, getCartByOrder, getCartByUserId, createCart, updatePurchaseStatus } = require('../db');

//replace function with getCartWithAllInfo
// //GET/api/cart/user/:userId
cartRouter.get('/user/:userId', async (req, res, next) => {
try{
    const { userId } = req.params;
    const userCart = await getCartByUserId(userId);
    console.log("This is userCart:", userCart);

        res.send({userCart})

} catch (error){
    next(error)
}
})

// //GET/api/cart/orderId
cartRouter.get('/:orderId', async (req, res, next) => {
try {
    const { orderId } = req.params;
    const cart = await getCartByOrder(orderId);
    // console.log("This is cart:", cart);

        res.send({ cart });

} catch (error) {
    next(error);
}
})

//PATCH /api/cart/:orderId
cartRouter.patch('/:orderId', async (req, res, next) => {

    try {
        const { orderId } = req.params;
        const { purchaseStatus } = req.body;
        const cart = await getCartByOrder(orderId);
        // console.log("This is cart:", cart);
    
        if (!cart) {
            return res.status(404).json({ error: 'CartNotFound', message: 'No cart found with that id' });
          }
    
          const updatedCart = await updatePurchaseStatus(cart)

          res.send({ updatedCart })

    } catch (error) {
        next(error);
    }
  })

  //GET /api/cart
  cartRouter.get('/', async (req, res, next) => {
    try {
        const carts = await getAllCarts();

            res.send({ carts });

    } catch (error) {
        next(error);
    }    
})

//GET api/cart/:userId
cartRouter.get('/userId/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cartById = await getCartByUserId(userId);
        // console.log("This is cart:", cart);
    
            res.send({ cartById });
    
    } catch (error) {
        next(error);
    }
    })
  
//POST/api/cart
cartRouter.post('/', async (req,res,next) => {
    const { userId, purchaseStatus } = req.body;

try{
    const newCart = await createCart({
        userId,
        purchaseStatus
    });

    res.send({ newCart });

} catch (error){
    next(error);
}
});

module.exports = cartRouter;



