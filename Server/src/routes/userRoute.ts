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
		// console.log(Object.keys(error.errors))
		res.status(500).json({message: error.message})
	}	
});

userRoute.post("/login", async (req, res) => {
	const {email, password} = req.body
	const user = new userModel(req.body)
	try
	{
		const userDocument = await userModel.findOne({
			email: email,
			password: password
		})
		if (!userDocument) throw new Error("No User")
		// const isPasswordValid = password === userDocument.password
		// if (!isPasswordValid) throw new Error("Bad Pass")
		res.status(200).json(userDocument)
	}
	catch (error)
	{
		res.status(500).json({message: error.message})
	}	
});

export default userRoute;