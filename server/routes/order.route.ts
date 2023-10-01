import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/order.controller";

const orderRoute = express.Router();

orderRoute.post("/create-order", isAuthenticated, createOrder);

orderRoute.get(
  "/get-all-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

export default orderRoute;
