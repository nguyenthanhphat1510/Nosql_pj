import express from 'express';  
import { addCategory,getCategory } from '../controllers/categoryController.js';
const categoryRouter = express.Router();
categoryRouter.post("/add", addCategory);  
categoryRouter.get("/list", getCategory)
export default categoryRouter;