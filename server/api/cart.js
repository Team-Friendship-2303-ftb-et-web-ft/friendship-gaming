// const express = require('express');
// const cartRouter = express.Router();
// const { getAllCarts, getCartByOrder, getCartByUserId, createCart } = require('../db');

// //GET/API/CARTS
// cartRouter.get('/',  async (req, res)=>{
//     const carts = await getAllCarts();

//     res.send({
//         carts 
//     });
// });

// //GET/API/CART/USER/:USERID
// cartRouter.get('/user/:userId', async (req, res, next) => {
//     try{
        
//     const userCart = await getCartByUserId();
//     res.send({
//         carts
//     })
// } catch (error){
//     next(error)
// }
// })
// //GET/API/CART/ORDER/:ORDERID
// cartRouter.get('/:orderId', async (req,res)=>{
//     const carts = await getCartByOrder();

//     res.send({
//         carts
//     })
// })
// //POST/API/CART
// cartRouter.post('/', async (req,res,next) => {
//     const { userId, purchaseStatus } = req.body;
//     const cartData = {
//         userId: req.user.id
// };
// try{
//     const cart = await createCart(cartData);
//     res.send({
//         cart
//     });
// } catch (error){
//     next(error);
// }
// });
// module.exports = cartRouter;



