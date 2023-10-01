import express from "express";
import {
  getAllNotifications,
  updateNotificationStatus,
} from "../controllers/notification.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllNotifications
);

notificationRoute.put(
  "/update-notification-status/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotificationStatus
);

export default notificationRoute;
