import mongoose from "mongoose";

let schema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "job",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userTechSkills: [],
    userSoftSkills: [],
    userResume: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
schema.virtual("user", {
  ref: "user",
  localField: "userId",
  foreignField: "_id",
});
schema.pre("find", function () {
  this.populate("user");
});
schema.post("init", function (doc) {
  console.log(process.env.baseUrl);
  doc.userResume = process.env.baseUrl + "uploads/" + doc.userResume;
});

let applicationModel = mongoose.model("application", schema);

export default applicationModel;
