import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL + process.env.DB_NAME)
        console.log(`connectDB to DB ==> ${process.env.MONGO_URL + process.env.DB_NAME}`);
    } catch (error) {
        console.log('Error while connecting to Db', error);
    }
}

export default connectDB 