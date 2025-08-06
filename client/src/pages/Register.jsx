import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("profilePic", formData.profilePic);



    try {
      const res = await fetch("http://localhost:7000/api/blogs/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Something went wrong!");

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gray-100 dark:bg-[#000] px-4">
      <motion.form
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
        onSubmit={handleSubmit}
        className="shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#fff] to-[#fff] dark:from-[#1e1e1e] dark:to-[#2c2c2c] p-8 w-full max-w-md space-y-5 dark:shadow-[2px_2px_0px_#FFD194]"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-center text-gray-800 dark:text-white"
        >
          Register
        </motion.h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-red-500 text-center"
          >
            {error}
          </motion.p>
        )}

        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-green-500 text-center"
          >
            {success}
          </motion.p>
        )}

        
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={inputVariant}
          className="flex items-center gap-2 bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] px-3 py-2 w-full shadow-md rounded-none"
        >
          <span className="text-gray-600 dark:text-gray-300">👤</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="bg-transparent outline-none w-full text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
          />
        </motion.div>

       
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={inputVariant}
          className="flex items-center gap-2 bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] px-3 py-2 w-full shadow-md rounded-none"
        >
          <span className="text-gray-600 dark:text-gray-300">@</span>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent outline-none w-full text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
          />
        </motion.div>

       
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={inputVariant}
          className="flex items-center gap-2 bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] px-3 py-2 w-full shadow-md rounded-none"
        >
          <span className="text-gray-600 dark:text-gray-300">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="bg-transparent outline-none w-full text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
          />
        </motion.div>

       
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={inputVariant}
          className="flex items-center gap-3 bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] px-3 py-2 w-full shadow-md rounded-none"
        >
          <span className="text-gray-600 dark:text-gray-300">📸</span>
          <label className="cursor-pointer text-sm text-gray-700 dark:text-gray-100">
            Upload Profile Picture
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
          {formData.profilePic && (
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {formData.profilePic.name}
            </span>
          )}
        </motion.div>


    
        <motion.button
          type="submit"
          disabled={loading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full mt-6 h-12 flex items-center justify-center bg-[linear-gradient(45deg,_#fca311,_#fca311)] dark:bg-[linear-gradient(45deg,_#D1913C,_#D1913C)] text-black dark:text-[#FFF] px-5 rounded-none font-semibold shadow-[4px_4px_0px_#00000025] dark:shadow-[2px_2px_0px_#FFD194] hover:opacity-90 transition duration-200"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-black dark:border-white rounded-full animate-spin" />
          ) : (
            "Register"
          )}
        </motion.button>

       
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
