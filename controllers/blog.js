const Blog = require("../models/Blog");
const User = require("../models/User");

const { errorHandler } = require("../auth.js");

module.exports.createBlog = (req, res) => {
	const { title, content} = req.body;

	const newBlog = new Blog({
		userId: req.user.id,
		title : title,
		content : content,
		author : req.user.username
	});

	return Blog.findOne({title: title})
	.then(blogExist => {
		if(blogExist){
			return res.status(409).send({
				message: "Blog already Exist",
			});
		} else {
			return newBlog.save()
			.then(result => {
				res.status(201).send(result)
			})
			.catch(error => errorHandler(error, req, res))
		}
	})
	.catch(error => errorHandler(error, req, res))
}

module.exports.getAllBlogs = (req, res) => {

	return Blog.find({})
	.then(result => {
		if (result.length === 0) {
			return res.status(404).send({message : "No Blog Found"});
		}
		return res.status(200).send(result);
	})
	.catch(err => errorHandler(err, req, res));

};

module.exports.getBlog = (req, res) => {

	return Blog.findById(req.params.id)
	.then(blog => {
		if(!blog) {
			return res.status(404).send({message: 'Blog not Found'});
		}
		return res.status(200).send(blog);
	})
	.catch(err => errorHandler(err, req,res));
};

module.exports.updateBlog = (req, res) => {

	let updatedBlog = {
		title: req.body.title,
		content: req.body.content
	}

	return Blog.findByIdAndUpdate(req.params.blogId, updatedBlog)
	.then(blog => {
		if (blog) {
			res.status(200).send({
				success: true,
				message: "Blog Updated Successfully"
			});
		} else {
			res.status(404).send({message: 'Blog not Found'});
		}
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.deleteBlog = (req, res) => {

    Blog.findById(req.params.blogId)
        .then(blog => {
            if (!blog) {
                return res.status(404).send({ message: 'Blog not found' });
            }

            if (blog.author.toString() !== req.user.username && !req.user.isAdmin) {
                return res.status(403).send({ message: 'You do not have permission to delete this blog' });
            }

            return Blog.findByIdAndDelete(req.params.postId)
                .then(() => {
                    res.status(200).send({ message: 'Blog deleted successfully' });
                })
                .catch(error => errorHandler(error, req, res));
        })
        .catch(error => errorHandler(error, req, res));
};

module.exports.getMyBlog = (req, res) => {
	return Blog.find({author: req.user.username})
	.then(result => {

		if(result.length > 0){

			return res.status(200).send({"blogs" : result});
		} else {
			return res.status(404).send({message: 'No found blogs'});
		}
	})
	.catch(error => errorHandler(error, req, res));
}

