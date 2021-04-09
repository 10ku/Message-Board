import { Router } from "express";
import postController from "../controllers/postController";

const postRoute = Router();

postRoute.get("/", postController.getPosts)
postRoute.post("/", postController.makePost)

export default postRoute;