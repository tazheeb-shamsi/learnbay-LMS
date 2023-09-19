import { UserInterface } from "../models/user.model";
import { Response } from "express";
import { redis } from "./redis";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE;
const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE;

interface TokenInrterface {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const sendToken = (
  user: UserInterface,
  statusCode: number,
  res: Response
) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  //upload session token
  redis.set(user._id, JSON.stringify(user) as any);

  // parse environment variables to integrate with fallback values
  const accessTokenExpires = parseInt(ACCESS_TOKEN_EXPIRE || "300", 10);
  const refreshTokenExpires = parseInt(REFRESH_TOKEN_EXPIRE || "1200", 10);
  // options for cookies

  const accessTokenOptions: TokenInrterface = {
    expires: new Date(Date.now() + accessTokenExpires * 1000),
    maxAge: accessTokenExpires * 1000,
    httpOnly: true,
    sameSite: "lax",
  };
  const refreshTokenOptions: TokenInrterface = {
    expires: new Date(Date.now() + refreshTokenExpires * 1000),
    maxAge: refreshTokenExpires * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  // only set security to production
  if (process.env.NODE_ENV === "production") {
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
