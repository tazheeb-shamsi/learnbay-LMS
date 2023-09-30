import express from "express";
import {
  addCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const courseRoute = express.Router();

courseRoute.post(
  "/add-course",
  isAuthenticated,
  authorizeRoles("admin"),
  addCourse
);

courseRoute.put(
  "/update-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateCourse
);

courseRoute.get("/get-courses/", getAllCourse);

courseRoute.get("/get-course/:id", getSingleCourse);

export default courseRoute;
