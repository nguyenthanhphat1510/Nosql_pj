import express from 'express';
import { registerUser, loginUser, userList } from '../controllers/userController.js';


const userRouter = express.Router();
// Khoa code test API
userRouter.get("/list", userList);

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

export default userRouter;