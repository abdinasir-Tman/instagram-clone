import prisma from "../../prisma/client.js";
import userSchema from "../utils/schema/userSchema.js";
import {
  comparePassword,
  hashedPassword,
} from "../utils/schema/passwordUtils.js";
import { generateVerificationToken } from "../utils/generations.js";
import { JWT_SECRET_KEY, WEB_URL } from "../config/initial.config.js";
import sendVerificationEmail from "../utils/emails/verificationEmail.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { error } = userSchema.validate(req.body);

    if (error) return res.json({ status: 502, message: error.message });

    const isUserExist = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.toLowerCase() },
          { email: email.toLowerCase() },
        ],
      },
    });

    if (isUserExist) return res.json({ message: "User already exists" });

    const passwordHashed = await hashedPassword(password);

    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 2);

    const verificationToken = generateVerificationToken();

    const newUser = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        password: passwordHashed,
        email: email.toLowerCase(),
        token: verificationToken,
        expireDate,
      },
    });

    const verificationLink = `${WEB_URL}/users/verify?token=${verificationToken}&userId=${newUser.id}`;

    const info = {
      token: verificationLink,
      name: username,
    };

    await sendVerificationEmail(email, info);

    newUser.password = undefined;

    res.status(200).send({ status: 201, message: newUser });
  } catch (error) {
    console.log("error at register user ", error);
    res.status(500).send(error.message);
  }
};

export const verify = async (req, res) => {
  try {
    const { token, userId: id } = req.query;

    const user = await prisma.user.findFirst({
      where: {
        token,
        id,
      },
    });

    if (!user) return res.status(400).send("Invalid Token...");

    if (!user.expireDate || new Date() > user.expireDate) {
      return res.status(400).send("Token has expired");
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isEmailConfirmed: true,
        token: null,
        expireDate: null,
      },
    });
    res.status(200).send({ status: true, message: "Token has been verified." });
  } catch (error) {
    console.log("error at verify user ", error);
    res.status(400).send(err.message);
  }
};
export const read = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).send({ status: true, message: users });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username?.toLowerCase() },
          { email: email?.toLowerCase() },
        ],
      },
    });
    console.log(user);
    if (!user?.isEmailConfirmed)
      return res.status(404).send("First confirm your email ");

    if (!user || !(await comparePassword(password, user.password)))
      return res.status(404).send("username or password is incorrect");

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
    });

    user.password = undefined;

    res.status(200).send({ status: true, message: user });
  } catch (error) {
    console.log("error at login ", error);
  }
};
