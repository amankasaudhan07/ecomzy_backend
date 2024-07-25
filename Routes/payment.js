import express from 'express';
import { checkout,userOrder,verify ,allOrder} from '../Controllers/payment.js';
import {Authenticated } from '../Middlewares/Auth.js'

const router =express.Router();

// checkout
router.post('/checkout',checkout);

// verify and save to db
router.post('/verify-payment',verify)

// user order
router.get('/userorder',Authenticated,userOrder);
// all order
router.get('/orders',allOrder);

export default router;
