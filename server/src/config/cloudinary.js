import { v2 as cloudinary } from "cloudinary";
import {
  cloudinary_Api_Key,
  cloudinary_Api_Secret,
  cloudinary_Name,
} from "./initial.config.js";

cloudinary.config({
  cloud_name: cloudinary_Name,
  api_key: cloudinary_Api_Key,
  api_secret: cloudinary_Api_Secret,
});

export default cloudinary;
