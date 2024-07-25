import { Cart } from "../models/Cart.js";

// add to cart
export const addToCart = async (req,res)=>{
    const {productId,title,price,qty,imgsrc}=req.body;
   
    const userId=req.user;
     let cart = await Cart.findOne({userId})
     if(!cart)
     {
         cart=new Cart({userId,items:[]});
     }
     const itemIndex = cart.items.findIndex((item)=>item.productId.toString()===productId)
     if(itemIndex > -1)
        {
          cart.items[itemIndex].qty+=qty;
          cart.items[itemIndex].price+=qty*price;
        }
        else
        {
            cart.items.push({productId,title,price,qty,imgsrc});
        }
    await cart.save();
    res.json({message:"Item added to cart..",cart});
}

// get user cart
export const userCart = async (req,res)=>{
    const userId=req.user;

    let cart=await Cart.findOne({userId});

    if(!cart)
        return res.json({message:"cart not found"})

    res.json({message:"this is cart",cart});
}

// remove product from cart  -->pending not working
export const removeItemFromCart =async(req,res)=>{
    const productId = req.params.id; 
    const userId=req.user;

    console.log("productId",productId);
    console.log("userId",userId);

     try{
    let cart=await Cart.findOne({userId});
    if(!cart)
        return res.json({message:"cart not found"})

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
     
     await cart.save();
     res.json({message:"product removed from cart",cart});
     }
     catch(error){
        res.status(500).json({ message: "Server error", error });
     }
}



// clear cart
export const clearCart = async (req,res)=>{
    const userId=req.user;
     let cart = await Cart.findOne({userId})
     if(!cart)
     {
         
         cart=new Cart({userId,items:[]});
         return res.json({message:"new cart"})
     }
     else{

         cart.items=[];
     }
    await cart.save();
    res.json({message:"clear cart..",cart});
};


// decrease qty
export const decreaseProductqty = async (req, res) => {
    const { productId, qty } = req.body;
    const userId = req.user;
  
    if (!productId || !qty) {
      return res
        .status(400)
        .json({ message: "Missing productId, qty, or userId" });
    }
  
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (itemIndex > -1) {
        const item = cart.items[itemIndex];
  
        if (item.qty > qty) {
          // Calculate the price per unit
          const pricePerUnit = item.price / item.qty;
          // Decrease the quantity
          item.qty -= qty;
          // Update the price
          item.price -= pricePerUnit * qty;
        } else {
          // If qty to decrease is equal or more than current qty, remove the item
          cart.items.splice(itemIndex, 1);
        }
      } else {
        return res.status(404).json({ message: "Item not found in cart" });
      }
  
      await cart.save();
      res.status(200).json({ message: "Item quantity decreased", cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
};


