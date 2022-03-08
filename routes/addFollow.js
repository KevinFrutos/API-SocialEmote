const router = require("express").Router();
const Register = require("../models/schema_register");

router.put("/follow", async (req, res) => {
	try {
		const { user } = req.cookies;
		const { user_followed } = req.body;
		await Register.updateOne({ user: user }, { $push: { following: { user: user_followed } } });
		await Register.updateOne({ user: user_followed }, { $push: { followers: { user: user } } });
		res.status(200).send();
	} catch (error) {
		console.log(error);
		res.status(400).send();
	}
});

module.exports = router;
