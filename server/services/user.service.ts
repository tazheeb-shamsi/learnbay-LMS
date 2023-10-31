import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";

export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(200).json({
      success: true,
      user,
    });
  }
};

//only for admin users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

export const updateUserRoleService = async (
  res: Response,
  // id: string,
  email: string,
  role: string
) => {
  const user = await userModel.findOneAndUpdate(
    { email },
    { role },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(201).json({
    success: true,
    user,
  });
};
