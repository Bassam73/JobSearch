import Joi from "joi";
export const addCompanyVal = Joi.object({
  companyName: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(2).max(500).required(),
  industry: Joi.string().trim().min(4).max(200).required(),
  address: Joi.string().trim().min(4).max(200).required(),
  numberOfEmployees: Joi.string().trim().required(),
  companyEmail: Joi.string().email().trim().required(),
  companyHR: Joi.string().hex().length(24),
});

export const updateCompanyVal = Joi.object({
  companyName: Joi.string().trim().min(2).max(100),
  description: Joi.string().trim().min(2).max(500),
  industry: Joi.string().trim().min(4).max(200),
  address: Joi.string().trim().min(4).max(200),
  numberOfEmployees: Joi.string()
    .regex(/^(\d+)-(\d+)\s*$/)
    .message("must be in range ex : 11-20"),
  companyEmail: Joi.string().email().trim(),
  companyHR: Joi.string().hex().length(24),
});
export const searchCompanyVal = Joi.object({
  companyName: Joi.string().trim().min(2).max(100).required(),
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().required().length(24),
});
