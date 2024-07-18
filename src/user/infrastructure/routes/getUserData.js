const router = require("express").Router();
const Register = require("../../domain/models/schema_register");

router.get("/data", async (req, res) => {
	try {
		const { user } = req.cookies;
		const cursor = await Register.findOne({ user: user });
		if (cursor) {
			const { name, last_name, email, followers, following } = cursor;
			const followers_number = followers.length;
			const following_number = following.length;
			res.status(200).json({
				user,
				name,
				last_name,
				email,
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
