import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse } from "../services/course.service";
import courseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/sendMail";

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

export const updateCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;
      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      const courseId = req.params.id;

      const course = await courseModel.findById(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const daleteCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Without purchasing: get single course

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

        await redis.set(courseId, JSON.stringify(course));
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
        (course: any) => course._id === courseId
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
      await course?.save();
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
      };
      // add this answer to course content
      question.questionReplies.push(newAnswer);
      await course?.save();

      //some validations have been performed
      if (req.user?._id === question.user._id) {
        //TODO:  create a notification
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };
        console.log(data, "name===title===>>");
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
        comment: review,
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

      const notification = {
        title: "New Review Recieved",
        message: `${req.user?.name} has added a review on ${course?.name}`,
      };

      //TODO:  create a notification

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
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } =
        req.body as AddReviewDataInterface;
      const course = await courseModel.findById(courseId);

      if (!course) {
        new ErrorHandler("Course not found.", 404);
      }

      const review = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );
      if (!review) {
        new ErrorHandler("Review not found.", 404);
      }

      const replyData: any = {
        user: req.user,
        comment,
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      review?.commentReplies.push(replyData);
      await course?.save();
      res.status(200).json({
        status: "true",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
