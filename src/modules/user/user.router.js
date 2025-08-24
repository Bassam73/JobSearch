import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  forgetPasswordVal,
  paramsIdVal,
  resetPasswordVal,
  signInVal,
  signUpVal,
  specificRecoveryEmailAccountsVal,
  updateAccountVal,
  updatePasswordVal,
} from "./user.validation.js";
import {
  deleteAccount,
  forgetPassword,
  getAccount,
  getAnotherUserAccount,
  resetPassword,
  signIn,
  signUp,
  specificRecoveryEmailAccounts,
  updateAccount,
  updatePassword,
} from "./user.controller.js";
import { checkUser } from "../../middleware/checkUser.js";
import { protectedRoutes, allowedTo } from "../../middleware/auth.js";

let userRouter = express.Router();

userRouter.post("/signUp", validation(signUpVal), checkUser, signUp);
userRouter.post("/signIn", validation(signInVal), signIn);

userRouter
  .route("/account")
  .patch(
    protectedRoutes,
    allowedTo("User", "Company_HR"),
    checkUser,
    validation(updateAccountVal),
    updateAccount
  )
  .delete(protectedRoutes, allowedTo("User", "Company_HR"), deleteAccount)
  .get(protectedRoutes, allowedTo("User", "Company_HR"), getAccount);
userRouter.get("/account/:id", validation(paramsIdVal), getAnotherUserAccount);
userRouter.patch(
  "/updatePassword",
  protectedRoutes,
  allowedTo("User", "Company_HR"),
  validation(updatePasswordVal),
  updatePassword
);

userRouter.get(
  "/recoveryEmail",
  protectedRoutes,
  allowedTo("User", "Company_HR"),
  validation(specificRecoveryEmailAccountsVal),
  specificRecoveryEmailAccounts
);

userRouter.patch(
  "/forgetPassword",
  validation(forgetPasswordVal),
  forgetPassword
);
userRouter.patch("/resetPassword", validation(resetPasswordVal), resetPassword);



export default userRouter;
