const express = require("express");
const blogController = require("../controllers/blog");
const { verify, verifyAdmin } = require("../auth.js");

const router = express.Router();

router.post("/", verify, blogController.createBlog);

router.get('/getMyBlogs', verify, blogController.getMyBlog);

router.get("/all", blogController.getAllBlogs);

router.get("/adminAll", blogController.getAdminAllBlogs);

router.get("/specific/:id", blogController.getBlog);

router.patch("/:blogId", verify, blogController.updateBlog);

router.delete("/:blogId", verify, blogController.deleteBlog);





module.exports = router;