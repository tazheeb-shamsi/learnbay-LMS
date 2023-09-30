import express from "express";
import {
  addAnswerToTheQuestion,
  addCourse,
  addQuestion,
  getAllCourse,
  getCourseContentByUser,
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

courseRoute.get(
  "/get-course-content/:id",
  isAuthenticated,
  getCourseContentByUser
);

courseRoute.put("/add-question", isAuthenticated, addQuestion);
courseRoute.put("/add-answer", isAuthenticated, addAnswerToTheQuestion);

export default courseRoute;
