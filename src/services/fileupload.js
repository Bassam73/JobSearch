import mongoose from "mongoose";
import AppErorr from "../utils/AppError.js";
import multer from "multer";

const fileUpload = () => {
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("application/pdf")) cb(null, true);
    else {
      cb(new AppErorr("PDF Only", 401), false);
    }
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, new mongoose.Types.ObjectId() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage, fileFilter });

  return upload;
};

export const uploadSingleFile = (fieldName) => fileUpload().single(fieldName);
export const uploadArrayOfFiles = (fieldName) =>
  fileUpload().array(fieldName, 10);
export const uploadFields = (fields) => fileUpload().fields(fields);
