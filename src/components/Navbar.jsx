import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaDumbbell,
  FaAppleAlt,
  FaRegNewspaper,
  FaCalculator,
  FaTint,
  FaRegCalendarAlt,
  FaBolt,
} from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Mashqlar", path: "/fitness", icon: <FaDumbbell /> },
    { name: "Ovqatlanish", path: "/nutrition", icon: <FaAppleAlt /> },
    { name: "Ruhiy salomatlik", path: "/mental", icon: <GiMeditation /> },
    { name: "Blog", path: "/blog", icon: <FaRegNewspaper /> },
    { name: "Hisoblash", path: "/bmi", icon: <FaCalculator /> },
    { name: "Suv nazorati", path: "/water", icon: <FaTint /> },
    { name: "Rejalar", path: "/planner", icon: <FaRegCalendarAlt /> },
    { name: "Energiya", path: "/calorie", icon: <FaBolt /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="fixed top-4 left-0 z-50 w-full">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-3 relative rounded-lg shadow-2xl bg-gray-800/80 backdrop-blur-lg border border-gray-700">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white drop-shadow-md hover:scale-105 transition-transform duration-300"
        >
          FitLife
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-white transition hover:scale-110"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-20 left-0 w-full grid grid-cols-2 gap-4 px-6 py-6 shadow-2xl rounded-2xl bg-gray-800"
            >
              {links.map((link, i) => (
                <motion.li key={i} variants={itemVariants}>
                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-center gap-2 p-3 rounded-xl font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-700/50 ${
                        isActive
                          ? "bg-gray-700/50 border border-gray-600"
                          : "bg-gray-800/50"
                      }`
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
