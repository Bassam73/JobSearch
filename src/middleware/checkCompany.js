import companyModel from "../../Database/models/company.model.js";
import AppErorr from "../utils/AppError.js";

export const checkCompany = async (req, res, next) => {
  if (req.method == "POST") {
    if (req.body.companyName) {
      let company = await companyModel.findOne({
        companyName: req.body.companyName,
      });
      if (company) return next(new AppErorr("company name exist", 409));
    }
    if (req.body.companyEmail) {
      let company = await companyModel.findOne({
        companyEmail: req.body.companyEmail,
      });
      if (company)
        return next(new AppErorr("company email already exist", 409));
    }
    if (req.user._id) {
      let company = await companyModel.findOne({ companyHR: req.user._id });
      if (company)
        return next(new AppErorr("you already a hr in another company", 409));
    }
  }
  if (req.method == "PATCH") {
    if (req.body.companyName) {
      let company = await companyModel.findOne({
        companyName: req.body.companyName,
      });
      if (company) return next(new AppErorr("company name exist", 409));
    }
    if (req.body.companyEmail) {
      let company = await companyModel.findOne({
        companyEmail: req.body.companyEmail,
      });
      if (company)
        return next(new AppErorr("company email already exist", 409));
    }
  }

  next();
};
