const router = require("express").Router();
const Publication = require("../../domain/models/publication");

router.post("/publication", (req, res) => {
	try {
		const { user } = req.cookies;
		const { description } = req.body;
		if (description && description.length <= 256) {
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
