const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userAuthentication = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
//const testRoutes = require("./routes/testPlanRoutes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userAuthentication);
//app.use("/api/plan", testRoutes)
app.use("/api/workout", workoutRoutes);

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: false,
	})
	.then(() => {
		console.log("Connected to database");

		app.listen(process.env.PORT, () => {
			//console.log("Listening on port", process.env.PORT)
		});
	})
	.catch((e) => {
		console.log(e);
	});
