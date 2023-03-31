import { Response } from "express";

class ErrorHandler {
  public statusCode: number;

  public message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = async (
  err: { statusCode: number; message: string },
  res: Response
) => {
  const { statusCode, message } = err;
  return res.status(statusCode).json({ message });
};

export { ErrorHandler, handleError };
