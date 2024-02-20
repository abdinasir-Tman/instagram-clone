import { Router } from "express";
import { userAuth } from "../middlewares/authenticat.js";
import { multerVideo, uploadImage } from "../middlewares/multer.js";
import { register, registerStatus } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post(
  "/register-post",
  userAuth,
  uploadImage.single("image"),
  register
);
postRouter.post("/status", multerVideo.single("video"), registerStatus);

export default postRouter;
