import { Router } from "express";
import { userAuth } from "../middlewares/authenticat.js";
import upload from "../middlewares/multer.js";
import { register } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/register-post", userAuth, upload.single("image"), register);

export default postRouter;
