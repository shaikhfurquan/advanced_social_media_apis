import express from 'express';
import { followUser, getSingleUser, updateUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const userRouter = express.Router();

userRouter.get('/get/:id' , isAuthenticated , getSingleUser)
userRouter.put('/update' , isAuthenticated , updateUser)



export default userRouter