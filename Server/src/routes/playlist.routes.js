import {Router} from "express"
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router()
router.use(verifyJwt)
router.route("/create-playlist/:videoId").post(createPlaylist)
router.route("/update-playlist/:playlistId").patch(updatePlaylist)
router.route("/delete-playlist/:playlistId").delete(deletePlaylist)
router.route("/add-video-to-playlist/:playlistId/:videoId").post(addVideoToPlaylist)
router.route("/remove-video-from-playlist/:playlistId/:videoId").patch(removeVideoFromPlaylist)
router.route("get-playlist/:playlistId").get(getPlaylistById)

export default router;