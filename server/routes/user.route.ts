import express from "express";
import {
  activateUser,
  changePassword,
  changeProfilePicture,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updateUserInfo,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRoute = express.Router();

userRoute.post("/signup", registerUser);
userRoute.post("/activate-user", activateUser);

userRoute.post("/login", loginUser);
userRoute.get("/logout", isAuthenticated, logoutUser);
userRoute.get("/refresh", updateAccessToken);

userRoute.post("/social-auth", socialAuth);

userRoute.get("/profile", isAuthenticated, getUserInfo);

userRoute.put("/update-user-profile", isAuthenticated, updateUserInfo);
userRoute.put("/change-user-password", isAuthenticated, changePassword);
userRoute.put("/change-user-avatar", isAuthenticated, changeProfilePicture);

userRoute.get(
  "/get-all-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

export default userRoute;
