import mongoose, { Document, Model, Schema } from "mongoose";

export interface OrderInterface extends Document {
  courseId: string;
  userId: string;
  payment_info: object;
}

const orderSchema = new Schema<OrderInterface>(
  {
    courseId: {
      type: "string",
      required: true,
    },
    userId: { type: "string", required: true },
    payment_info: { type: "object", required: false },
  },
  { timestamps: true }
);

const orderModel: Model<OrderInterface> = mongoose.model("Order", orderSchema);
export default orderModel;
