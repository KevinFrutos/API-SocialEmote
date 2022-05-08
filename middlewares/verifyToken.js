const bcrypt = require("bcrypt");
const Session = require("../models/schema_sessions");

const validarToken = async (req, res, next) => {
	if (req.cookies.token && req.cookies.user) {
		const { token, user } = req.cookies;
		try {
			const cursor = await Session.findOne({ user });
			if (cursor && bcrypt.compareSync(token, cursor.token)) {
				next();
			} else if (!cursor) {
				res
					.cookie("token", undefined, {
						httpOnly: true,
						sameSite: "none",
						secure: true,
						expires: 0,
					})
					.cookie("user", undefined, {
						httpOnly: true,
						sameSite: "none",
						secure: true,
						expires: 0,
					})
					.status(401)
					.send();
			} else {
				res.status(401).json({ error: "Acceso denegado" });
			}
		} catch (error) {
			console.log(error);
			res.status(400).send();
		}
	} else {
		res.status(401).json({ error: "Acceso denegado" });
	}
};

module.exports = validarToken;
