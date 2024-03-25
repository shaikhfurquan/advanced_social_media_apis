import express  from "express";
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import upload from '../middlewares/upload.js';
import { createNewConversation, getConversation } from "../controllers/conversationController.js";





const conversationRouter = express.Router();

// create conversation
conversationRouter.post('/create' , isAuthenticated , createNewConversation)

// get conversation of user
conversationRouter.get('/get/:userId' , isAuthenticated , getConversation)


export default conversationRouter