const { Schema, mongoose } = require("mongoose");

const schema = new Schema({
	user: { type: String, required: true },
	publication_date: { type: String, required: true },
	description: { type: String, required: true },
	likes: [
		{
			user_like: { type: String },
		},
	],
	comments: [
		{
			user_comment: { type: String },
			comment: { type: String },
		},
	],
});

module.exports = mongoose.model("Publication", schema);
