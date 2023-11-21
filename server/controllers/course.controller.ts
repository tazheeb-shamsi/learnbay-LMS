import "../../server/@types/custom";
const cloudinary = require("cloudinary");
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Request, Response } from "express";
import { createCourse, getAllCoursesService } from "../services/course.service";
import courseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
const ejs = require("ejs");
const path = require("path");
import sendEmail from "../utils/sendMail";
import notificationModel from "../models/notification.model";
import axios from "axios";

// Create course   -- only for admin
export const addCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// update course   -- only for admin
export const updateCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const courseId = req.params.id;

      const courseData = (await courseModel.findById(courseId)) as any;

      if (
        thumbnail &&
        typeof thumbnail === "string" &&
        !thumbnail.startsWith("https")
      ) {
        await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (typeof thumbnail === "string" && thumbnail.startsWith("https")) {
        data.thumbnail = {
          public_id: courseData?.thumbnail.public_id,
          url: courseData?.thumbnail.url,
        };
      }

      // Update the document directly without using $set
      Object.assign(courseData, data);
      await courseData.save();

      res.status(200).json({
        status: "success",
        course: courseData,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete course   -- only for admin
export const deleteCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await courseModel.findById(id);

      if (!course) {
        return next(new ErrorHandler("course not found", 404));
      }

      await course.deleteOne({ id });

      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get all course   -- only for admin
export const getAllCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("allCourses");
      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel
          .find()
          .select(
            "-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links"
          );

        await redis.set("allCourses", JSON.stringify(course));
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Without purchasing: get single course
export const getSingleCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExist = await redis.get(courseId);

      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel
          .findById(req.params.id)
          .select(
            "-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links"
          );

        await redis.set(courseId, JSON.stringify(course), "EX", 259200); //Expires in 3 days
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get course content -- only for valid user
export const getCourseContentByUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;
      const isCourseExist = userCourseList?.find(
        (course: any) => course._id.toString() === courseId.toString()
      );
      if (!isCourseExist) {
        return next(
          new ErrorHandler("You're not eligible to access this course", 404)
        );
      } else {
        const course = await courseModel.findById(courseId);
        const content = course?.courseData;

        res.status(200).json({
          status: "true",
          content,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add question to the course
interface addQuestionInterface {
  question: string;
  courseId: string;
  contentId: string;
}
export const addQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: addQuestionInterface = req.body;
      const course = await courseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("nvalid content id", 400));
      }

      //create a new question object
      const newQuestion: any = {
        user: req.user,
        avatar: req.user?.avatar,
        question,
        questionReplies: [],
      };

      //add the new question to the course content
      courseContent.questions.push(newQuestion);

      //sending notification to Instructor...
      await notificationModel.create({
        user: req.user?._id,
        title: "New Question Recieved",
        message: `You have a new question in ${courseContent?.title} !`,
      });

      await course?.save();
      await redis.set(courseId, JSON.stringify(course), "EX", 259200); // 3days
      res.status(200).json({
        status: "true",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// adding answering the question
interface answerToTheQuestionInterface {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}
export const addAnswerToTheQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        questionId,
        answer,
        courseId,
        contentId,
      }: answerToTheQuestionInterface = req.body;
      const course = await courseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }
      // adding answer to the question
      const newAnswer: any = {
        user: req.user,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // add this answer to course content
      question.questionReplies.push(newAnswer);
      await course?.save();
      await redis.set(courseId, JSON.stringify(course), "EX", 259200); // 3days

      //some validations have been performed
      if (req.user?._id === question.user._id) {
        //sending notification to Instructor...
        await notificationModel.create({
          user: req.user?._id,
          title: "New Answer Recieved",
          message: `You question in course:${courseContent?.title}, got a new response!`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };
        const html = await ejs.renderFile(
          path.join(__dirname, "../mail/question-reply.ejs"),
          data
        );

        try {
          await sendEmail({
            email: question.user.email,
            subject: "A new response to your question",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      res.status(200).json({
        status: "true",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// adding review to the course
interface reviewInterface {
  review: string;
  courseId: string;
  rating: number;
  userId: string;
}
export const addReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const isCourseExist = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );

      if (!isCourseExist) {
        return next(
          new ErrorHandler("Purchase this course to add review.", 404)
        );
      }
      const course = await courseModel.findById(courseId);
      const { review, rating } = req.body as reviewInterface;

      const reviewData: any = {
        user: req.user,
        review: review,
        rating: rating,
      };

      course?.reviews.push(reviewData);

      let average = 0;
      course?.reviews.forEach((rev: any) => {
        average += rev.rating;
      });

      if (course) {
        course.ratings = average / course.reviews.length;
        // eg. if we have two revies 4&5  ==> (4+5)/2 = 4.5 rating
      }

      await course?.save();
      await redis.set(courseId, JSON.stringify(course), "EX", 259200); // 3days

      //sending notification to Instructor...
      await notificationModel.create({
        user: req.user?._id,
        title: "New Review Recieved",
        message: `${req.user?.name} has added a review on ${course?.name}`,
      });

      res.status(200).json({
        status: "true",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add reply to review
interface AddReviewDataInterface {
  reviewReply: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reviewReply, courseId, reviewId } =
        req.body as AddReviewDataInterface;
      const course = await courseModel.findById(courseId);

      if (!course) {
        new ErrorHandler("Course not found.", 404);
      }

      const getReview: any = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );

      if (!getReview) {
        new ErrorHandler("Review not found.", 404);
      }

      const replyData: any = {
        user: req.user,
        reviewReply,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!getReview.reviewReplies) {
        getReview.reviewReplies = [];
      }

      getReview?.reviewReplies.push(replyData);

      await course?.save();
      await redis.set(courseId, JSON.stringify(course), "EX", 259200); // 3days

      res.status(200).json({
        status: "true",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all courses --only for admin
export const getAllCoursesByAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const generateVideoUrl = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;
      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_SECRET_KEY}`,
          },
        }
      );
      res.json(response.data);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
