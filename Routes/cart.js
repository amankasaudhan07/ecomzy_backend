import express from 'express';
import { addToCart, userCart ,removeItemFromCart, clearCart,decreaseProductqty} from '../Controllers/cart.js';

const router=express.Router();

import { Authenticated } from '../Middlewares/Auth.js';
// add to cart
router.post('/add',Authenticated,addToCart)

// get user cart
router.get('/user',Authenticated,userCart);

// remove product from cart
router.delete('/removeProduct/:id',Authenticated,removeItemFromCart);

// clear cart
router.delete('/clear',Authenticated,clearCart);

router.post('/--qty',Authenticated,decreaseProductqty);

export default router;