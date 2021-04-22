import appConfig from "../config/config"
import mongoose, { Document } from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
{
	title: { type: String, trim: true, maxLength: 400, required: true },
	poster: { type: String, trim: true, maxLength: 80, unique: true, required: true },
	date_of_post: { type: Date, default: Date.now, required: true },
	text: { type: String, trim: true, required: true },
	likes: { type: Number, default: 0, required: true },
	voters: { type: [String] }
});

export const postModel = mongoose.model(appConfig.settings.db.postCollection, postSchema, appConfig.settings.db.postCollection);