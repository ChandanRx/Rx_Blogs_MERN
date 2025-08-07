import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(""); 

  try {
    const res = await axios.post("https://rx-blogs-mern.onrender.com/api/blogs/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(new Event("userChanged"));

      navigate("/");
    } else {
      setError("Login failed: Missing token or user data");
    }
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    setError("Invalid credentials");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-[#000] transition-colors duration-300">
     <motion.form
  onSubmit={handleLogin}
  initial={{ opacity: 0, scale: 0.95, y: 30 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
  className="shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#fff] to-[#fff] dark:from-[#1e1e1e] dark:to-[#2c2c2c] p-8 w-full max-w-md space-y-5 px-4 dark:shadow-[2px_2px_0px_#FFD194]"
>
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-2xl font-bold text-center text-gray-800 dark:text-white"
  >
    Login
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

  <motion.div
    initial="hidden"
    animate="show"
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.15,
        },
      },
    }}
    className="space-y-5"
  >
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      className="flex items-center gap-2 bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] px-3 py-2 w-full shadow-md rounded-none"
    >
      <span className="text-gray-600 dark:text-gray-300">@</span>
      <input
        type="email"
        placeholder="Enter your email"
        className="bg-transparent outline-none w-full text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </motion.div>

    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      className="flex items-center gap-2 bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] px-3 py-2 w-full shadow-md rounded-none"
    >
      <span className="text-gray-600 dark:text-gray-300">🔒</span>
      <input
        type="password"
        placeholder="Enter your password"
        className="bg-transparent outline-none w-full text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </motion.div>
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
      "Login"
    )}
  </motion.button>

  
  <p className="text-sm text-center text-gray-600 dark:text-gray-300">
    Don’t have an account?{" "}
    <span
      onClick={() => navigate("/register")}
      className="text-blue-500 hover:underline cursor-pointer"
    >
      Register
    </span>
  </p>
</motion.form>

    </div>
  );
};

export default Login;
