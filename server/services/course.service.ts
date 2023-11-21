import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import courseModel from "../models/course.model";

export const createCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data);
    res.status(201).json({
      status: "success",
      course,
    });
  }
);

//only for admin users
export const getAllCoursesService = async (res: Response) => {
  const courses = await courseModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    courses,
  });
};
