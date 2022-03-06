const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//DATABASE
const connection = require("./controllers/database");

//ROUTES
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");

const app = express();

app.use(
	cors({
		origin: ["http://localhost:5500"],
		credentials: true,
	})
);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
connection();

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

//USER ENDPOINTS
app.use("/user", register);
app.use("/user", login);
app.use("/user", logout);

app.listen(process.env.PORT, () => {
	console.log(`Connect by port: ${process.env.PORT}`);
});
