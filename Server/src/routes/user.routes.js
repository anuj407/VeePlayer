import {Router} from "express"
import { changePassword, getUserProfile, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserAccount, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    // multer middleware to handle file uploads.
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJwt, changePassword)
router.route("/getUser").get(verifyJwt,getUserProfile)
router.route("/updateUserAccount").post(verifyJwt,updateUserAccount)
router.route("/updateAvatar").post(
    upload.fields([{
    name: "avatar",
    maxCount: 1
  }]),
  verifyJwt,
  updateUserAvatar
)
router.route("/updateCoverImage").post(
    upload.fields([{
    name: "coverImage",
    maxCount: 1
  }]),
  verifyJwt,
  updateUserCoverImage
)
export default router;