import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import passportJwt from "passport-jwt";
import appConfig from "./config/config"
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
import { userModel } from "./models/userModel";

const app = express();
const port = appConfig.settings.port;
const url = appConfig.settings.db.url;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/", userRoute);
app.use("/posts", postRoute);

passport.use(
	new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: appConfig.settings.jwt.jwtSecret
	},
	async (jwtPayload, done) =>
	{
		try
		{
			const userDocument = await userModel.findById(jwtPayload.user)

			if (!userDocument) return done(new Error("Bad Credentials"), false)

			return done(null, userDocument)
		}
		catch (error)
		{
			return done(error, false)
		}
	})
)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));

db.once("open", () =>
{
	console.log("Connection Successful");
});

app.listen(port, () =>
{
	console.log(`Example app listening at http://localhost:${port}`)
});