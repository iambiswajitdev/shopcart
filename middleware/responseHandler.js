// responseHandler.js
export const responseHandler = (req, res, next) => {
  // Success response
  res.success = (message = "Success", statusCode = 200, data, token) => {
    const response = {
      success: true,
      status: "success",
      message,
    };

    if (data !== undefined) {
      response.data = data;
    }

    if (token) {
      response.token = token;
    }

    return res.status(statusCode).json(response);
  };

  // Failure response
  res.fail = (
    message = "Something went wrong",
    statusCode = 400,
    data,
    token
  ) => {
    const response = {
      success: false,
      status: "fail",
      message,
    };

    if (data !== undefined) {
      response.data = data;
    }

    if (token) {
      response.token = token;
    }
    console.log("statusCode", statusCode, response);

    return res.status(statusCode).json(response);
  };

  next();
};
