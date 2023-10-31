import express from "express";
import {
  addAnswerToTheQuestion,
  addCourse,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  generateVideoUrl,
  getAllCourse,
  getAllCoursesByAdmin,
  getCourseContentByUser,
  getSingleCourse,
  updateCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";

const courseRoute = express.Router();

courseRoute.post(
  "/add-course",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  addCourse
);

courseRoute.put(
  "/update-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateCourse
);

courseRoute.get("/get-courses/", getAllCourse);

courseRoute.get("/get-course/:id", getSingleCourse);

courseRoute.get(
  "/get-course-content/:id",
  updateAccessToken,
  isAuthenticated,
  getCourseContentByUser
);
//add question & answer
courseRoute.put(
  "/add-question",
  updateAccessToken,
  isAuthenticated,
  addQuestion
);
courseRoute.put(
  "/add-answer",
  updateAccessToken,
  isAuthenticated,
  addAnswerToTheQuestion
);

//add review to the course
courseRoute.put(
  "/add-review/:id",
  updateAccessToken,
  isAuthenticated,
  addReview
);
//add reviewReply to the course
courseRoute.put(
  "/add-review-reply",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

courseRoute.get(
  "/get-all-courses",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesByAdmin
);

courseRoute.post("/getVdoCipherOTP", generateVideoUrl);

courseRoute.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRoute;
