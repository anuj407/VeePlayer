import { Router } from "express";
import { getAllVideos, getVideoById, PublishedVideo, updateVideo, UpdateViews } from "../controllers/video.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()
router.route("/uploadVideo").post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    verifyJwt,
    PublishedVideo
)
router.route("/views/:id").post(verifyJwt,UpdateViews)
router.route("/getAllVideos/:userId").get(getAllVideos)
router.route("/getVideo/:videoId").get(getVideoById)
router.route("/updateVideo").post(
    upload.single("thumbnail"),
    verifyJwt,
    updateVideo
)
export default router;