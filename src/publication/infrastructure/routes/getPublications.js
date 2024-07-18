const router = require("express").Router();
const Publication = require("../../domain/models/publication");

router.get("/publication", async (req, res) => {
	// SE SUSPENDE EL MATCH POR USUARIO POR EL MOMENTO
	//const { user } = req.cookies;
	const cursor = Publication.aggregate([
		//{ $match: { user: user } },
		{ $sort: { publication_date: -1 } },
		{ $limit: 20 },
	]);

	const data = [];

	for await (const doc of cursor) {
		data.push(doc);
	}
	res.status(200).json(data);
});

module.exports = router;
