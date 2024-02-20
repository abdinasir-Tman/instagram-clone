import prisma from "../../prisma/client.js";
import cloudinary from "../config/cloudinary.js";
import uploadVideo from "../config/uploadVideo.js";

export const register = async (req, res) => {
  try {
    const { content } = req.body;
    let result;

    if (req.file) {
      const encodeImage = `data:image/jpg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodeImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
        folder: "instigram-posts",
      });
    }

    const post = await prisma.post.create({
      data: {
        content,
        image: {
          url: result?.url,
          publicId: result?.public_id,
        },
        userId: req.user.id,
      },
    });

    res.status(201).send({ status: true, message: post });
  } catch (error) {
    console.log("error at register user ", error);
    res.status(500).send(error.message);
  }
};
export const registerStatus = async (req, res) => {
  try {
    let video;
    if (req.file) {
      video = uploadVideo(req.file.path);

      console.log("this is the video ", video);
      res.status(201).send({ status: true, message: video });
    }
  } catch (error) {
    console.log("error at register user ", error);
    res.status(500).send(error.message);
  }
};
