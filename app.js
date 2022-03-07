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

//MIDDLEWARES
const verifyToken = require("./middlewares/verifyToken");

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
	res.status(200).send("Estas conectado a la API de login!");
});

//USER ENDPOINTS
app.use("/user", register);
app.use("/user", login);
app.use("/user", verifyToken, logout);

app.listen(process.env.PORT, () => {
	console.log(`Connect using port: ${process.env.PORT}`);
});
