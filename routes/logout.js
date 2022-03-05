import express from "express";
const router = express.Router();
import cookie from "cookie";
import connection from "../database/dbUsers.js";
import Session from "../models/schema_sessions.js";

router.post("/logout", async (req, res) => {
	if (cookie.parse(req.headers.cookie).token) {
		const { token } = cookie.parse(req.headers.cookie);
		try {
			const cursor = await connection.collection("sessions").findOne({ token: token });
			if (cursor) {
				await Session.deleteOne({ token: token });
				res
					.status(200)
					.setHeader(
						"Set-Cookie",
						cookie.serialize("token", undefined, {
							httpOnly: true,
							sameSite: true,
							expires: Date.now(0),
						})
					)
					.send();
			} else {
				res.status(400).send();
			}
		} catch (error) {
			console.log(error);
			res.status(400).send();
		}
	} else {
		res.status(400).send();
	}
});

export default router;
