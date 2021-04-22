import { Document } from "mongoose";
import { postModel } from "../models/postModel";

export interface postInterface extends Document
{
	title: string
	poster: string
	date_of_post: Date
	text: string
	likes: number
	voters: string[]
}

export default class PostController
{
	static async getPosts(req: any, res: any)
	{
		try
		{
			const postDocument = await postModel.find({}).sort({date_of_post:-1});

			if (!postDocument) throw new Error("No Posts!")

			res.status(200).json(
			{
				postDocument
			})
		}
		catch (error)
		{
			res.status(500).json({message: error.message})
		}
	}

	static async makePost(req: any, res: any)
	{
		const newPost = new postModel(req.body)

		try
		{
			const postDocument = await newPost.save()

			if (!postDocument) throw new Error("Bad Save!")

			res.status(200).json(
			{
				postDocument
			})
		}
		catch (error)
		{
			res.status(500).json({message: error.message})
		}	
	}

	static async changeLike(req: any, res: any)
	{
		const {_id, voteChoice, voter} = req.body

		try
		{
			const postCheckDocument = await postModel.findById(_id) as postInterface

			if (!postCheckDocument) throw new Error("No Posts!")
			if (postCheckDocument.voters.find(element => element === voter)) throw new Error("You Already Voted")

			const postDocument = await postModel.findByIdAndUpdate({_id: _id}, {$inc: {likes: voteChoice}, $addToSet: {voters: voter}}, {new: true})

			if (!postDocument) throw new Error("No Posts!")

			res.status(200).json(
			{
				postDocument
			})
		}
		catch (error)
		{
			res.status(500).json({message: error.message})
		}	
	}
}