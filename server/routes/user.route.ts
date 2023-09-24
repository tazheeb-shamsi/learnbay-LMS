import express from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  updateAccessToken,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);

userRouter.get("/profile", isAuthenticated, getUserInfo);

export default userRouter;
