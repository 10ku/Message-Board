import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
	email: { type: String, trim: true, match: /[A-z0-9]+@[A-z0-9]+.[A-z0-9]+/, maxLength: 80, unique: true, required: true },
	username: { type: String, trim: true, maxLength: 80, unique: true, required: true },
	password: { type: String, match: /[^\s]/g, minLength: 8, maxLength: 255, required: true },
	date_of_creation: { type: Date, default: Date.now, required: true }
});

userSchema.pre("save", async function save(next)
{
	if (!this.isModified("password")) return next();

	try
	{
	  const salt = await bcryptjs.genSalt(8);
	  //@ts-ignore
	  this.password = await bcryptjs.hash(this.password, salt);
	  return next();
	}
	catch (err)
	{
	  return next(err);
	}
});

export const userModel = mongoose.model("", userSchema, "web_example_collection");