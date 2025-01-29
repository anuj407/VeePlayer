import { Router } from "express";
import { UpdateViews, uploadVideo } from "../controllers/video.controller.js";
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
    uploadVideo
)
router.route("/views/:id").post(verifyJwt,UpdateViews)

export default router;