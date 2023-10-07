import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";

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
  })
);

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

app.use(ErrorMiddleware);
