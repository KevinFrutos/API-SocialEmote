const router = require("express").Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const Register = require("../models/schema_register");
const Session = require("../models/schema_sessions");

router.post("/login", async (req, res) => {
	if (req.body && (!req.cookies.token || req.cookies.token === "undefined")) {
		const { user, passwd: password } = req.body;
		try {
			const cursor = await Register.findOne({ user: user });
			if (cursor) {
				const { passwd } = cursor;
				bcrypt.compare(password, passwd, (err, result) => {
					if (err) {
						console.log(err);
						res.status(401).send();
					} else {
						if (result) {
							const token = uuidv4();
							const token_hash = bcrypt.hashSync(token, 10);

							const session = new Session({
								user,
								token: token_hash,
								role: "Client",
							});

							session.save(err => {
								if (err) {
									console.log(err);
									res.status(400).send();
								} else {
									res
										.cookie("token", token, {
											httpOnly: true,
											sameSite: false,
											maxAge: 24 * 60 * 60 * 1000,
										})
										.cookie("user", user, {
											httpOnly: true,
											sameSite: false,
											maxAge: 24 * 60 * 60 * 1000,
										})
										.cookie("isLogged", true, {
											httpOnly: false,
											sameSite: false,
											maxAge: 24 * 60 * 60 * 1000,
										})
										.status(200)
										.send();
								}
							});
						} else {
							res.status(401).send();
						}
					}
				});
			} else {
				res.status(401).send();
			}
		} catch (error) {
			console.log(error);
			res.status(400).send();
		}
	} else {
		res.status(400).send();
	}
});

module.exports = router;
