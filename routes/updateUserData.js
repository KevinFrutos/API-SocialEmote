const router = require("express").Router();
const bcrypt = require("bcrypt");
const Register = require("../models/schema_register");

router.put("/data", async (req, res) => {
	try {
		const { user } = req.cookies;
		const { name: newName, last_name: newLast_name, email: newEmail, password: newPassword } = req.body;
		if (newName && newName !== "") {
			await Register.updateOne({ user: user }, { name: newName });
		}
		if (newLast_name && newLast_name !== "") {
			await Register.updateOne({ user: user }, { last_name: newLast_name });
		}
		if (newEmail && newEmail !== "") {
			await Register.updateOne({ user: user }, { email: newEmail });
		}
		if (newPassword && newPassword !== "") {
			const password = bcrypt.hashSync(newPassword, 10);
			await Register.updateOne({ user: user }, { passwd: password });
		}
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
