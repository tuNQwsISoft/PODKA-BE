import { Router } from "express";
import { createPostcast } from "../controllers/PostcastController.js";

const router = Router();

router.route("/create/post-cast").post(createPostcast);

export default router;
