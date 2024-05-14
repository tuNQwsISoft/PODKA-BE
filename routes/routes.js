import { Router } from "express";
import {
  createPodcast,
  getAllPodcasts,
  getPodcastById,
} from "../controllers/PodcastController.js";
import {
  getUser,
  login,
  register,
  logout,
} from "../controllers/UserController.js";
import {
  createCategory,
  getAllCategory,
} from "../controllers/CategoryController.js";
import uploadPodcast from "../upload/uploadPodcast.js";
import uploadBackgroundSound from "../upload/uploadBackgroundSound.js";
import {
  getAllPublicBackgroundSounds,
  getPublicBackgroundSoundById,
  getAllPublicBackgroundSoundByUser,
  getPublicBackgroundSoundByUserById,
  createBackgroundSound,
} from "../controllers/BackgroundSoundController.js";

const router = Router();

// route post cast
router.route("/create/post-cast").post(createPodcast);
router.route("/get-all-post-cast").get(getAllPodcasts);
router.route("/get-post-cast/:id").get(getPodcastById);

// route category
router.route("/create-category").post(createCategory);
router.route("/get-all-category").get(getAllCategory);

// router user
router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/auth/logout").post(logout);
router.route("/auth/get-information").get(getUser);
router.use("/upload-podcast", uploadPodcast);

// route background sound

router.route("/create-background-sound").post(createBackgroundSound);

router
  .route("/get-all-background-sound-public")
  .get(getAllPublicBackgroundSounds);
router
  .route("/get-background-sound-public/:id")
  .get(getPublicBackgroundSoundById);
router
  .route("/get-background-sound-public-user/:userId")
  .get(getAllPublicBackgroundSoundByUser);
router
  .route("/get-background-sound-public-user/:userId/:id")
  .get(getPublicBackgroundSoundByUserById);

router.use("/upload-background-sound", uploadBackgroundSound);

export default router;
