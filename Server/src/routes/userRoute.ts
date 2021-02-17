import { Router } from "express";
import { userModel } from "../models/userModel";

const userRoute = Router();

userRoute.get("/", async (req, res) => {
	try {
		const users = await userModel.find()
		if (!users) throw new Error("No Users!")
		const sorted = users.sort()
		res.status(200).json(sorted)	
	} catch (error) {
		res.status(500).json({message: error.message})
	}	
});

userRoute.post("/", async (req, res) => {
	const newUser = new userModel(req.body)
	try {
		const userDocument = await newUser.save()
		if (!userDocument) throw new Error("Bad Save!")
		res.status(200).json(userDocument)	
	} catch (error) {
		res.status(500).json({message: error.message})
	}	
});

export default userRoute;