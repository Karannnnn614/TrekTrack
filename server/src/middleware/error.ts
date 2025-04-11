import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.message,
    });
  }

  // Handle database errors
  if (err.name === "SequelizeError" || err.name === "SequelizeDatabaseError") {
    return res.status(500).json({
      success: false,
      message: "Database Error",
      errors:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal Server Error",
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
