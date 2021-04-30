import { Router } from "express";
import userController from "../controllers/userController";
import Authentication from "../services/Authentication";

const userRoute = Router();

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);
userRoute.put("/update/avatar", Authentication.authorize, userController.updateAvatar);

export default userRoute;