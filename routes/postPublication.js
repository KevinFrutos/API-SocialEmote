const router = require("express").Router();
const Publication = require("../models/schema_publication");

router.post("/publication", (req, res) => {
	try {
		if (req.body) {
			const { user } = req.cookies;
			const { description } = req.body;
			const publication = new Publication({
				user: user,
				publication_date: Date.now(),
				description: description,
				likes: [],
				comments: [],
			});

			publication.save(err => {
				if (err) {
					console.log(err);
					res.status(400).send();
				} else {
					res.status(200).send();
				}
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
