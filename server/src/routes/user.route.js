import express from "express";
import { read, userRegister, verify } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.get("/verify-user", verify);
userRoute.get("/read", read);

export default userRoute;
