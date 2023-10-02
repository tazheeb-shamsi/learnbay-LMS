import express from "express";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const analyticsRoute = express.Router();

analyticsRoute.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUsersAnalytics
);

analyticsRoute.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getCoursesAnalytics
);

analyticsRoute.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);

export default analyticsRoute;
