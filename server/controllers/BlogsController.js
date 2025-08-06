const Blog = require('../models/BlogSchema');
const cloudinary = require('../config/cloudinary');


const createBlog = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({ message: 'All fields are required including cover image.' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'blogs',
    });

    const blog = new Blog({
      title,
      description,
      coverImage: result.secure_url,
      author: req.user.id,
    });

    await blog.save();
    

    res.status(201).json({
      message: 'Blog created successfully',
      blog,
    });
  } catch (error) {
    console.error('Blog creation error:', error);
    res.status(500).json({ message: 'Server error while creating blog.' });
  }
};

const getBlogs = async (req,res) =>{
  try {
      const blogs = await Blog.find().populate('author', 'username')
    res.status(200).json({message:"get all the blogs", blogs})
  } catch (error) {
    res.status(500).json({message:"internal server error"})
  }
}

const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate('author', 'username');

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    console.error("Error fetching single blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const editBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, description } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to edit this blog' });
    }

    if (title) blog.title = title;
    if (description) blog.description = description;


    if (req.file && req.file.path) {
      blog.coverImage = req.file.path; 
    }

    await blog.save();

    res.status(200).json({
      message: 'Blog updated successfully',
      blog,
    });
  } catch (error) {
    console.error('Edit blog error:', error);
    res.status(500).json({ message: 'Server error while editing blog' });
  }
};


const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error while deleting blog' });
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user._id; 
    const userBlogs = await Blog.find({ author: userId }).populate("author", "username");
    res.status(200).json(userBlogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user blogs" });
  }
};


module.exports = {
  createBlog,
  getBlogs,
  getSingleBlog,
  getMyBlogs,
  editBlog,
  deleteBlog
};
