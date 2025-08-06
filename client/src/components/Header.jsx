import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, Search } from "lucide-react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const Header = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };
    window.addEventListener("userChanged", handleStorageChange);
    return () => window.removeEventListener("userChanged", handleStorageChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="bg-[linear-gradient(45deg,_#fff8e1,_#ffe0b2)] dark:bg-[linear-gradient(45deg,_#1e1e1e,_#000000)] px-4 sm:px-6 py-6 sm:py-8 shadow-md sticky top-0 z-50 text-gray-800 dark:text-[#FFD194]"
    >
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-6">

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer"
        >
          <Link
            to="/"
            className="text-3xl font-bold tracking-tight p-1 text-gray-900 dark:text-[#FFD194] transition-all duration-300 hover:scale-105 hover:text-[#D1913C] dark:hover:text-white shadow-sm dark:shadow-[0_1px_5px_rgba(255,209,148,0.4)]"
          >
            Rx
            <span className="text-[#fca311] dark:text-[#D1913C] drop-shadow-custom dark:drop-shadow-custom">
              -Blogs
            </span>
          </Link>
        </motion.div>

        {/* {!["/login", "/register"].includes(location.pathname) && (
          <motion.div
            variants={itemVariants}
            className="hidden sm:flex items-center flex-grow max-w-md bg-gradient-to-r from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] px-3 py-2 shadow-[4px_4px_0px_#00000020] dark:shadow-[2px_2px_0px_#FFD194] rounded-none"
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
            <input
              type="text"
              placeholder="Search blogs..."
              className="bg-transparent outline-none w-full text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </motion.div>
        )} */}

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 sm:gap-4"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotate: 10 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 shadow-[4px_4px_0px_#00000020] rounded-none bg-gradient-to-br from-[#FFF8E1] to-[#FAF3DD] dark:from-[#1e1e1e] dark:to-[#2c2c2c] transition duration-300 dark:shadow-[2px_2px_0px_#FFD194]"
          >
            {darkMode ? (
              <Sun color="#FFD700" size={20} />
            ) : (
              <Moon color="#333" size={20} />
            )}
          </motion.button>

          {user ? (
            <>
              <Link
                to="/profile"
                className="text-gray-800 dark:text-[#FFD194] hover:text-[#D1913C] dark:hover:text-white transition-colors duration-200 text-xl"
              >
                <FaUser />
              </Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleLogout}
                className="bg-[linear-gradient(45deg,_#fca311,_#fca311)] dark:bg-[linear-gradient(45deg,_#D1913C,_#D1913C)] text-black dark:text-[#FFF] px-4 sm:px-5 py-1.5 rounded-none font-semibold shadow-[4px_4px_0px_#00000025] dark:shadow-[2px_2px_0px_#FFD194] hover:opacity-90 transition duration-200"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
              <Link
                to="/login"
                className="bg-[linear-gradient(45deg,_#fca311,_#fca311)] dark:bg-[linear-gradient(45deg,_#D1913C,_#D1913C)] text-black dark:text-[#FFF] px-4 sm:px-5 py-1.5 rounded-none font-semibold shadow-[4px_4px_0px_#00000025] dark:shadow-[2px_2px_0px_#FFD194] hover:opacity-90 transition duration-200"
              >
                Login
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
