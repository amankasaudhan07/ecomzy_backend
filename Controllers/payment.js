
import { Payment } from "../models/Payment.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'

dotenv.config();

const razorpay = new Razorpay({
     key_id: process.env.Razorpay_key_id, 
     key_secret: process.env.Razorpay_key_secret,
     });


      // checkout
  export const  checkout = async(req,res)=>{
    const {amount,cartItems,userShipping,userId}=req.body

    var options = {
        amount: amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt:` receipt_${Date.now()}`
      };
     const order=await razorpay.orders.create(options);
    
     
     res.json({
        orderId:order.id,
        amount:amount,
        cartItems,
        userShipping,
        userId,
        payStatus:"created"
    }); 


  }

  //  verify and save to db
  export const verify = async (req,res)=>{
    const {
      orderId,
      paymentId,
      signature,
      amount,
      orderItem,
      userId,
      userShippiing
    } = req.body;

    let orderConfirm = await Payment.create({
      orderId,
      paymentId,
      signature,
      amount,
      orderItem,
      userId,
      userShippiing,
      payStatus:"paid",
    });

    res.json({message:"Payment Successful...",success:true,orderConfirm})
  }

  // user specific order
  export const userOrder =async (req,res)=>{
    let userId=req.user._id.toString();
    let orders=await Payment.find({userId:userId}).sort({orderDate:-1});

    res.json(orders);
  }


  // all order
  export const allOrder =async (req,res)=>{
   
    let orders=await Payment.find().sort({orderDate:-1});

    res.json(orders);
  }