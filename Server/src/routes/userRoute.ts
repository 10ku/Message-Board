import { Router } from "express";
import { userModel } from "../models/userModel";
import mongoose from "mongoose";

const userRoute = Router();

/* userRoute.get("/login", async (req, res) => {
	try
	{
		const users = await userModel.find()
		if (!users) throw new Error("No Users!")
		const sorted = users.sort()
		res.status(200).json(sorted)	
	}
	catch (error)
	{
		res.status(500).json({message: error.message})
	}	
}); */

userRoute.post("/register", async (req, res) => {
	const newUser = new userModel(req.body)
	try
	{
		const userDocument = await newUser.save()
		if (!userDocument) throw new Error("Bad Save!")
		res.status(200).json(userDocument)	
	}
	catch (error)
	{
		res.status(500).json({message: error.message})
	}	
});

userRoute.post("/login", async (req, res) => {
	const {email, password} = req.body
	try
	{
		const userDocument = await userModel.findOne({
			email: email,
		})
		if (!userDocument) throw new Error("Bad Credentials")
		//@ts-ignore
		const result = await userDocument.validatePassword(password)
		if (!result) throw new Error("Bad Credentials")
	}
	catch (error)
	{
		res.status(500).json({message: error.message})
	}	
});

export default userRoute;