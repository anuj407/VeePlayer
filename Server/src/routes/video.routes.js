import { Router } from "express";
import { deleteVideo, getAllVideos, getVideoById, PublishedVideo, togglePublishedStatus, updateVideo, UpdateViews } from "../controllers/video.controller.js";
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
router.route("/views/:id").patch(verifyJwt,UpdateViews)
router.route("/getAllVideos/:userId").get(getAllVideos)
router.route("/getVideo/:videoId").get(getVideoById)
router.route("/updateVideo").patch(
    upload.single("thumbnail"),
    verifyJwt,
    updateVideo
)
router.route("/deleteVideo/:videoId").delete(deleteVideo)
router.route("/PublishedStatus/:videoId").patch(togglePublishedStatus)
export default router;