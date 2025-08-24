export const globalErrorHandler = (err, req, res, next) => {
  if ((process.env.mode = "prod")) {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({ err: err.message, stack: err.stack });
  } else {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({ err: err.message });
  }
};
