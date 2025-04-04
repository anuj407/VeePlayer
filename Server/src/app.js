import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"]
 }))
 app.use(express.json({limit: "20kb"}))
 app.use(express.urlencoded({ extended: true , limit: "20kb"  }))
 app.use(express.static('public'))
 app.use(cookieParser())


 // Routes Import 
 import userRouter from './routes/user.routes.js'
 import videoRouter from "./routes/video.routes.js"
 import likeRouter from "./routes/like.routes.js"
 import commentRouter from "./routes/comment.routes.js"
 import playlistRouter from "./routes/playlist.routes.js"
 import tweetRouter from "./routes/tweet.routes.js"

//Routes Declarations
app.use('/api/v1/users',userRouter);
app.use('/api/v1/videos',videoRouter)
app.use('/api/v1/likes',likeRouter)
app.use('/api/v1/comments',commentRouter)
app.use('/api/v1/playlists',playlistRouter)
app.use('/api/v1/tweets',tweetRouter)

 export {app}