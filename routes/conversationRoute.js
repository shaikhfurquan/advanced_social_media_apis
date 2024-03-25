import express  from "express";
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import { createNewConversation, getConversation, getTwoUserConversation } from "../controllers/conversationController.js";

const conversationRouter = express.Router();

// create conversation
conversationRouter.post('/create' , isAuthenticated , createNewConversation)

// get conversation of user
conversationRouter.get('/get/:userId' , isAuthenticated , getConversation)

// get two users conversation 
conversationRouter.get('/get/:firstUserId/:secondUserId' , isAuthenticated , getTwoUserConversation)


export default conversationRouter