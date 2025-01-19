import express from 'express';
import dotenv from 'dotenv';
import db from './db/db.js';
const app = express();
dotenv.config()
db()
app.get('/', function(req,res){
    res.send("Home")
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));