import dotenv from "dotenv";

dotenv.config();

export const port = process.env.SERVER_PORT || 8000;
export const WEB_URL = process.env.WEB_URL;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const cloudinary_Name = process.env.CLOUDINARY_NAME;
export const cloudinary_Api_Key = process.env.CLOUDINARY_API_KEY;
export const cloudinary_Api_Secret = process.env.CLOUDINARY_API_SECRET;
export const vimeo_Client_Id = process.env.VIMEO_CLIENT_ID;
export const vimeo_Client_Secret = process.env.VIMEO_CLIENT_SECRET;
export const vimeo_Access_Token = process.env.VIMEO_ACCESS_TOKEN;
