const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is Required"]
	},
	content: {
		type: String,
		required: [true, "Content is Required"]
	},
	author: {
		type: String,
		required: [true, "Author is Required"]
	},
	creationDate: {
		type: Date,
		default: Date.now
	},
	comments: [{
		userId: {
			type: String
		},
		comment: {
			type: String
		}
	}]

})

module.exports = mongoose.model('Blog', blogSchema);