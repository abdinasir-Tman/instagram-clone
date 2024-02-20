import { Vimeo } from "vimeo";
import {
  vimeo_Access_Token,
  vimeo_Client_Id,
  vimeo_Client_Secret,
} from "./initial.config.js";

const client = new Vimeo(
  vimeo_Client_Id,
  vimeo_Client_Secret,
  vimeo_Access_Token
);

export default client;
