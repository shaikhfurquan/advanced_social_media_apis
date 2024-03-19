import express from 'express';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const authRouter = express.Router();

// @route   POST api/auth
authRouter.post('/register' , registerUser)
authRouter.post('/login' , loginUser)
authRouter.get('/current-user' , isAuthenticated , getCurrentUser)
authRouter.get('/logout' , isAuthenticated , logoutUser)

export default authRouter