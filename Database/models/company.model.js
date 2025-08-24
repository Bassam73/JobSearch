import mongoose from "mongoose";

let schema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    industry: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    numberOfEmployees: {
      type: String,
      required: true,
      trim: true,
    },
    companyEmail: {
      type: String,
      unique: true,
      required: true,
    },
    companyHR: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
schema.virtual("jobs", {
  ref: "job",
  localField: "companyHR",
  foreignField: "addedBy",
});
schema.pre("findOne", function () {
  this.populate("jobs");
});
let companyModel = mongoose.model("company", schema);

export default companyModel;
