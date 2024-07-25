import { Products } from "../models/Product.js";

// add product
export const addProduct = async(req,res)=>{
    const {title,description,price,qty,category,imgsrc} =req.body;
    try{
        let product =await Products.create({
            title,
            description,
            price,
            category,
            qty,
            imgsrc,
           
        });
        res.json({message:"product Added" ,product});
    }
    catch(error){
        res.json({message:error.message});
    }
}

// get products

export const getProducts = async(req,res)=>{
    try{
        let products=await Products.find().sort({createdAt:-1});
        res.json({message:"these are all products",success:true,products});
    }
    catch(error){
        res.json({message:error.message}); 
    }
}

// get product by id
export const getProductById =async(req,res)=>{
    try{
        const id=req.params.id;
        let product=await Products.findById(id);
        if(!product)
            return res.json({message:"No product found for this id",success:false});

        res.json({message:"specific product",product});
    }
    catch(error){
        res.json({message:error.message});
    }
}

// update by id
export const updateProductById =async(req,res)=>{
    try{
        const id=req.params.id;
        let product=await Products.findByIdAndUpdate(id,req.body,{new:true});
        if(!product)
            return res.json({message:"No product found for this id",success:false});

        res.json({message:"product updated",product});
    }
    catch(error){
        res.json({message:error.message});
    }
}

// delete by id
export const deleteProductById =async(req,res)=>{
    try{
        const id=req.params.id;
        let product=await Products.findByIdAndDelete(id);
        if(!product)
            return res.json({message:"No product found for this id",success:false});

        res.json({message:"product deleted"});
    }
    catch(error){
        res.json({message:error.message});
    }
}