class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  console.log("Error caught:", err);
  
  if (res.headersSent) {
    return next(err);
  }
  if (typeof err === "string") {
    err = { message: err, statusCode: 400 }; // Convert string to an object
  }
  // res.status(err.statusCode || 500).json({
  //     success: false,
  //     message: err.message || "Internal Server Error"
  // });

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`,
      err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
      err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again!`;
    err = new ErrorHandler(message, 400);
  }
  // return res.status(err.statusCode).json({
  //   success: false,
  //   message: err.message,
  // });
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default ErrorHandler;
