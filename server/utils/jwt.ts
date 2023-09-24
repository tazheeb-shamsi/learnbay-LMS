import { UserInterface } from "../models/user.model";
import { Response } from "express";
import { redis } from "./redis";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE;
const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE;
const ENVIRONMENT = process.env.NODE_ENV;

interface TokenInrterface {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// parse environment variables to integrate with fallback values
const accessTokenExpires = parseInt(ACCESS_TOKEN_EXPIRE || "300", 10);
const refreshTokenExpires = parseInt(REFRESH_TOKEN_EXPIRE || "1200", 10);
// options for cookies

export const accessTokenOptions: TokenInrterface = {
  expires: new Date(Date.now() + accessTokenExpires * 60 * 60 * 1000), //5min
  maxAge: accessTokenExpires * 60 * 60 * 1000, //5min
  httpOnly: true,
  sameSite: "lax",
};
export const refreshTokenOptions: TokenInrterface = {
  expires: new Date(Date.now() + refreshTokenExpires * 24 * 60 * 60 * 1000), //3days
  maxAge: refreshTokenExpires * 24 * 60 * 60 * 1000, //3days
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (
  user: UserInterface,
  statusCode: number,
  res: Response
) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  //upload session token to redis server
  redis.set(user._id, JSON.stringify(user) as any);

  // only set security to production
  if (ENVIRONMENT === "PRODUCTION") {
    accessTokenOptions.secure = true;
  }
  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
