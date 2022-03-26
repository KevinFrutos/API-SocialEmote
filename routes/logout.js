const router = require("express").Router();
const Session = require("../models/schema_sessions.js");

router.post("/logout", async (req, res) => {
	const { user } = req.cookies;
	try {
		await Session.deleteOne({ user: user });
		res
			.cookie("token", undefined, {
				httpOnly: true,
				sameSite: false,
				expires: 0,
			})
			.cookie("user", undefined, {
				httpOnly: true,
				sameSite: false,
				expires: 0,
			})
			.cookie("isLogged", undefined, {
				httpOnly: false,
				sameSite: false,
				maxAge: 0,
			})
			.status(200)
			.send();
	} catch (error) {
		console.log(error);
		res.status(400).send();
	}
});

module.exports = router;
