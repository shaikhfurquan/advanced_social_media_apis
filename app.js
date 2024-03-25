import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
import commentRouter from './routes/commentRoute.js';
import storyRouter from './routes/storyRoute.js';
import conversationRouter from './routes/conversationRoute.js';

dotenv.config()


const app = express()

const PORT = process.env.PORT || 3500
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
app.use("/uploads" , express.static(path.join(__dirname, 'uploads')))



// routes
app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)
app.use('/api/post' , postRouter)
app.use('/api/comment' , commentRouter)
app.use('/api/story' , storyRouter)
app.use('/api/conversation' , conversationRouter)

//db connection
connectDB()


app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`);
})