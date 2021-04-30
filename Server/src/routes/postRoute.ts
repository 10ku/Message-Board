import { Router } from "express";
import postController from "../controllers/postController";
import Authentication from "../services/Authentication";

const postRoute = Router();

postRoute.get("/", postController.getPosts)
postRoute.post("/", Authentication.authorize, postController.makePost)
postRoute.put("/", Authentication.authorize, postController.changeLike)

export default postRoute;