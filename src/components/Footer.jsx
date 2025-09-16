import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 p-8 border-t-2 border-green-700 bg-gradient-to-r from-green-200 via-blue-100 to-purple-200"
    >
      <div className="flex flex-col items-center justify-between max-w-6xl gap-6 mx-auto md:flex-row">
        {/* Logo / Title */}
        <div className="text-2xl font-bold text-green-700 drop-shadow-md">
          🏋️‍♂️ Salomatlik Portal
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-700/90">
          <a href="#fitness" className="transition-colors hover:text-green-600">
            Fitness
          </a>
          <a
            href="#nutrition"
            className="transition-colors hover:text-green-600"
          >
            Ovqatlanish
          </a>
          <a href="#mental" className="transition-colors hover:text-green-600">
            Ruhiy Salomatlik
          </a>
          <a href="#survey" className="transition-colors hover:text-green-600">
            Sorovnoma
          </a>
          <a href="#contact" className="transition-colors hover:text-green-600">
            Aloqa
          </a>
        </div>

        {/* Social Icons */}
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-sm text-center text-gray-600/80"
      >
        © 2025 Salomatlik Portal. Barcha huquqlar himoyalangan.
      </motion.div>
    </motion.footer>
  );
}
