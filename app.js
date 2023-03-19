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
const addFollow = require("./routes/addFollow");
const unFollow = require("./routes/unFollow");
// DEPRECATED const getFollows = require("./routes/getFollows");
const getUserData = require("./routes/getUserData");
const updateUserData = require("./routes/updateUserData");
const postPublication = require("./routes/postPublication");
const deletePublication = require("./routes/deletePublication");
const getPublications = require("./routes/getPublications");
const addLike = require("./routes/addLike");
const unLike = require("./routes/unLike");
const addComment = require("./routes/addComment");

//MIDDLEWARES
const verifyToken = require("./middlewares/verifyToken");

const app = express();

app.use(
	cors({
		origin: ["http://localhost:5500", "http://localhost:3000", "http://socialemote.duckdns.org"],
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
app.use("/user", getPublications);

//PROTECTED USER ENDPOINTS
app.use("/user", verifyToken, logout);
app.use("/user", verifyToken, addFollow);
app.use("/user", verifyToken, unFollow);
// DEPRECATED app.use("/user", verifyToken, getFollows);
app.use("/user", verifyToken, getUserData);
app.use("/user", verifyToken, updateUserData);
app.use("/user", verifyToken, postPublication);
app.use("/user", verifyToken, deletePublication);
app.use("/user", verifyToken, addLike);
app.use("/user", verifyToken, unLike);
app.use("/user", verifyToken, addComment);

// SERVER LISTENING
app.listen(process.env.PORT, () => {
	console.log(`Connect using port: ${process.env.PORT}`);
});
