import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// authorization : authenticated user
export const isAuthenticated = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource.", 400)
      );
    }
    const decoded = jwt.verify(
      access_token,
      ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("😒 Invalid access token.", 400));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    req.user = JSON.parse(user);
    next();
  }
);
