// src/components/PageWrapper.jsx
import { motion } from "framer-motion";

export default function PageWrapper({ title, children }) {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
      {/* Blurli sharlar kulrang tonlarda */}
      <div className="absolute inset-0 rounded-xl">
        <div className="absolute bg-gray-700 rounded-full -top-20 -left-20 w-72 h-72 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bg-gray-600 rounded-full top-40 right-20 w-72 h-72 opacity-30 blur-3xl animate-pulse"></div>
      </div>

      {/* Asosiy content kartasi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl border shadow-2xl backdrop-blur-lg bg-gray-800/80 border-gray-700 rounded-xl p-6 mt-16"
      >
        <div className="card-body">
          {title && (
            <h1 className="mb-4 text-3xl font-bold text-center text-gray-100 drop-shadow-md">
              {title}
            </h1>
          )}
          {children}
        </div>
      </motion.div>
    </div>
  );
}
