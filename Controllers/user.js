import {User} from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

//  register
export const register = async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user;
        user=await User.findOne({email});
        if(user)
        {
            // console.log("user detail : ",user);
            return res.json({message:"user already exist...",success:false});
        }
        
        const hashpass = await bcrypt.hash(password,10);
        user =User.create({name,email,password:hashpass});
        // console.log("user detail : ",user);
       res.json({message:"user register Successfully...",success:true,user})
    }
    catch(error){
      res.json({message:error.message})
    }
};

// login user
export const login= async(req,res)=>{
    const {email,password}=req.body;

    try{
       let user=await User.findOne({email}); 
       if(!user)
       {
         return res.json({message:"user not found..",success:false});
       }
       const validPass= await bcrypt.compare(password,user.password);
       if(!validPass)
        return res.json({message:"Incorrect password..",success:false});

       const token = jwt.sign({userId:user._id},'!#$%^&*()',{
        expiresIn:'365d'
       })
        
      
        res.json({message:`Welcome ${user.name}`,success:true,token});
    }
    catch(error){
        res.json({message:error.message});
    }
}

// get all user
export const users=async(req,res)=>{
   try{
       let users=await User.find().sort({creatAt:-1});
       res.json(users);

   }catch(error){
    res.json(error.message);
   }
}

// user profile
export const profile = async(req,res)=>{
    res.json({user:req.user});
}



