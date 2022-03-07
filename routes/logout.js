const router = require("express").Router();
const { connection } = require("mongoose");
const Session = require("../models/schema_sessions.js");

router.post("/logout", async (req, res) => {
	const { token } = req.cookies;
	try {
		await Session.deleteOne({ token: token });
		res
			.cookie("token", undefined, {
				httpOnly: true,
				sameSite: true,
				expires: 0,
			})
			.status(200)
			.send();
	} catch (error) {
		console.log(error);
		res.status(400).send();
	}
});

module.exports = router;
