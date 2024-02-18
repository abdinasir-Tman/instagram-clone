import express from "express";
import { userRegister } from "../controllers/user.controller.js";

const userRoute = express.Router();
userRoute.post("/register", userRegister);
export default userRoute;
