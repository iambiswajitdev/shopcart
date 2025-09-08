import AppError from "../utils/appError.js";

const errorHandler = (err, req, res, next) => {
  console.error("ERROR 💥", err);

  // Default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Handle Mongo duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue);
    err = new AppError(`Duplicate field value: ${field} already exists`, 400);
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    err = new AppError(`Validation error: ${messages.join(", ")}`, 400);
  }

  // ✅ use unified fail response
  return res.fail(err.message || "Something went wrong", err.statusCode);
};

export default errorHandler;
