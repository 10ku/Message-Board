import appConfig from "../config/config"
import { userModel } from "../models/userModel";
import jwt from "jsonwebtoken";

export default class UserController
{
	private static jwtSignUser(user: object)
	{
		return jwt.sign({user}, appConfig.settings.jwt.jwtSecret,
		{
			expiresIn: appConfig.settings.jwt.jwtExpiration
		})
	}

	static async register(req: any, res: any)
	{
		const newUser = new userModel(req.body)

		try
		{
			const userDocument = await newUser.save()

			if (!userDocument) throw new Error("Error Registering")

			res.status(200).json(
			{
				userDocument,
				token: UserController.jwtSignUser(userDocument)
			})
		}
		catch (error)
		{
			res.status(500).json({message: error.message})
		}	
	}

	static async login(req: any, res: any)
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
				token: UserController.jwtSignUser(userDocument)
			})
		}
		catch (error)
		{
			res.status(500).json({message: error.message})
		}	
	}

	static async updateAvatar(req: any, res: any)
	{
		const {username, avatar} = req.body

		try
		{
			const userDocument = await userModel.findOneAndUpdate({username: username}, {avatar: avatar}, {new: true})

			if (!userDocument) throw new Error("Error Updating Avatar")

			res.status(200).json(
			{
				userDocument
			})
		}
		catch (error)
		{
			res.status(500).json({message: error.message})
		}	
	}
}