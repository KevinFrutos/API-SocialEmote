const express = require("express");
const bodyparser = require("body-parser");
const { WebSocketServer } = require("ws");
const server = require("http").createServer();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//DATABASE
const connection = require("./controllers/database");
const Publication = require("./models/schema_publication");
const Session = require("./models/schema_sessions");

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
		origin: ["http://localhost:5500", "http://localhost:3000", "https://socialemote-front.web.app"],
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

// WEBSOCKET SERVER IMPLEMENTATION
const wsServer = new WebSocketServer({ server: server });

// POR CADA REQUEST DE UN CLIENTE, SE CREA UN NUEVO WEBSOCKET
server.on("request", app);

// OBJETO QUE GUARDA LOS CLIENTES CONECTADOS
const users = {};

wsServer.on("connection", (client, req) => {
	const user = req.headers.cookie?.split(" ").filter(user => user.includes("user="))[0]?.split("=")[1].split(";")[0];
	users[user] = client;
	Publication.watch([], { fullDocument: "updateLookup" }).on("change", async () => {
		const cursor = await Publication.aggregate([{ $sort: { publication_date: -1 } }, { $limit: 20 }]);
		const data = [];
		for await (const doc of cursor) {
			data.push(doc)
		}
		client.send(
			JSON.stringify({
				type: "publicaciones",
				publicaciones: data,
			})
		);
	});
	Session.watch([], { fullDocument: "updateLookup" }).on("change", async change => {
		if (change.operationType === "delete") {
			const cursor = await Session.find({ user });
			if (cursor.length === 0) {
				users[user].send(
					JSON.stringify({
						type: "session",
					})
				);
			}
		}
	});
});

// SERVER LISTENING
server.listen(process.env.PORT, () => {
	console.log(`Connect using port: ${process.env.PORT}`);
});
