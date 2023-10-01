import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { OrderInterface } from "../models/order.model";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import { getAllOrderService, newOrder } from "../services/order.service";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/sendMail";
import notificationModel from "../models/notification.model";

export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as OrderInterface;
      const user = await userModel.findById(req.user?._id);
      const isCourseAlreadyPurchased = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (isCourseAlreadyPurchased) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course = await courseModel.findById(courseId);

      if (!course) {
        new ErrorHandler("Course not found", 404);
      }

      const data: any = {
        courseId: course?._id,
        userId: user?._id,
        payment_info,
      };

      //sending confirmation email : for order purchased
      const emailData = {
        order: {
          _id: course?._id.toString().slice(0, 6),
          name: user?.name,
          course: course?.name,
          price: course?.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      try {
        if (user) {
          await sendEmail({
            email: user.email,
            subject: "Order confirmation Mail",
            template: "orderConfirmationMail.ejs",
            data: emailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(course?._id);
      await user?.save();

      //sending notification to Instructor...
      await notificationModel.create({
        user: user?._id,
        title: "New Order Placed",
        message: `${user?.name} have placed order now!`,
      });

      if (course) {
        course.purchased = (course.purchased || 0) + 1;
        await course.save();
      }

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all orders --only admin
export const getAllOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrderService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
