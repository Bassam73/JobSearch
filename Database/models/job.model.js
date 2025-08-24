import mongoose from "mongoose";

let schema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
      required: true,
    },
    jobLocation: {
      type: String,
      enum: ["onsite", "remotely", "hybrid"],
      required: true,
      default: "onsite",
    },
    workingTime: {
      type: String,
      enum: ["part-time", "full-time"],
      required: true,
      default: "full-time",
    },
    seniorityLevel: {
      type: String,
      enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    technicalSkills: [],
    softSkills: [],
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
schema.virtual("company", {
  ref: "company",
  localField: "addedBy",
  foreignField: "companyHR",
});
schema.pre("find", function () {
  this.populate("company");
});
let jobModel = mongoose.model("job", schema);

export default jobModel;
