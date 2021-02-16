import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
	username:   String,
	// email:  String,
	password: String,
	// date: { type: Date, default: Date.now }
});

export const userModel = mongoose.model("", userSchema, "web_example_collection");