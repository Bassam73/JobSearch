import express from "express";
import { validation } from "../../middleware/validation.js";

import { protectedRoutes, allowedTo } from "../../middleware/auth.js";
import {
  addCompany,
  deleteCompany,
  getApplicataionsForJob,
  getCompanyData,
  searchCompany,
  updateCompany,
} from "./company.controller.js";
import {
  addCompanyVal,
  paramsIdVal,
  searchCompanyVal,
  updateCompanyVal,
} from "./company.validation.js";
import { checkCompany } from "../../middleware/checkCompany.js";

let companyRouter = express.Router();

companyRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("Company_HR"),
    validation(addCompanyVal),
    checkCompany,
    addCompany
  )
  .patch(
    protectedRoutes,
    allowedTo("Company_HR"),
    validation(updateCompanyVal),
    checkCompany,
    updateCompany
  )
  .delete(protectedRoutes, allowedTo("Company_HR"), deleteCompany)
  .get(
    protectedRoutes,
    allowedTo("Company_HR", "User"),
    validation(searchCompanyVal),
    searchCompany
  );

companyRouter.get(
  "/:id",
  protectedRoutes,
  allowedTo("Company_HR"),
  validation(paramsIdVal),
  getCompanyData
);
companyRouter.get(
  "/applicationsForJob/:id",
  protectedRoutes,
  allowedTo("Company_HR"),
  validation(paramsIdVal),
  getApplicataionsForJob
);

export default companyRouter;
