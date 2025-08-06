import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { BsGithub } from "react-icons/bs";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const Footer = () => {
  return (
    <footer className="bg-[linear-gradient(45deg,_#fff8e1,_#ffe0b2)] dark:bg-[linear-gradient(45deg,_#1e1e1e,_#000000)] text-gray-800 dark:text-[#FFD194] px-6 py-10 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        

        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#FFD194] transition-all duration-300 hover:scale-105 hover:text-[#D1913C] dark:hover:text-white drop-shadow-custom dark:drop-shadow-custom"
          >
            Rx<span className="text-[#fca311] dark:text-[#D1913C]">-Blogs</span>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Discover, write, and share your stories and thoughts with the world.
          </p>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="flex flex-col gap-2"
        >
          <h3 className="font-semibold text-gray-800 dark:text-[#FFD194] mb-2">Quick Links</h3>
          <Link to="/" className="hover:underline hover:text-[#fca311] dark:hover:text-white">Home</Link>
          <Link to="/register" className="hover:underline hover:text-[#fca311] dark:hover:text-white">Register</Link>
          <Link to="/login" className="hover:underline hover:text-[#fca311] dark:hover:text-white">Login</Link>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h3 className="font-semibold text-gray-800 dark:text-[#FFD194] mb-2">Connect</h3>
          <p> <MdEmail className="inline-block"/> <a href="mailto:chandan.rxn@support.com" className="hover:underline">chandan.rxn@support.com</a></p>
          <p> <BsGithub className="inline-block"/> <a href="https://github.com/chandanRx" target="_blank" className="hover:underline">chandanRx</a></p>
        </motion.div>
      </div>

      <div className="mt-8 border-t border-gray-300 dark:border-[#333] pt-4 text-center text-xs text-gray-600 dark:text-gray-500">
        © {new Date().getFullYear()} Rx-Blogs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
