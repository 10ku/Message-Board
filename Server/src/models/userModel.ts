import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
	email: { type: String, trim: true, match: /[A-z0-9]+@[A-z0-9]+.[A-z0-9]+/, maxLength: 80, unique: true, required: true },
	username: { type: String, trim: true, maxLength: 80, unique: true, required: true },
	password: { type: String, match: /[^\s]/g, minLength: 8, maxLength: 255, required: true },
	date_of_creation: { type: Date, default: Date.now, required: true }
});

export const userModel = mongoose.model("", userSchema, "web_example_collection");