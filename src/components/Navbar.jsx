import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "🏋️ Mashqlar", path: "/fitness" },
    { name: "🥗 Ovqatlanish", path: "/nutrition" },
    { name: "🧘 Ruhiy salomatlik", path: "/mental" },
    { name: "📰 Blog", path: "/blog" },
    { name: "📊 Hisoblash", path: "/bmi" },
    { name: "💧 Suv nazorati", path: "/water" },
    { name: "📅 Rejalar", path: "/planner" },
    { name: "⚡ Energiya", path: "/calorie" },
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
    <nav className="fixed top-4 left-0 z-50 w-full backdrop-blur-lg  ">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-3 relative border rounded-lg shadow-2xl rounded-2xl bg-gray-800/80 backdrop-blur-lg border border-gray-700">
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
              className="absolute top-20 left-0 w-full grid grid-cols-2 gap-4 px-6 py-6 shadow-2xl rounded-2xl bg-gray-800/95"
            >
              {links.map((link, i) => (
                <motion.li key={i} variants={itemVariants}>
                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-center p-3 rounded-xl font-semibold tracking-wide text-white shadow-md transition-all duration-300 
                      hover:scale-105 hover:shadow-lg hover:bg-gray-700/50
                      ${
                        isActive
                          ? "bg-gray-700/50 border border-gray-600"
                          : "bg-gray-800/50"
                      }`
                    }
                  >
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
