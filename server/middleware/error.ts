import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || '❌ Internal Server Error'

  // handling wrong mongodb id
  if (err.name === 'CastError') {
    const message = `❌ Resource not found. Invalid ${err.path}`
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err.name === 11000) {
    const message = `❌ Duplicate  key : ${Object.keys(err.keyValue)}`
    err = new ErrorHandler(message, 400);
  }

  // wrong token error
  if (err.name === 'JsonwebTokenError') {
    const message = `❌ Invalid JSON Web Token, please try again`
    err = new ErrorHandler(message, 400);
  }

  // Expired token error
  if (err.name === 'TokenExpiredError') {
    const message = `❌ JSON Web Token expired, please try again`
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  })
}