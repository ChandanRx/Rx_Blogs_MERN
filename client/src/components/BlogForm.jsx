import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const BlogForm = () => {
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const location = useLocation();


  const editMode = location.state?.blog !== undefined;
  const blogToEdit = location.state?.blog;

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editMode) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.description);
    }
  }, [editMode, blogToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!title || !content) {
      setError("Title and content are required.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', content);
      if (coverImage) formData.append('coverImage', coverImage);

      let res;
      if (editMode) {
        res = await axios.patch(
          `https://rx-blogs-mern.onrender.com/api/addblog/${blogToEdit._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          'https://rx-blogs-mern.onrender.com/api/addblog/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log(res.data);
      navigate('/profile');
    } catch (err) {
      console.error('Blog submit error:', err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto px-4 py-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {editMode ? "Edit Blog" : "Add New Blog"}
      </motion.h2>


      {error && (
        <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] shadow-[4px_4px_0px_#00000020] dark:shadow-[2px_2px_0px_#FFD194] outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        />

        <motion.textarea
          placeholder="Write your blog content..."
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full px-4 py-2 resize-none bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] shadow-[4px_4px_0px_#00000020] dark:shadow-[2px_2px_0px_#FFD194] outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        />

        <motion.input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setCoverImage(file);
          }}
          required={!editMode}
          className="block w-full text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:bg-gradient-to-r file:from-[#FFF8E1] file:to-[#FAF3DD] dark:file:from-[#1e1e1e] dark:file:to-[#2c2c2c] file:text-gray-700 dark:file:text-gray-200 file:shadow-[4px_4px_0px_#00000020] dark:file:shadow-[2px_2px_0px_#FFD194]"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        />

        <motion.button
          type="submit"
          disabled={loading}
          className="px-6 py-2 mt-6 h-12 flex items-center justify-center bg-[linear-gradient(45deg,_#fca311,_#fca311)] dark:bg-[linear-gradient(45deg,_#D1913C,_#D1913C)] text-black dark:text-[#FFF] rounded-none font-semibold shadow-[4px_4px_0px_#00000025] dark:shadow-[2px_2px_0px_#FFD194] hover:opacity-90 transition duration-200"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-black dark:border-white rounded-full animate-spin" />
          ) : (
            editMode ? "Update Blog" : "Publish Blog"
          )}
        </motion.button>

      </motion.form>
    </motion.div>
  );
};

export default BlogForm;
