import mongoose from "mongoose";
import bcrypt from "bcrypt";

let schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    recoveryEmail: {
      type: String,
      trim: true,
      required: true,
    },
    mobileNumber: String,
    DOB: Date,
    role: {
      type: String,
      enum: ["User", "Company_HR"],
      default: "User",
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    passwordChangedAt: Date,
    otp: Number,
    otpCreatedAt: Date,
  },
  { timestamps: true }
);
  
schema.pre("save", function () {
  if (this.password) this.password = bcrypt.hashSync(this.password, 8);
});

let userModel = mongoose.model("user", schema);

export default userModel;
