import userModel from "../../Database/models/user.model.js";
import AppErorr from "../utils/AppError.js";

export const checkUser = async (req, res, next) => {
  if (req.body.email) {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) return next(new AppErorr("user already exist", 409));
  }
  if (req.body.mobileNumber) {
    let user = await userModel.findOne({ mobileNumber: req.body.mobileNumber });
    if (user) return next(new AppErorr("user already exist", 409));
  }

  next();
};
