const { Schema, mongoose } = require("mongoose");

const schema = new Schema({
	user: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	passwd: { type: String, required: true },
	followers: [
		{
			user: { type: String },
		},
	],
	following: [
		{
			user: { type: String },
		},
	],
});

module.exports = mongoose.model("Register", schema);
