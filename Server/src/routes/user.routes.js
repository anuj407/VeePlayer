import {Router} from "express"
import { changePassword, getUserChannelProfile, getCurrentUserProfile, getWatchHistory, logoutUser, refreshAccessToken, updateUserAccount, updateUserAvatar, updateUserCoverImage, SignInUser, AccessRefreshToken } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { checkToken, verifyJwt, verifyOptionalJwt } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(SignInUser)
router.route("/me").get(checkToken,AccessRefreshToken)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJwt, changePassword)
router.route("/getUser").get(verifyJwt,getCurrentUserProfile)
router.route("/updateUserAccount").patch(verifyJwt,updateUserAccount)
router.route("/updateAvatar").patch(
  upload.single("avatar"),
  verifyJwt,
  updateUserAvatar
)
router.route("/updateCoverImage").patch(
    upload.single("coverImage"),
  verifyJwt,
  updateUserCoverImage
)
router.route("/channel/:username").get(getUserChannelProfile)
router.route("/history").get(verifyJwt,getWatchHistory)
export default router;