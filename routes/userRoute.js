import express from 'express';
import { followUser, getSingleUser, unfollowUser, updateUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const userRouter = express.Router();

userRouter.get('/get/:id' , isAuthenticated , getSingleUser)
userRouter.put('/update' , isAuthenticated , updateUser)

// which user we want to follow so mentioned in the req.params(userId)
userRouter.post('/follow/:userId' , isAuthenticated , followUser )

// which user we want to follow so mentioned in the req.params(userId)
userRouter.post('/unfollow/:userId' , isAuthenticated , unfollowUser )


export default userRouter