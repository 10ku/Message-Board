import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import appConfig from "./config/config"
import userRoute from "./routes/userRoute";

const app = express();
const port = appConfig.settings.port;
const url = appConfig.settings.db.url;

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/", userRoute);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
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