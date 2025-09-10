export const responseHandler = (req, res, next) => {
  res.success = (
    data = {},
    message = "Success",
    statusCode = 200,
    token = ""
  ) => {
    const response = {
      success: true,
      status: "success",
      message,
      data,
    };
    if (token) {
      response.token = token;
    }
    return res.status(statusCode).json(response);
  };

  res.fail = (message = "Something went wrong", statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      status: "fail",
      message,
    });
  };

  next();
};
