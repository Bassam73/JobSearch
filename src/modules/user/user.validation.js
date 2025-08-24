import Joi from "joi";
export const signUpVal = Joi.object({
  firstName: Joi.string().trim().min(2).max(100).required(),
  lastName: Joi.string().trim().min(2).max(100).required(),
  userName: Joi.string().trim().min(4).max(200),
  mobileNumber: Joi.string()
    .regex(/^(\+20\s?|0020\s?|0)(10|11|12|15)[0-9]{8}$/)
    .message("Please enter a valid Egyptian mobile number.")
    .required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .message(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit."
    )
    .required(),
  recoveryEmail: Joi.string().email().trim().required(),
  DOB: Joi.date()
    .iso()
    .raw()
    .max("now")
    .message(
      "Date of birth must be in the format YYYY-MM-DD and cannot be in the future."
    )
    .required(),
  role: Joi.string(),
});
export const signInVal = Joi.object({
  mobileNumber: Joi.string()
    .regex(/^(\+20\s?|0020\s?|0)(10|11|12|15)[0-9]{8}$/)
    .message("Please enter a valid Egyptian mobile number."),
  email: Joi.string().email().trim(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .message(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit."
    )
    .required(),
});

export const updateAccountVal = Joi.object({
  firstName: Joi.string().trim().min(2).max(100),
  lastName: Joi.string().trim().min(2).max(100),
  userName: Joi.string().trim().min(4).max(200),
  mobileNumber: Joi.string()
    .regex(/^(\+20\s?|0020\s?|0)(10|11|12|15)[0-9]{8}$/)
    .message("Please enter a valid Egyptian mobile number."),
  email: Joi.string().email().trim(),
  recoveryEmail: Joi.string().email().trim(),
  DOB: Joi.date()
    .iso()
    .raw()
    .max("now")
    .message(
      "Date of birth must be in the format YYYY-MM-DD and cannot be in the future."
    ),
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().required().length(24),
});
export const specificRecoveryEmailAccountsVal = Joi.object({
  recoveryEmail: Joi.string().email().trim().required(),
});

export const forgetPasswordVal = Joi.object({
  email: Joi.string().email().trim().required(),
});
export const resetPasswordVal = Joi.object({
  email: Joi.string().email().trim().required(),
  newPassword: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .message(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit."
    )
    .required(),
  otp: Joi.number().integer().min(10000).max(99999).required(),
});

export const updatePasswordVal = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .message(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit."
    ),
  newPassword: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .message(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit."
    ),
});
