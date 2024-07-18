const mongoose = require("mongoose");

const databaseURL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DBNAME}?retryWrites=true&w=majority`;

const connection = async () => {
	try {
		await mongoose.connect(databaseURL, {
			authSource: "admin",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = connection;