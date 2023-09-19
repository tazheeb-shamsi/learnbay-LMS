import { UserInterface } from "./../models/user.model";
import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/user.model";
import JWT, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/sendMail";
import { sendToken } from "../utils/jwt";

dotenv.config();
const ActivationSecret = process.env.ACTIVATION_SECRET;

interface RegistrationInterface {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const isEmailExist = await userModel.findOne({ email });

      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      const user: RegistrationInterface = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;
      const data = { user: { name: user.name }, activationCode };

      const htmlEmailBody = await ejs.renderFile(
        path.join(__dirname, "../mail/activationMail.ejs"),
        data
      );
      try {
        await sendEmail({
          email: user.email,
          subject: "Verify your account activation",
          template: "activationMail.ejs",
          data,
        });
        res.status(201).json({
          success: true,
          message: `OTP send to your ${user.email}, Please verify your account.`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface ActivationTokenInterface {
  token: string;
  activationCode: string;
}
export const createActivationToken = (
  user: RegistrationInterface
): ActivationTokenInterface => {
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const token = JWT.sign(
    {
      user,
      activationCode,
    },
    ActivationSecret as Secret,
    {
      expiresIn: "3m",
    }
  );
  return { token, activationCode };
};

interface ActivateUserInterface {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as ActivateUserInterface;

      const newUser: { user: UserInterface; activationCode: string } =
        JWT.verify(activation_token, ActivationSecret as string) as {
          user: UserInterface;
          activationCode: string;
        };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid OTP code", 400));
      }

      const { name, email, password } = newUser.user;
      const isUserExist = await userModel.findOne({ email });

      if (isUserExist) {
        return next(new ErrorHandler("User already exist ", 400));
      }
      const user = await userModel.create({ name, email, password });
      res.status(200).json({
        success: true,
        message: "OTP verification successful",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Login user
interface UserLoginInterface {
  email: string;
  password: string;
}

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as UserLoginInterface;
      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid password", 400));
      }
      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      res.status(200).json({
        success: true,
        message: "🙋‍♂️ Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
