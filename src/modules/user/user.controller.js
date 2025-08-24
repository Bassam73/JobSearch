import userModel from "../../../Database/models/user.model.js";
import catchError from "../../middleware/catchError.js";
import AppErorr from "../../utils/AppError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the signUp API endpoint
export const signUp = catchError(async (req, res, next) => {
  // Create a new user instance with the request body
  let user = new userModel(req.body);

  // Generate a userName based on firstName and lastName
  user.userName = user.firstName + " " + user.lastName;

  // Save the user to the database
  await user.save();

  // Send success message along with the user object in the response
  res.json({ message: "Success", user });
});

// Define the signIn API endpoint
export const signIn = catchError(async (req, res, next) => {
  let user;

  // Check if email is provided and find user by email
  if (req.body.email) {
    user = await userModel.findOne({ email: req.body.email });
  }

  // If email is not provided, check if mobileNumber is provided and find user by mobileNumber
  if (req.body.mobileNumber) {
    user = await userModel.findOne({ mobileNumber: req.body.mobileNumber });
  }

  // If user is not found, return an error
  if (!user) {
    return next(new AppErorr("User not found. Please sign up first.", 401));
  }

  // Compare provided password with the hashed password in the user object
  if (bcrypt.compareSync(req.body.password, user.password)) {
    // If passwords match, generate a JWT token
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );

    // Send success message along with the token in the response
    res.json({ message: "Signed in successfully", token });
  } else {
    // If passwords do not match, return an error
    return next(new AppErorr("Incorrect password", 401));
  }
});

// Define the updateAccount API endpoint
export const updateAccount = catchError(async (req, res, next) => {
  // Find the user by ID in the database
  let user = await userModel.findById(req.user._id);

  // Check if firstName or lastName is provided, update userName accordingly
  if (req.body.firstName || req.body.lastName) {
    req.body.userName =
      (req.body.firstName || user.firstName) +
      " " +
      (req.body.lastName || user.lastName);
  }

  // Update the user in the database and return the updated user
  user = await userModel.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  // If user is not found, send a 404 response
  !user && res.status(404).json({ message: "User not found" });

  // If user is found, send success message along with the updated user in the response
  user && res.json({ message: "Success", user });
});

// Define the deleteAccount API endpoint
export const deleteAccount = catchError(async (req, res, next) => {
  // Delete the user by ID (get it from middleware) from database
  await userModel.findByIdAndDelete(req.user._id);

  // Send success message in the response
  res.json({ message: "Account deleted" });
});

export const getAccount = catchError(async (req, res, next) => {
  //from middleware auth fucntion protectedroutes
  res.json(req.user);
});

// Define the getAnotherUserAccount API endpoint
export const getAnotherUserAccount = catchError(async (req, res, next) => {
  // Find the user by ID in the database
  let user = await userModel.findById(req.params.id);

  // If user is not found, send a 404 response
  !user && res.status(404).json({ message: "User not found" });

  // If user is found, send success message along with the user in the response
  user && res.json({ message: "Success", user });
});

// Define the updatePassword API endpoint
export const updatePassword = catchError(async (req, res, next) => {
  // Find the user by ID in the database
  let user = await userModel.findById(req.user._id);

  // Check if the provided password matches the user's current password
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    // Update user's password and set passwordChangedAt field
    await userModel.findByIdAndUpdate(req.user._id, {
      password: bcrypt.hashSync(req.body.newPassword, 8),
      passwordChangedAt: Date.now(),
    });

    // Generate a new JWT token with updated iat time
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );

    // Send success message along with the new token in the response
    res.json({ message: "Password changed successfully", token });
  } else {
    // If provided password is incorrect, return an error
    next(new AppErorr("Incorrect password", 401));
  }
});

// Define the specificRecoveryEmailAccounts API endpoint
export const specificRecoveryEmailAccounts = catchError(
  async (req, res, next) => {
    // Find users by recoveryEmail in the database
    let users = await userModel.find({ recoveryEmail: req.body.recoveryEmail });

    // If no users are found, send a 404 response
    !users &&
      res
        .status(404)
        .json({ message: "No users found for this recovery email" });

    // If users are found, send success message along with the users in the response
    users && res.json({ message: "Success", users });
  }
);

// Define the forgetPassword API endpoint
export const forgetPassword = catchError(async (req, res, next) => {
  // Generate a random OTP with 5 digits
  let otp = generateRandomNumber(5);

  // Find the user by email in the database and update OTP and OTP creation timestamp
  let user = await userModel.findOneAndUpdate(
    { email: req.body.email },
    { otp, otpCreatedAt: Date.now() }
  );

  // If no user is found, send a 404 response
  !user && res.status(404).json({ message: "User not found" });

  // If user is found, send the OTP in the response
  user && res.json({ otp });
});

// Define the resetPassword API endpoint
export const resetPassword = catchError(async (req, res, next) => {
  // Get the current timestamp
  let time = Date.now();

  // Find the user by email in the database
  let user = await userModel.findOne({ email: req.body.email });

  // If no user is found, return a 404 error
  if (!user) return next(new AppErorr("User not found", 404));

  // Calculate the valid OTP expiration time (10 minutes after creation)
  let validOtpTime = new Date(user.otpCreatedAt);
  validOtpTime.setMinutes(validOtpTime.getMinutes() + 10);

  // Check if the provided OTP is expired or incorrect
  if (time > validOtpTime || user.otp !== req.body.otp || !user.otp)
    return next(new AppErorr("OTP is expired or incorrect"));

  // Update user's password, clear OTP fields
  user.password = req.body.newPassword;
  user.otp = null;
  user.otpCreatedAt = null;

  // Update the user in the database
  await userModel.updateOne(
    { email: user.email },
    {
      password: bcrypt.hashSync(user.password, 8),
      passwordChangedAt: Date.now(),
      otp: user.otp,
      otpCreatedAt: user.otpCreatedAt,
    }
  );

  // Send success message in the response
  res.json({ message: "Password changed successfully. You can now login." });
});

function generateRandomNumber(length) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
