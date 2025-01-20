import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './db/db.js';
const app = express();
dotenv.config()
db()

app.use(cors({
   origin: process.env.CORS_ORIGIN,
   credentials: true
}))
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({ extended: true , limit: "20kb"  }))
app.use(express.static('public'))
app.use(cookieParser())
app.get('/', function(req,res){
    res.send("Home")
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));