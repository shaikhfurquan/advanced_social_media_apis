import express  from "express";
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import upload from '../middlewares/upload.js';
import { createConversation } from "../controllers/conversationController.js";





const conversationRouter = express.Router();

// create story
conversationRouter.post('/create' , isAuthenticated , createConversation)


export default conversationRouter