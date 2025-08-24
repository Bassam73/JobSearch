import Joi from "joi";
export const addJobVal = Joi.object({
  jobTitle: Joi.string().trim().min(2).max(100).required(),
  jobLocation: Joi.string().valid("onsite", "remotely", "hybrid").required(),
  workingTime: Joi.string().valid("part-time", "full-time").required(),
  seniorityLevel: Joi.string()
    .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO")
    .required(),
  jobDescription: Joi.string().min(10).max(1500).trim().required(),
  technicalSkills: Joi.array().required(),
  softSkills: Joi.array().required(),
  addedBy: Joi.string().hex().length(24),
});

export const updateJobVal = Joi.object({
  jobTitle: Joi.string().trim().min(2).max(100),
  jobLocation: Joi.string().valid("onsite", "remotely", "hybrid"),
  workingTime: Joi.string().valid("part-time", "full-time"),
  seniorityLevel: Joi.string().valid(
    "Junior",
    "Mid-Level",
    "Senior",
    "Team-Lead",
    "CTO"
  ),
  jobDescription: Joi.string().min(10).max(1500).trim(),
  technicalSkills: Joi.string(),
  softSkills: Joi.string(),
  id: Joi.string().hex().required().length(24),
});
export const applyJobVal = Joi.object({
  userTechSkills: Joi.string()
    .regex(/^(\w+(,\s*\w+)*)?$/)
    .message(
      'must be a string of words and every word should have comma like ("back-end,fron-end") '
    )
    .required(),
  userSoftSkills: Joi.string()
    .regex(/^(\w+(,\s*\w+)*)?$/)
    .message(
      'must be a string of words and every word should have comma like ("communications,leadership") '
    )
    .required(),
  userResume: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    size: Joi.number().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }),
  id: Joi.string().hex().required().length(24),
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().required().length(24),
});
