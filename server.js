import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js" ;
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import paymentRouter from "./Routes/payment.js";
import bodyParser from "express";
import cors from 'cors';
const app= express();

const PORT=4000;

app.use(bodyParser.json())

app.use(cors({
	origin:true,
	methods:["GET","POST","PUT","DELETE"],
	credentials:true
}))
// home route for testing
//  app.use('/',(req,res)=>(res.json({message:'this is home '})))


// user rout
 app.use('/api/user',userRouter);

//  product rout
app.use('/api/product',productRouter);

// cart rout
app.use('/api/cart',cartRouter);

// Address rout
app.use('/api/address',addressRouter);

//Payment rout
app.use('/api/payment',paymentRouter);

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})

const dbConnect = () => {
	// Connecting to the database using the provided URL from the environment variables
	mongoose.connect("mongodb+srv://mramankasaudhan07:JwFxa1AYmt26Li53@cluster1.ebhjcur.mongodb.net/",{
       dbname:"Ecommerce"
        },{
			family: 4,
		})
		// If the connection is successful, log a success message
		.then(() => console.log("DB CONNECTION SUCCESS"))
		// If there are issues connecting to the database, log an error message and exit the process
		.catch((err) => {
			console.log(`DB CONNECTION ISSUES`);
			console.error(err.message);
			process.exit(1);
		});
};
dbConnect();