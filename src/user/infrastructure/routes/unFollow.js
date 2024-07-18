const router = require("express").Router();
const Register = require("../../domain/models/register");

router.put("/unfollow", async (req, res) => {
	try {
		const { user } = req.cookies;
		const { user_followed } = req.body;
		await Register.updateOne({ user: user }, { $pull: { following: { user: user_followed } } });
		await Register.updateOne({ user: user_followed }, { $pull: { followers: { user: user } } });
		// UNA VEZ QUE CAMBIO LOS DATOS HAGO UNA ULTIMA PETICIÓN A LA BASE DE DATOS
		// PARA QUE ME DE LOS DATOS ACTUALIZADOS
		const cursor = await Register.findOne({ user: user });
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
	} catch (error) {
		console.log(error);
		res.status(400).send();
	}
});

module.exports = router;
