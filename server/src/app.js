// import the packages
import express from "express";
import chalk from "chalk";

//import your files
import { port } from "./config/initial.config.js";
import userRoute from "./routes/user.route.js";
import morgan from "morgan";
import postRouter from "./routes/post.route.js";
import cookieParser from "cookie-parser";

// Initializing the app
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
// rest of your code here
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRouter);

app.listen(port, () => {
  console.log(`${chalk.green.bold("Server")} is listening on port ${port}`);
});
