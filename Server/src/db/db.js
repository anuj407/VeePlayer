import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try{
        const connectionInstace= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB Connected DB !! HOST : ${connectionInstace.connection.host}`);
    }
    catch(err){
        console.error(`Error connecting to MongoDB: ${err.message} `);
        process.exit(1);
    }
} 

export default connectDB;