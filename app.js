import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';

dotenv.config()


const app = express()

const PORT = process.env.PORT || 3500

// express middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())



// routes
app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)


connectDB()


app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`);
})