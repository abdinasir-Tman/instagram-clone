import multer, { memoryStorage } from "multer";

const storage = memoryStorage();

export const uploadImage = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const multerVideo = multer({ storage });
