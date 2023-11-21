const express = require("express ");
import {
  getAllNotifications,
  updateNotificationStatus,
} from "../controllers/notification.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";

const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllNotifications
);

notificationRoute.put(
  "/update-notification-status/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotificationStatus
);

export default notificationRoute;
