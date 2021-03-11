import appConfig from "../config/config"
import { Router } from "express";
import { userModel } from "../models/userModel";
import jwt from "jsonwebtoken";

const userRoute = Router();

function jwtSignUser(user: object)
{
	return jwt.sign({user}, appConfig.settings.jwt.jwtSecret,
	{
		expiresIn: appConfig.settings.jwt.jwtExpiration
	})
}

userRoute.post("/register", async (req, res) =>
{
	const newUser = new userModel(req.body)

	try
	{
		const userDocument = await newUser.save()

		if (!userDocument) throw new Error("Bad Save!")

		res.status(200).json(
		{
			userDocument,
			token: jwtSignUser(userDocument)
		})
	}
	catch (error)
	{
		res.status(500).json({message: error.message})
	}	
});

userRoute.post("/login", async (req, res) =>
{
	const {email, password} = req.body

	try
	{
		const userDocument = await userModel.findOne(
		{
			email: email,
		})

		if (!userDocument) throw new Error("Bad Credentials")

		const result = await userDocument.validatePassword(password)

		if (!result) throw new Error("Bad Credentials")

		res.status(200).json(
		{
			userDocument,
			token: jwtSignUser(userDocument)
		})
	}
	catch (error)
	{
		res.status(500).json({message: error.message})
	}	
});

export default userRoute;