import { Router } from "express";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJwt)
router.route("/toggle-video-like/:videoId").post(toggleVideoLike)
router.route("/toggle-comment-like/:commentId").post(toggleCommentLike)
router.route("/toggle-tweet-like/:tweetId").post(toggleTweetLike)
router.route("/liked-videos").get(getLikedVideos)

export default router;