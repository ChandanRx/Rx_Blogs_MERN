const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, editBlog, deleteBlog, getMyBlogs, getSingleBlog } = require('../controllers/BlogsController');
const isAuth = require('../middlewares/isAuth');
const upload = require('../middlewares/upload'); 

router.post('/create', isAuth, upload.uploadCovers.single("coverImage"), createBlog);
router.get("/" , getBlogs)
router.get("/myblogs", isAuth, getMyBlogs)
router.get("/:id", getSingleBlog)
router.patch('/:id', isAuth, upload.uploadCovers.single("coverImage"), editBlog);
router.delete('/:id', isAuth, deleteBlog);

module.exports = router;
