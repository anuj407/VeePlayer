import {Router} from 'express'
import { createTweet, deleteTweet, getAllTweets, updateTweet } from '../controllers/tweet.controller.js'
import {verifyJwt} from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/create-tweet").post(verifyJwt,createTweet)
router.route("/get-all-tweets/:userId").get(getAllTweets)
router.route("/update-tweet/:tweetId").post(updateTweet)
router.route("/delete-tweet/:tweetId").delete(deleteTweet)
export default router