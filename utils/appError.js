class AppError extends Error {
  constructor(message, statusCode) {
    console.log("statusCode", statusCode);

    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // To identify known vs unknown errors

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
