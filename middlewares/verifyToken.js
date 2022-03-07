const Session = require("../models/schema_sessions.js");

const validarToken = async (req, res, next) => {
	if (req.cookies.token) {
		const { token } = req.cookies;
		try {
			const cursor = await Session.findOne({ token: token });
			if (cursor) {
				next();
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
