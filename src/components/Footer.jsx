import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 p-8 border-t-2 border-green-700 bg-gradient-to-r from-green-200 via-blue-100 to-purple-200"
    >
      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt- text-sm text-center text-gray-600/80 font-bold  drop-shadow-md"
      >
        © 2025 Salomatlik Portal. Barcha huquqlar himoyalangan.
      </motion.div>
    </motion.footer>
  );
}
