import prisma from "../../prisma/client.js";
import userSchema from "../utils/schema/userSchema.js";
import { hashedPassword } from "../utils/schema/passwordUtils.js";
import { generateVerificationToken } from "../utils/generations.js";
import { WEB_URL } from "../config/initial.config.js";
import sendVerificationEmail from "../utils/emails/verificationEmail.js";

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
    const { token, userId } = req.query;

    const user = await prisma.user.findFirst({
      where: {
        token: token,
        id: userId,
      },
    });

    if (!user) return res.status(400).send("Invalid Token...");

    if (!user.expireDate || new Date() > user.expireDate) {
      return res.status(400).send("Token has expired");
    }

    await prisma.user.update({
      where: {
        id: userId,
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
