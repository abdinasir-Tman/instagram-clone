// import the packages
import express from "express";

//import your files
import { port } from "./config/initial.config.js";
import chalk from "chalk";
import userRoute from "./routes/user.route.js";

// Initializing the app
const app = express();
app.use(express.json());

// rest of your code here
app.use("/api/v1/users", userRoute);
app.listen(port, () => {
  console.log(`${chalk.green.bold("Server")} is listening on port ${port}`);
});