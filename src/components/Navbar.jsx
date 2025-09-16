import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Bosh sahifa", path: "/" },
    { name: "Mashqlar", path: "/fitness" },
    { name: "Ovqatlanish", path: "/nutrition" },
    { name: "Ruhiy salomatlik", path: "/mental" },
    { name: "Blog", path: "/blog" },
    { name: "BMI", path: "/bmi" },
    { name: "Suv Tracker", path: "/water" },
    { name: "Rejalar", path: "/planner" },
    { name: "Kaloriya", path: "/calorie" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-green-600/70 via-green-500/50 to-green-700/70 backdrop-blur-md shadow-lg">
      <div className="container flex items-center justify-between px-6 py-3 mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white drop-shadow-md hover:scale-105 transition-transform duration-300"
        >
          FitLife
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6">
          {links.map((link, i) => (
            <li key={i}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative text-white/90 font-medium tracking-wide transition-all duration-300 hover:text-white hover:scale-105 ${
                    isActive
                      ? "text-white after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-[-6px] after:left-0 after:rounded-lg after:animate-pulse"
                      : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-white transition hover:scale-110"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col px-6 pb-4 gap-4 bg-gradient-to-r from-green-600/70 via-green-500/50 to-green-700/70 backdrop-blur-md shadow-lg md:hidden"
          >
            {links.map((link, i) => (
              <li key={i}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)} // bosilganda menyu yopilsin
                  className={({ isActive }) =>
                    `block text-white/90 font-medium tracking-wide transition-all duration-300 hover:text-white hover:scale-105 ${
                      isActive ? "text-white font-bold" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
