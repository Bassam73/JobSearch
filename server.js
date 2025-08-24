process.on("uncaughtException", (err) => {
  console.log("error : ", err);
});

import express from "express";
import dotenv from "dotenv";
import dbConnection from "./Database/dbConnection.js";
import { globalErrorHandler } from "./src/middleware/globalErrorHandler.js";
import AppErorr from "./src/utils/AppError.js";
import { bootstrap } from "./src/modules/index.routes.js";
let app = express();
dbConnection();
dotenv.config();
app.use(express.static("/uploads"));
let port = 3000;
app.use(express.json());
bootstrap(app);
app.use("*", (req, res, next) => {
  next(new AppErorr(`Not found endpoint ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);
process.on("unhandledRejection", (err) => {
  console.log("error : ", err);
});
app.listen(port, () => console.log("server is runinng"));
