import { postModel } from "../models/postModel";

export default class PostController
{
	static async getPosts(req: any, res: any)
	{
		try
		{
			const postDocument = await postModel.find({});

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
}