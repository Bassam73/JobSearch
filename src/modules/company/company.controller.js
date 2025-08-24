import catchError from "../../middleware/catchError.js";
import companyModel from "../../../Database/models/company.model.js";
import applicationModel from "../../../Database/models/application.model.js";
import jobModel from "../../../Database/models/job.model.js";
import AppErorr from "../../utils/AppError.js";

// Define the addCompany API endpoint
export const addCompany = catchError(async (req, res, next) => {
  // Assign the companyHR field with the current user's ID
  req.body.companyHR = req.user._id;

  // Create a new company instance with the request body
  let company = new companyModel(req.body);

  // Save the company to the database
  await company.save();

  // Send success message along with the company object in the response
  res.json({ message: "Success", company });
});

// Define the updateCompany API endpoint
export const updateCompany = catchError(async (req, res, next) => {
  // Find and update the company based on the current user's ID as the companyHR
  let company = await companyModel.findOneAndUpdate(
    {
      companyHR: req.user._id,
    },
    req.body,
    { new: true }
  );

  // If no company is found for the current user, send a 404 response
  !company &&
    res.status(404).json({ message: "You are not HR of any company" });

  // If company is found, send success message along with the updated company in the response
  company && res.json({ message: "Success", company });
});

// Define the deleteCompany API endpoint
export const deleteCompany = catchError(async (req, res, next) => {
  // Delete the company where the companyHR is the current user's ID
  await companyModel.findOneAndDelete({ companyHR: req.user._id });

  // Send success message in the response
  res.json({ message: "Company deleted" });
});

// Define the getCompanyData API endpoint
export const getCompanyData = catchError(async (req, res, next) => {
  // Find the company by ID and populate the "jobs" field
  let company = await companyModel.findById(req.params.id).populate("jobs");

  // If no company is found, send a 404 response
  !company && res.status(404).json({ message: "Company not found" });

  // If company is found, send success message along with the company in the response
  company && res.json({ message: "Success", company });
});

// Define the searchCompany API endpoint
export const searchCompany = catchError(async (req, res, next) => {
  // Find the company by companyName in the database
  let company = await companyModel.findOne({
    companyName: req.body.companyName,
  });

  // If no company is found, send a 404 response
  !company && res.status(404).json({ message: "Company not found" });

  // If company is found, send success message along with the company in the response
  company && res.json({ message: "Success", company });
});

// Define the getApplicataionsForJob API endpoint
export const getApplicataionsForJob = catchError(async (req, res, next) => {
  // Find the job by ID
  let job = await jobModel.findById(req.params.id);

  // If no job is found, return a 404 error
  if (!job) return next(new AppErorr("Job not found", 404));

  // Check if the user is the HR of the company that added the job
  if (!job.addedBy.equals(req.user._id))
    return next(new AppErorr("You are not HR of this company"));

  // Find applications for the job and populate the "user" field
  let applications = await applicationModel
    .find({ jobId: job._id })
    .populate("user");

  // If no applications are found, send a 404 response
  !applications &&
    res.status(404).json({ message: "This job has no applications yet" });

  // If applications are found, send success message along with the applications in the response
  applications && res.json({ message: "Success", applications });
});
