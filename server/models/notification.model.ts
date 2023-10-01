import mongoose, { Document, Model, Schema } from "mongoose";

export interface NotificationInterface extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}

const notificationSchema = new Schema<NotificationInterface>(
  {
    title: {
      type: "string",
      required: true,
    },
    message: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
      default: "unread",
    },
  },
  { timestamps: true }
);

const notificationModel: Model<NotificationInterface> = mongoose.model(
  "Notification",
  notificationSchema
);
export default notificationModel;
