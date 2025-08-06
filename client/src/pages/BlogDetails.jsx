import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import moment from "moment/moment";
import { useAuth } from "../context/AuthContext"
import { Edit, Trash } from "lucide-react";


const BlogDetails = () => {
  const { id } = useParams();

  const { user } = useAuth();


  const [blog, setBlog] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState("");


  console.log(allComments);
  console.log(blog)

  useEffect(() => {
    const fetchData = async () => {
      console.log("called");
      setLoading(true);
      await fetchBlog();
      await fetchComments();
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:7000/api/comments/delete/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllComments((prev) => prev.filter((cmt) => cmt._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err.response?.data || err.message);
    }
  };

  const handleUpdateComment = async (id, text) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:7000/api/comments/edit/${id}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllComments((prev) =>
        prev.map((cmt) =>
          cmt._id === id ? { ...cmt, text } : cmt
        )
      );

      setEditCommentId(null);
      setEditText("");
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/addblog/${id}`);
      setBlog(response.data.blog);
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError("Failed to load blog.");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/comments/${id}`);
      setAllComments(response.data);
      console.log(response);

    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments.");
    }
  };

  const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommentLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:7000/api/comments/${id}`,
        { text: comment.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchComments();

      setComment("");

    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center flex items-center justify-center py-20 text-lg h-[80vh]">Loading...</div>;
  }

  if (error) {
    return <div className="text-center flex items-center justify-center py-20 text-red-500 h-[80vh]">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center flex items-center justify-center py-20 max-h-screen h-[80vh]">Blog not found.</div>;
  }


  return (


    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white px-4 py-10"
    >

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          className="bg-white dark:bg-[#1a1a1a] shadow-[2px_2px_0px_#00000020] dark:shadow-[2px_2px_0px_#FFD194] overflow-hidden border border-gray-200 dark:border-neutral-700"
        >
          <motion.img
            initial={{ scale: 1.03, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={blog.coverImage}
            alt="cover"
            className="w-full h-80 object-cover"
          />
          <div className="p-6 md:p-8">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-2 leading-snug"
            >
              {blog.title}
            </motion.h1>

            <div className="flex items-center gap-2 mt-2 mb-5">
              <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-yellow-900 text-blue-700 dark:text-yellow-200 rounded-full">
                ✍️ {blog?.author?.username}
              </span>
            </div>

            <hr className="border-gray-200 dark:border-neutral-700 my-4" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-200 text-lg leading-relaxed whitespace-pre-line"
            >
              {blog.description}
            </motion.div>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 bg-white dark:bg-[#1a1a1a] p-6 shadow-[2px_2px_0px_#00000010] dark:shadow-[2px_2px_0px_#FFD194] border border-gray-200 dark:border-neutral-700"
        >
          <h2 className="text-2xl font-semibold mb-4">Leave a comment 💬</h2>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <textarea
              className="w-full h-28 p-3 bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] shadow-[2px_2px_0px_#00000020] dark:shadow-[2px_2px_0px_#FFD194] resize-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="h-12 flex items-center justify-center bg-[linear-gradient(45deg,_#fca311,_#fca311)] dark:bg-[linear-gradient(45deg,_#D1913C,_#D1913C)] text-black dark:text-[#FFF] px-5 rounded-none font-semibold shadow-[4px_4px_0px_#00000025] dark:shadow-[2px_2px_0px_#FFD194] hover:opacity-90 transition duration-200"
            >
              {commentLoading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-black dark:border-white rounded-full animate-spin" />
              ) : (
                "Post Comment"
              )}


            </button>
          </form>

          <AnimatePresence>
            <ul className="space-y-3 mt-8 text-sm">
              {allComments?.filter(Boolean).map((cmt, idx) => (

                <motion.li
                  key={cmt._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] shadow-[2px_2px_0px_#00000020] dark:shadow-[2px_2px_0px_#FFD194] resize-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold opacity-45 capitalize text-gray-900 dark:text-white">{cmt.userId.username}</p>
                      {editCommentId === cmt._id ? (
                        <>
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full mt-2 p-2 text-sm rounded border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => handleUpdateComment(cmt._id, editText)}
                              className="text-green-600 hover:underline text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditCommentId(null);
                                setEditText("");
                              }}
                              className="text-yellow-600 hover:underline text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300">{cmt.text}</p>
                      )}

                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(cmt.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {cmt?.userId && typeof cmt.userId === "object" && user?._id === cmt.userId._id && (
                      <div className="flex gap-4">

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ rotate: 10 }}
                          onClick={() => {
                            setEditCommentId(cmt._id);
                            setEditText(cmt.text);
                          }}
                          className="p-2 shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] transition duration-300 dark:shadow-[2px_2px_0px_#FFD194]"
                        >
                          <Edit />
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ rotate: 10 }}
                          onClick={() => handleDelete(cmt._id)}
                          className="p-2 shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] transition duration-300 dark:shadow-[2px_2px_0px_#FFD194]"
                        >
                          <Trash />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>

          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogDetails;