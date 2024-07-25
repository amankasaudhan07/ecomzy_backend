import express from 'express';
import { login,users, register, profile } from "../Controllers/user.js";
import { Authenticated } from '../Middlewares/Auth.js';

const router = express.Router();

//register user
router.post('/register',register);

// login user
router.post('/login',login);

// get all user
router.get('/all',users);

router.get('/profile',Authenticated,profile);

export default router;