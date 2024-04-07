import { Router } from "express";
import {
  createPodcast,
  getAllPodcasts,
  getPodcastById,
} from "../controllers/PodcastController.js";
import { register } from "../controllers/UserController.js";

const router = Router();

router.route("/create/post-cast").post(createPodcast);
router.route("/get-all-post-cast").get(getAllPodcasts);
router.route("/get-post-cast/:id").get(getPodcastById);

router.route("/auth/register").post(register);

export default router;
