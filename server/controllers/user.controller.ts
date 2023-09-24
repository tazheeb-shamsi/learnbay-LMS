import { accessTokenOptions, refreshTokenOptions } from "./../utils/jwt";
import { UserInterface } from "./../models/user.model";
import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/user.model";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/sendMail";
import { sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getUserById } from "../services/user.service";
import cloudinary from "cloudinary";

dotenv.config();
const ACTIVATION_SECRET = process.env.ACTIVATION_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

//Register user
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

      const html = await ejs.renderFile(
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

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
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
        jwt.verify(activation_token, ACTIVATION_SECRET as string) as {
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
        user,
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

      const userId = req.user?._id || "";
      redis.del(userId);

      res.status(200).json({
        success: true,
        message: "🙋‍♂️ Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update access token
export const updateAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = jwt.verify(
        refresh_token,
        REFRESH_TOKEN as string
      ) as JwtPayload;
      const message = "Unable to refresh token";

      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }

      const session = await redis.get(decoded.id as string);
      if (!session) {
        return next(new ErrorHandler(message, 400));
      }

      const user = JSON.parse(session);
      const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN as string, {
        expiresIn: "5m",
      });

      const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN as string, {
        expiresIn: "3d",
      });

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      res.status(200).json({
        status: "success",
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface SocialAuthInterface {
  name: string;
  email: string;
  avatar: string;
}

export const socialAuth = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as SocialAuthInterface;
      const user = await userModel.findOne({ email });

      if (!user) {
        const newUser = await userModel.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {}
  }
);

interface UpdateUserInterface {
  name?: string;
  email?: string;
}
export const updateUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body as UpdateUserInterface;
      const userId = req.user?._id;

      const user = await userModel.findById(userId);
      if (email && user) {
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
          return next(new ErrorHandler("Email already exists", 400));
        }
        user.email = email;
      }
      if (name && user) {
        user.name = name;
      }

      await user?.save();
      await redis.set(userId, JSON.stringify(user));
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {}
  }
);

interface ChangePasswordInterface {
  oldPassword: string;
  newPassword: string;
}
export const changePassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as ChangePasswordInterface;
      const user = await userModel.findById(req.user?._id).select("+password");

      if (!oldPassword || !newPassword) {
        return next(
          new ErrorHandler(
            "please enter your old and new password correctly",
            400
          )
        );
      }

      if (user?.password === undefined) {
        return next(new ErrorHandler("Invalid user", 400));
      }
      const isPasswordMatch = await user?.comparePassword(oldPassword);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Old password", 400));
      }
      user.password = newPassword;
      await user.save();
      await redis.set(req.user?._id, JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface ChangeProfilePictureInterface {
  avatar: string;
}
// change profile picture
export const changeProfilePicture = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as ChangeProfilePictureInterface;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (avatar && user) {
        // if already have an avatar
        if (user?.avatar?.public_id) {
          //first delete the avatar
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
          // then change the avatar
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "Learnbay-user-avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "Learnbay-user-avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user?.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {}
  }
);
