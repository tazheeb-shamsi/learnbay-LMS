import express from "express";
import { updateAccessToken } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const contactRoute = express.Router();

contactRoute.post(
  "/contact",
  updateAccessToken,
  isAuthenticated,
  contactUs
);

export default contactRoute;
