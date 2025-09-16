// src/components/PageWrapper.jsx
import { motion } from "framer-motion";

export default function PageWrapper({ title, children }) {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 ">
      {/* Blurli rangli sharlar */}
      <div className="absolute inset-0 rounded-xl">
        <div className="absolute bg-green-300 rounded-full -top-20 -left-20 w-72 h-72 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bg-purple-300 rounded-full top-40 right-20 w-72 h-72 opacity-30 blur-3xl animate-pulse"></div>
      </div>

      {/* Asosiy content kartasi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl -4 border shadow-2xl card backdrop-blur-lg bg-white/30 border-white/40 rounded-xl p-4 mt-16 mb-4 "
      >
        <div className="card-body">
          {title && (
            <h1 className="mb-4 text-3xl font-bold text-center text-white drop-shadow-md ">
              {title}
            </h1>
          )}
          {children}
        </div>
      </motion.div>
    </div>
  );
}
