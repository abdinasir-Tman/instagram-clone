import dotenv from "dotenv";

dotenv.config();

export const port = process.env.SERVER_PORT || 8000;
export const WEB_URL = process.env.WEB_URL;
