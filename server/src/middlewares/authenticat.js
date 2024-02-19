import { JWT_SECRET_KEY } from "../config/initial.config.js";
import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.send("please login first ");

    const encode = jwt.verify(token, JWT_SECRET_KEY);

    req.user = encode;

    next();
  } catch (err) {
    res.send("please login first ");
    console.log("error at authentication user ", err);
  }
};
