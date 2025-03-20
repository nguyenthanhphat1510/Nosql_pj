import express from 'express';  
import { addSubCategory,getSubCategory } from '../controllers/subCategoryController.js';
const subCategoryRouter = express.Router();
subCategoryRouter.post("/add", addSubCategory);    
subCategoryRouter.get("/list/:categoryId", getSubCategory);

export default subCategoryRouter;