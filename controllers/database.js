const mongoose = require("mongoose");

const url_usuarios = `mongodb://${process.env.HOST}:27017/${process.env.DBUSERS}`;

const connection = async () => {
	try {
		await mongoose.connect(url_usuarios, {
			auth: {
				username: process.env.USER,
				password: process.env.PASSWORD,
			  },
			authSource: "admin",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = connection;