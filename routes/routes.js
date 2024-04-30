import { Router } from "express";
import {
  createPodcast,
  getAllPodcasts,
  getPodcastById,
} from "../controllers/PodcastController.js";
import { login, register } from "../controllers/UserController.js";
import {
  createCategory,
  getAllCategory,
} from "../controllers/CategoryController.js";
import uploadPodcast from "../upload/uploadPodcast.js";

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
router.use("/upload-podcast", uploadPodcast);

// upload audio podcast

export default router;
