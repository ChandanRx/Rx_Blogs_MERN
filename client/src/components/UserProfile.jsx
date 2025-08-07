import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token");
      try {
        const userRes = await axios.get("https://rx-blogs-mern.onrender.com/api/blogs/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const res = await axios.get("https://rx-blogs-mern.onrender.com/api/addblog/myblogs", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setBlogs(res.data || []);

      } catch (error) {
        console.error("Error fetching profile blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);



  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token"); 

        await axios.delete(`https://rx-blogs-mern.onrender.com/api/addblog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Delete error:", err.response?.data || err.message);
        alert("Failed to delete");
      }
    }
  };


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="p-6 md:p-8 shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#fff] to-[#fff] dark:from-[#1e1e1e] dark:to-[#2c2c2c] transition duration-300 dark:shadow-[2px_2px_0px_#FFD194]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img
              src={user?.profilePic}
              alt="avatar"
              className="w-24 h-24 border-blue-500 dark:border-yellow-400"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.username}</h2>
              <p className="text-gray-500 dark:text-gray-300 mt-1">{user?.email}</p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Blogs</p>
            <p className="text-2xl font-bold text-[#fca311] dark:text-yellow-400">{blogs.length}</p>
          </div>
        </div>
      </div>


      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate("/blogs/add")}
          className="px-6 py-2 bg-[linear-gradient(45deg,_#fca311,_#fca311)] dark:bg-[linear-gradient(45deg,_#D1913C,_#D1913C)] text-black dark:text-[#FFF] rounded-none font-semibold shadow-[4px_4px_0px_#00000025] dark:shadow-[2px_2px_0px_#FFD194] hover:opacity-90 transition duration-200"
        >
          ➕ Add Blog
        </button>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-2">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog?._id}
              className="shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#fff] to-[#fff] dark:from-[#1e1e1e] dark:to-[#2c2c2c] transition duration-300 dark:shadow-[2px_2px_0px_#FFD194]"
            >
              <img
                src={blog?.coverImage}
                alt={blog?.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {blog?.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  📅 {new Date(blog?.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate("/blogs/add", { state: { blog } })}
                    className="p-2 shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] transition duration-300 dark:shadow-[2px_2px_0px_#FFD194]"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(blog?._id)}
                    className="p-2 shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] transition duration-300 dark:shadow-[2px_2px_0px_#FFD194]"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
