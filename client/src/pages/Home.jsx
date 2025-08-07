import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaCircle } from "react-icons/fa";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://rx-blogs-mern.onrender.com/api/addblog/");
        setBlogs(res.data.blogs || res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="text-lg font-semibold h-[80vh] flex justify-center items-center text-center py-10">Loading blogs...</div>;


  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6 flex items-center gap-3">
        <FaCircle className="text-yellow-500 text-base" />
        <span>Latest Blogs</span>
      </h1>


      <motion.div
        className="flex flex-wrap gap-6 mb-6 justify-start"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {blogs.length === 0 ? (
          <div className="flex items-center justify-center h-[70vh] w-full text-center text-neutral-600 dark:text-neutral-300 text-xl font-semibold">
            No Blogs Found 📝
          </div>
        ) : (
          blogs.map((blog) => (
            <motion.div
              key={blog._id}
              variants={card}
              className="w-[350px] shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#ffe0b2] to-[#ffe0b2] dark:from-[#1e1e1e] dark:to-[#2c2c2c] transition duration-300 dark:shadow-[2px_2px_0px_#FFD194]"
            >
              <img
                src={blog.coverImage}
                alt="cover"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
                  {blog.title}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  by {blog.author?.username}
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2">
                  {blog.description}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="mt-3 inline-block text-sm px-3 py-1.5 shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#FFF8E1] to-[#FAF3DD] dark:from-[#D1913C] dark:to-[#D1913C] text-black font-semibold transition duration-300 dark:shadow-[2px_2px_0px_#FFD194]"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))
        )}

      </motion.div>
    </div>
  );
};

export default Home;
