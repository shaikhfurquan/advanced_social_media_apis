import express from 'express';
import { blockUser, deleteUser, followUser, getBlockLists, getSingleUser, unblockUser, unfollowUser, updateUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const userRouter = express.Router();

userRouter.get('/get/:id' , isAuthenticated , getSingleUser)
userRouter.put('/update' , isAuthenticated , updateUser)


// which user we want to follow so mentioned in the req.params(userId)
userRouter.post('/follow/:userId' , isAuthenticated , followUser )


// which user we want to un-follow so mentioned in the req.params(userId)
userRouter.post('/unfollow/:userId' , isAuthenticated , unfollowUser )

// which user we want to block so mentioned in the req.params(userId)
userRouter.post('/block/:userId' , isAuthenticated , blockUser )

// which user we want to un-block so mentioned in the req.params(userId)
userRouter.post('/unblock/:userId' , isAuthenticated , unblockUser )


// GET BLOCK USERS LISTS
userRouter.get('/blocked-lists' , isAuthenticated , getBlockLists )


userRouter.delete('/delete' , isAuthenticated , deleteUser)
export default userRouter
