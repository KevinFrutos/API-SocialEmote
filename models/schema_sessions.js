const { Schema, mongoose } = require("mongoose");

const schema = new Schema({
	user: { type: String, required: true, unique: true },
	token: { type: String, required: true },
	role: { type: String, required: true },
});

module.exports = mongoose.model("Session", schema);
