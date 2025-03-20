import express from 'express';  
import { createOrder,listOrder} from '../controllers/orderController.js';
const orderRouter = express.Router();
orderRouter.post("/create", createOrder);  
orderRouter.get("/list", listOrder); 
export default orderRouter;
