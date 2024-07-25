import express from 'express' ;
import { addProduct, deleteProductById, getProductById, getProducts, updateProductById  } from "../Controllers/product.js";

const router = express.Router();

// add product
router.post('/add',addProduct);

// get all product
router.get('/all',getProducts);

// get specific product
router.get('/:id',getProductById);

// update by id
router.put('/update/:id',updateProductById);

// delete product by id
router.delete('/delete/:id',deleteProductById);



export default router;