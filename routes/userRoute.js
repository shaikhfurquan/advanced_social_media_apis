import express from 'express';
import { blockUser, followUser, getSingleUser, unblockUser, unfollowUser, updateUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const userRouter = express.Router();

userRouter.get('/get/:id' , isAuthenticated , getSingleUser)
userRouter.put('/update' , isAuthenticated , updateUser)


// which user we want to follow so mentioned in the req.params(userId)
userRouter.post('/follow/:userId' , isAuthenticated , followUser )


// which user we want to follow so mentioned in the req.params(userId)
userRouter.post('/unfollow/:userId' , isAuthenticated , unfollowUser )


userRouter.post('/block/:userId' , isAuthenticated , blockUser )


userRouter.post('/unblock/:userId' , isAuthenticated , unblockUser )

export default userRouter