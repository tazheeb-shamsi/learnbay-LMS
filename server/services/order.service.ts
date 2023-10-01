import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import orderModel from "../models/order.model";

export const newOrder = catchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await orderModel.create(data);
    res.status(201).json({
      success: true,
      order,
    });
  }
);

// only for admin users
export const getAllOrderService = async (res: Response) => {
  const orders = await orderModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    orders,
  });
};
