const express = require('express');
const cartRouter = express.Router();
const { getCartByOrder, getCartByUserId, createCart, updatePurchaseStatus, getCartsWithAllInfo } = require('../db');
const { requireUser } = require('./utils');


//GET /api/cart/user/:userId Get All Carts By UserId
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

//GET /api/cart/Id/orderId - Get Carts By OrderId 
cartRouter.get('/Id/:orderId', async (req, res, next) => {
try {
    const { orderId } = req.params;
    const cart = await getCartByOrder(orderId);
    // console.log("This is cart:", cart);

        res.send({ cart });

} catch (error) {
    next(error);
}
})

//GET /api/cart/cartInfo/:userId - Get All Carts With Info By UserId
cartRouter.get('/cartInfo/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cart = await getCartsWithAllInfo(userId);
        console.log("This is cart:", cart);

        res.send({cart});

    } catch (error) {
        next(error);
    }
})

//PATCH /api/cart/:orderId - Get Carts By OrderId and Update PurchaseStatus
cartRouter.patch('/:orderId', requireUser, async (req, res, next) => {

    try {
        const { orderId } = req.params;
        const { purchaseStatus } = req.body;
        const cart = await getCartByOrder(orderId);
        // console.log("This is cart:", cart);

        const updatedCart = await updatePurchaseStatus(cart)

          res.send({ updatedCart })

    } catch (error) {
        next(error);
    }
  })

  //GET /api/cart - Get All Carts
//   cartRouter.get('/', async (req, res, next) => {
//     try {
//         const carts = await getAllCarts();

//             res.send({ carts });

//     } catch (error) {
//         next(error);
//     }    
// })

//GET api/cart/:userId - Get Cart By UserId
cartRouter.get('/user/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cartById = await getCartByUserId(userId);
        // console.log("This is cart:", cart);
    
            res.send({ cartById });
    
    } catch (error) {
        next(error);
    }
    })
  
//POST/api/cart - Create Cart
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



