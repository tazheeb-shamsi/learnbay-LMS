const express = require("express ");
import {
  activateUser,
  changePassword,
  changeProfilePicture,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRoute = express.Router();

userRoute.post("/signup", registerUser);
userRoute.post("/activate-user", activateUser);

userRoute.post("/login", loginUser);
userRoute.get("/logout", isAuthenticated, logoutUser);
userRoute.get("/refresh", updateAccessToken);

userRoute.post("/social-auth", socialAuth);

userRoute.get("/profile", updateAccessToken, isAuthenticated, getUserInfo);

userRoute.put(
  "/update-user-info",
  updateAccessToken,
  isAuthenticated,
  updateUserInfo
);
userRoute.put(
  "/change-user-password",
  updateAccessToken,
  isAuthenticated,
  changePassword
);
userRoute.put(
  "/change-user-avatar",
  updateAccessToken,
  isAuthenticated,
  changeProfilePicture
);

userRoute.get(
  "/get-all-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

userRoute.put(
  "/update-user-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
userRoute.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRoute;
