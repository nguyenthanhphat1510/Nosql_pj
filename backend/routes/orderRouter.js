import express from 'express';
import { authMiddleware, createOrder, listOrder, listOrderByUser, OrderDetailByOrderId } from '../controllers/orderController.js';
const orderRouter = express.Router();
orderRouter.post("/create", createOrder);
orderRouter.get("/list", listOrder);
orderRouter.get("/myOrders", authMiddleware, listOrderByUser);
orderRouter.get("/orderDetail", OrderDetailByOrderId);
orderRouter.get("/:orderId", OrderDetailByOrderId);
export default orderRouter;
