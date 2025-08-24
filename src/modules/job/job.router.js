import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  addJob,
  applyjob,
  deleteJob,
  getJobs,
  getSpecificCompanyJobs,
  updateJob,
} from "./job.controller.js";
import {
  addJobVal,
  applyJobVal,
  paramsIdVal,
  updateJobVal,
} from "./job.validation.js";
import { allowedTo, protectedRoutes } from "../../middleware/auth.js";
import { uploadSingleFile } from "../../services/fileupload.js";

let jobRouter = express.Router();

jobRouter
  .route("/")
  .post(protectedRoutes, allowedTo("Company_HR"), validation(addJobVal), addJob)
  .get(protectedRoutes, allowedTo("Company_HR", "User"), getJobs);

jobRouter.get(
  "/getSpecificCompanyJobs",
  protectedRoutes,
  allowedTo("User", "Company_HR"),
  getSpecificCompanyJobs
);
jobRouter
  .route("/:id")
  .delete(
    protectedRoutes,
    allowedTo("Company_HR"),
    validation(paramsIdVal),
    deleteJob
  )
  .patch(
    protectedRoutes,
    allowedTo("Company_HR"),
    validation(updateJobVal),
    updateJob
  );

jobRouter.post(
  "/applyJob/:id",
  protectedRoutes,
  allowedTo("User"),
  uploadSingleFile("userResume"),
  validation(applyJobVal),
  applyjob
);

export default jobRouter;
