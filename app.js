const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//DATABASE
const connection = require("./controllers/database");

//ROUTES
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");

const app = express();

connection();

app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.use("/user", register);
app.use("/user", login);
app.use("/user", logout);

app.listen(process.env.PORT, () => {
	console.log(`Connect by port: ${process.env.PORT}`);
});
