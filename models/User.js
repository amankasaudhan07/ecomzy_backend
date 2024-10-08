import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      
      firstName:{type:String,require:true},
      lastName:{type:String,require:true},
      email:{type:String,require:true},
      password:{type:String,require:true},
      createAt:{type:Date,default:Date.now},
})

export const User =mongoose.model("User",userSchema);