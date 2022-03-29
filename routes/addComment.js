const router = require("express").Router();
const Publication = require("../models/schema_publication");

router.post("/publication/comment", async (req, res) => {
	try {
		if (req.body) {
			const { user } = req.cookies;
			const { idPost, comment } = req.body;
			await Publication.updateOne({ _id: idPost }, { $push: { comments: { user_comment: user, comment: comment } } });
			// UNA VEZ QUE CAMBIO LOS DATOS HAGO UNA ULTIMA PETICIÓN A LA BASE DE DATOS
			// PARA QUE ME DE LOS DATOS ACTUALIZADOS
			const cursor = await Publication.aggregate([{ $sort: { publication_date: -1 } }, { $limit: 20 }]);

			const data = [];

			for await (const doc of cursor) {
				data.push(doc);
			}
			res.status(200).json(data);
		} else {
			res.status(400).send();
		}
	} catch (error) {
		console.log(error);
		res.status(400).send();
	}
});

module.exports = router;
