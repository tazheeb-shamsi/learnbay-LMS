import express from "express";
import {
  activateUser,
  changePassword,
  changeProfilePicture,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updateUserInfo,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);

userRouter.post("/social-auth", socialAuth);

userRouter.get("/profile", isAuthenticated, getUserInfo);
userRouter.put("/update-user-profile", isAuthenticated, updateUserInfo);
userRouter.put("/change-user-password", isAuthenticated, changePassword);
userRouter.put("/change-user-avatar", isAuthenticated, changeProfilePicture);

export default userRouter;
