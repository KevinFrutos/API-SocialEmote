const router = require("express").Router();
const Publication = require("../../domain/models/schema_publication");

router.delete("/publication", async (req, res) => {
	try {
		const { idPost } = req.body;
		await Publication.deleteOne({ _id: idPost });
		// UNA VEZ QUE CAMBIO LOS DATOS HAGO UNA ULTIMA PETICIÓN A LA BASE DE DATOS
		// PARA QUE ME DE LOS DATOS ACTUALIZADOS
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
	} catch (error) {
		console.log(error);
		res.status(400).send();
	}
});

module.exports = router;
