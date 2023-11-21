import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";

import { rateLimit } from "express-rate-limit";

dotenv.config();
const Origin = process.env.ORIGIN;

export const app = express();

//body parser
app.use(express.json({ limit: "50mb" }));
//cookie parser
app.use(cookieParser());
//cors => cross origin resource sharing
app.use(
  cors({
    origin: Origin,
    credentials: true,
  })
);

//api request limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

//Routes
app.use(
  "/api/v1/",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
);

//handling unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Request ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

// middlewares
app.use(limiter);
app.use(ErrorMiddleware);
