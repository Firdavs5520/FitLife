import { motion } from "framer-motion";

export default function BatteryStat({ value, label, color }) {
  return (
    <div className="flex flex-col items-center space-y-3 group">
      <div className="relative w-40 h-20 border-4 border-gray-600 rounded-lg flex items-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
        {/* Battery fill */}
        <motion.div
          className="h-full"
          style={{ backgroundColor: color }}
          initial={{ width: "0%" }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 2 }}
        />
        {/* Battery head */}
        <div className="absolute right-[-12px] top-1/4 w-3 h-8 bg-gray-600 rounded-sm"></div>
      </div>
      <span className="text-lg font-bold text-white">{value}%</span>
      <p className="text-gray-300 text-center text-sm">{label}</p>
    </div>
  );
}
