import express from "express";
import {
  addAnswerToTheQuestion,
  addCourse,
  addQuestion,
  addReplyToReview,
  addReview,
  getAllCourse,
  getAllCourses,
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
//add question & answer
courseRoute.put("/add-question", isAuthenticated, addQuestion);
courseRoute.put("/add-answer", isAuthenticated, addAnswerToTheQuestion);

//add review to the course
courseRoute.put("/add-review/:id", isAuthenticated, addReview);
//add reviewReply to the course
courseRoute.put(
  "/add-review-reply",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

courseRoute.get(
  "/get-all-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCourses
);

export default courseRoute;
