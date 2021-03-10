import appConfig from "../config/config"
import mongoose, { Document } from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema } = mongoose;

export interface userSchemaInterface extends Document
{
	email: string;
	username: string;
	password: string;
	date_of_creation: Date;
	validatePassword(password: string) : boolean;
}

const userSchema = new Schema(
{
	email: { type: String, trim: true, match: /[A-z0-9]+@[A-z0-9]+.[A-z0-9]+/, maxLength: 80, unique: true, required: true },
	username: { type: String, trim: true, maxLength: 80, unique: true, required: true },
	password: { type: String, match: /[^\s]/g, minLength: 8, maxLength: 255, required: true },
	date_of_creation: { type: Date, default: Date.now, required: true }
});

userSchema.pre("save", async function save(next)
{
	const thisUserSchema = this as userSchemaInterface;
	if (!thisUserSchema.isModified("password")) return next();

	try
	{
	  const salt = await bcryptjs.genSalt(8);
	  thisUserSchema.password = await bcryptjs.hash(thisUserSchema.password, salt);
	  return next();
	}
	catch (err)
	{
	  return next(err);
	}
});

userSchema.methods.validatePassword = async function validate(password: string)
{
	const thisUserSchema = this as userSchemaInterface;
	return await bcryptjs.compare(password, thisUserSchema.password);
}

export const userModel = mongoose.model<userSchemaInterface>("", userSchema, appConfig.settings.db.collection);