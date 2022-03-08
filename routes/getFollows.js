const router = require("express").Router();
const Register = require("../models/schema_register");

router.get("/follow", async (req, res) => {
	try {
		const { user } = req.cookies;
		const cursor = await Register.findOne({ user: user });
		if (cursor) {
			const { followers, following } = cursor;
			const followers_number = followers.length;
			const following_number = following.length;
			res.status(200).json({
				followers,
				followers_number,
				following,
				following_number,
			});
		} else {
			res.status(400).send();
		}
	} catch (error) {
		console.log(error);
		res.status(400).send();
	}
});

module.exports = router;
