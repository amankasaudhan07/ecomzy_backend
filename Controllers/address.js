import { Address } from "../models/Address.js";

export const addAddress= async (req,res)=>{
    let {fullName,address,city,state,country,pincode,phoneNumber}= req.body;
     
    let userId=req.user;
    let userAddress=await Address.create({
        userId,
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
    })
    res.json({message:"Address Added",userAddress,success:true});
}

// Get all addresses for a user
export const getAddress = async (req, res) => {
    const userId = req.user;
  
    try {
      const addresses = await Address.find({ userId }).sort({createdAt:-1});
      res.status(200).json({ message: "user Address", recentaddress:addresses[0] });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };