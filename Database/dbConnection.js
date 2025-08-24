import mongoose from "mongoose";
export default function dbConnection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/jobSearch")
    .then(() => {
      console.log("database is online");
    })
    .catch((err) => console.log(err));
}
