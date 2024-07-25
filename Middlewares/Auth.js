import  jwt  from "jsonwebtoken";
import { User } from "../models/User.js";

export const Authenticated =async (req,res,next)=>{
 
     const token =req.header("Auth");

     if(!token)
         return res.json({message:"Login First"});

     const decode =jwt.verify(token,'!#$%^&*()');

    //  console.log(decode);

     const id=decode.userId;

     let user = await User.findById(id);

     if(!user) return res.json({message:"User not found"});

     req.user=user;
     next();

} 