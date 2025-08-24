import applicationModel from "../../../Database/models/application.model.js";
import companyModel from "../../../Database/models/company.model.js";
import jobModel from "../../../Database/models/job.model.js";
import catchError from "../../middleware/catchError.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import AppErorr from "../../utils/AppError.js";

// Define the addJob API endpoint
export const addJob = catchError(async (req, res, next) => {
  // Find the company where the current user is the HR
  let company = await companyModel.findOne({ companyHR: req.user._id });

  // If no company is found, send a 404 response
  if (!company)
    return res.status(404).json({ message: "You are not HR of any company" });

  // Assign the addedBy field with the current user's ID
  req.body.addedBy = req.user._id;

  // Create a new job instance with the request body
  let job = new jobModel(req.body);

  // Save the job to the database
  await job.save();

  // Send success message along with the job object in the response
  res.json({ message: "Success", job });
});

// Define the updateJob API endpoint
export const updateJob = catchError(async (req, res, next) => {
  // Find and update the job based on the current user's ID as the addedBy and job ID
  let job = await jobModel.findOneAndUpdate(
    {
      addedBy: req.user._id,
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );

  // If no job is found or the user is not the owner, send a 404 response
  !job &&
    res
      .status(404)
      .json({ message: "Job not found or you are not the owner of this job" });

  // If job is found, send success message along with the updated job in the response
  job && res.json({ message: "Success", job });
});

// Define the deleteJob API endpoint
export const deleteJob = catchError(async (req, res, next) => {
  // Find and delete the job based on the current user's ID as the addedBy and job ID
  let job = await jobModel.findOneAndDelete({
    addedBy: req.user._id,
    _id: req.params.id,
  });

  // If no job is found or the user is not the owner, send a 404 response
  !job &&
    res
      .status(404)
      .json({ message: "Job not found or you are not the owner of this job" });

  // If job is found, send success message along with the deleted job in the response
  job && res.json({ message: "Deleted", job });
});

// Define the getJobs API endpoint
export const getJobs = catchError(async (req, res, next) => {
  // Create an instance of ApiFeatures with the initial mongoose query and request query parameters
  let apiFeatures = new ApiFeatures(
    jobModel.find().populate("company"),
    req.query
  );

  // Apply pagination, field selection, filtering, searching, and sorting to the query
  apiFeatures = apiFeatures.pagination().fields().filter().search().sort();

  // Execute the final mongoose query
  let jobs = await apiFeatures.mongooseQuery;

  // If no jobs are found, send a 404 response
  !jobs && res.status(404).json({ message: "There are no jobs" });

  // If jobs are found, send success message along with the page number and jobs in the response
  jobs && res.json({ message: "Success", page: apiFeatures.pageNumber, jobs });
});

// Define the getSpecificCompanyJobs API endpoint
export const getSpecificCompanyJobs = catchError(async (req, res, next) => {
  // Find the company by companyName in the database
  let company = await companyModel.findOne({ companyName: req.query.name });

  // If no company is found, return a 404 error
  if (!company) return next(new AppErorr("Company not found", 404));

  // Find jobs added by the company's HR
  let jobs = await jobModel.find({ addedBy: company.companyHR });

  // If no jobs are found, return a 404 error
  if (jobs.length === 0)
    return next(new AppErorr("There are no jobs added by this company yet"));

  // Send success message along with the jobs in the response
  res.json({ message: "Success", jobs });
});

// Define the applyjob API endpoint
export const applyjob = catchError(async (req, res, next) => {
  // Find the job by ID in the database
  let job = await jobModel.findById(req.params.id);

  // Split the comma-separated tech and soft skills into arrays
  req.body.userTechSkills = req.body.userTechSkills.split(",");
  req.body.userSoftSkills = req.body.userSoftSkills.split(",");

  // If no job is found, return a 404 error
  if (!job) return next(new AppErorr("Job not found", 404));

  // Assign necessary fields for the application
  req.body.jobId = job._id;
  req.body.userId = req.user._id;
  req.body.userResume = req.file.filename;

  // Create a new application instance with the request body
  let app = new applicationModel(req.body);

  // Save the application to the database
  await app.save();

  // Send success message along with the application object in the response
  res.json({ message: "Success", app });
});
