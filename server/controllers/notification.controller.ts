import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import notificationModel from "../models/notification.model";
import cron from "node-cron";

// get all notifications -- only for instructor(admin)
export const getAllNotifications = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationModel.find().sort({ created: -1 });
      res.status(200).json({
        success: true,
        notification,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update  notification status -- only for instructor(admin)
export const updateNotificationStatus = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationModel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler("notification not found", 404));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification.status;
      }
      notification.status = "read";
      await notification.save();

      const notifications = await notificationModel
        .find()
        .sort({ created: -1 });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//delete read notifications older tha 7days  -- only for instructor(admin)
cron.schedule("0 0 0 * * *", async () => {
  const SevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  await notificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: SevenDaysAgo },
  });
  console.log("Deleted 7days ago, all read notifications ");
});

// export const deleteReadNotifications = catchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {}
// );
