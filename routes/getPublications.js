const router = require("express").Router();
const Publication = require("../models/schema_publication");

router.get("/publication", async (req, res) => {
	const { user } = req.cookies;
	const cursor = Publication.aggregate([
		{ $match: { user: user } },
		{ $sort: { publication_date: -1 } },
		{ $limit: 2 },
	]);

	const data = [];

	for await (const doc of cursor) {
		data.push(doc);
	}
	res.status(200).json(data);
});

module.exports = router;
