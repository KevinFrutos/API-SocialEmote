const router = require("express").Router();
const { connection } = require("mongoose");
const Session = require("../models/schema_sessions.js");

router.post("/logout", async (req, res) => {
	if (req.cookies.token) {
		const { token } = req.cookies;
		try {
			const cursor = await connection.collection("sessions").findOne({ token: token });
			if (cursor) {
				await Session.deleteOne({ token: token });
				res
					.cookie("token", undefined, {
						httpOnly: true,
						sameSite: true,
						expires: 0,
					})
					.status(200)
					.send();
			} else {
				res.status(400).send();
			}
		} catch (error) {
			console.log(error);
			res.status(400).send();
		}
	} else {
		res.status(400).send("ejem");
	}
});

module.exports = router;
