import { Router } from "express";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/toggle-video-like/:videoId").post(verifyJwt, toggleVideoLike)
router.route("/toggle-comment-like/:commentId").post(toggleCommentLike)
router.route("/toggle-tweet-like/:tweetId").post(toggleTweetLike)
router.route("/liked-videos").get(verifyJwt, getLikedVideos)

export default router;