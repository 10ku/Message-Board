import { Router } from "express";
import userController from "../controllers/userController";

const userRoute = Router();

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);

export default userRoute;