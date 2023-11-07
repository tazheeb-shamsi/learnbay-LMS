import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/order.controller";
import { updateAccessToken } from "../controllers/user.controller";

const orderRoute = express.Router();

orderRoute.post(
  "/create-order",
  updateAccessToken,
  isAuthenticated,
  createOrder
);

orderRoute.get(
  "/get-all-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

export default orderRoute;
