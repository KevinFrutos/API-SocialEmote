const router = require("express").Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const cookie = require("cookie");
const mongoose = require("mongoose");
const Session = require("../models/schema_sessions");

router.post("/login", async (req, res) => {
	if (req.body) {
		const { user, passwd: password } = req.body;
		try {
			const cursor = await mongoose.connection.collection("registers").findOne({ user: user });
			if (cursor) {
				const { passwd } = cursor;
				bcrypt.compare(password, passwd, (err, result) => {
					if (err) {
						console.log(err);
						res.status(401).send();
					} else {
						if (result) {
							const token = uuidv4();

							const session = new Session({
								user,
								token,
								role: "Client",
							});

							session.save(err => {
								if (err) {
									console.log(err);
									res.status(400).send();
								} else {
									res
										.setHeader(
											"Set-Cookie",
											cookie.serialize("token", token, {
												httpOnly: true,
												sameSite: true,
											})
										)
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