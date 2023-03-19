const mongoose = require("mongoose");

const url_usuarios = `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DBUSERS}?retryWrites=true&w=majority`;

const connection = async () => {
	try {
		await mongoose.connect(url_usuarios, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = connection;