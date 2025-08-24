import userModel from "../../Database/models/user.model.js";
import AppErorr from "../utils/AppError.js";
import catchError from "./catchError.js";
import jwt from "jsonwebtoken";

export const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppErorr("token must be provided", 401));
  let decoded = jwt.decode(token, process.env.JWT_KEY);
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppErorr("user not found", 401));
  if (user.passwordChangedAt) {
    let time = parseInt(user?.passwordChangedAt.getTime() / 1000);
    if (time > decoded.iat) return next(new AppErorr("invalid token", 401));
  }

  req.user = user;
  next();
});

export const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppErorr("You are not allowed", 401));
    }
    next();
  });
};
