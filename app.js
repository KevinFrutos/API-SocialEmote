const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//DATABASE
const connection = require("./src/shared/database/infrastructure/connection");

//ROUTES
const register = require("./src/user/infrastructure/routes/register");
const login = require("./src/user/infrastructure/routes/login");
const logout = require("./src/user/infrastructure/routes/logout");
const addFollow = require("./src/user/infrastructure/routes/addFollow");
const unFollow = require("./src/user/infrastructure/routes/unFollow");
// DEPRECATED const getFollows = require("./routes/getFollows");
const getUserData = require("./src/user/infrastructure/routes/getUserData");
const updateUserData = require("./src/user/infrastructure/routes/updateUserData");
const postPublication = require("./src/publication/infrastructure/routes/postPublication");
const deletePublication = require("./src/publication/infrastructure/routes/deletePublication");
const getPublications = require("./src/publication/infrastructure/routes/getPublications");
const addLike = require("./src/publication/infrastructure/routes/addLike");
const unLike = require("./src/publication/infrastructure/routes/unLike");
const addComment = require("./src/publication/infrastructure/routes/addComment");

//MIDDLEWARES
const verifyToken = require("./src/shared/infrastructure/middlewares/verifyToken");

const app = express();

const corsOptions = {
	origin: ["http://localhost", "http://localhost:5500", "http://localhost:3000", "https://socialemote.duckdns.org"],
	credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
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
