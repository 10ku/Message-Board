import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();
const port = 3000;
const url = "mongodb://localhost:27017/web_example_db";

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/login", userRoute);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", function() {
	console.log("Connection Successful");
});

app.listen(port, () =>
{
	console.log(`Example app listening at http://localhost:${port}`)
});