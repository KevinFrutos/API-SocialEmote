const router = require("express").Router();
const Publication = require("../../domain/models/publication");

router.post("/publication/like", async (req, res) => {
	try {
		const { idPost, user_like } = req.body;
		await Publication.updateOne({ _id: idPost }, { $push: { likes: { user_like: user_like } } });
		// UNA VEZ QUE CAMBIO LOS DATOS HAGO UNA ULTIMA PETICIÓN A LA BASE DE DATOS
		// PARA QUE ME DE LOS DATOS ACTUALIZADOS
		const cursor = await Publication.aggregate([{ $sort: { publication_date: -1 } }, { $limit: 20 }]);

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
