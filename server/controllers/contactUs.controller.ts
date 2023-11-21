import { catchAsyncError } from "../middleware/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
const ejs = require("ejs");
const path = require("path");
import sendEmail from "../utils/sendMail";

export const contactUs = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, phone, message } = req.body;
      const data: any = {
        name: name,
        email: email,
        phone: phone,
        message: message,
      };

      //sending confirmation email : for order purchased
      const emailData = {
        contactForm: {
          name: data?.name,
          email: data?.name,
          phone: data?.price,
          message: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mail/contactUsMail.ejs"),
        { order: emailData }
      );

      try {
        if (data) {
          await sendEmail({
            email: data.email,
            subject: `New Contact Mail Recieved from ${data.name}`,
            template: "contactUsMail.ejs",
            data: emailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
