import express from "express";
import {
  login,
  read,
  userRegister,
  verify,
} from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/register-user", userRegister);
userRoute.post("/login", login);
userRoute.get("/verify-user", verify);
userRoute.get("/read-user", read);

export default userRoute;
