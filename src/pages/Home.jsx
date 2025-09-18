import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

// Hero Icons
import {
  LightBulbIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

// React Icons
import {
  FaRunning,
  FaAppleAlt,
  FaBed,
  FaBrain,
  FaMobileAlt,
  FaUsers,
  FaGlobe,
  FaRobot,
  FaLightbulb,
} from "react-icons/fa";
import CircleStat from "../components/CircleStat";
import BatteryStat from "../components/BatteryStat";

// Custom components

export default function Home() {
  const motivations = [
    "Har kuni kichik qadam – katta natijaga olib keladi.",
    "Bugun boshlang, ertaga kech bo‘lishi mumkin.",
    "Sog‘lom tana – baxtli hayot asosi.",
    "O‘zingizni seving, tanangizni asrang.",
    "Harakat – hayot kaliti.",
    "Siz bugun qilgan mehnat ertaga mevasini beradi.",
  ];

  const [currentMotivation, setCurrentMotivation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMotivation((prev) => (prev + 1) % motivations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [motivations.length]);

  const [text] = useTypewriter({
    words: [
      "Salomatlik Portaliga Xush Kelibsiz",
      "Sog‘lom Hayot — Baxt Kaliti",
      "Bugun boshlang, ertaga kech bo‘lishi mumkin",
    ],
    loop: true,
    typeSpeed: 150,
    deleteSpeed: 60,
    delaySpeed: 1000,
  });

  return (
    <div className="relative overflow-hidden bg-gray-900 py-[90px] min-h-screen text-gray-200">
      {/* Floating background blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, -120, 120, 0], y: [0, -60, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, 80, -80, 0], y: [0, 100, -100, 0] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 space-y-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
          {text}
          <Cursor cursorStyle="_" />
        </h1>
        <motion.div
          className="relative z-10 max-w-3xl p-6 mx-auto shadow-2xl rounded-2xl bg-gray-800/80 backdrop-blur-lg border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMotivation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-xl font-medium text-center text-gray-200"
            >
              {motivations[currentMotivation]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Muammo */}
      <motion.div
        className="relative z-10 max-w-3xl p-8 mx-auto mt-16 shadow-2xl rounded-2xl bg-gray-800/80 border border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-red-400 flex items-center justify-center gap-2">
          <ExclamationTriangleIcon className="w-8 h-8" /> Insonlardagi muammo
        </h2>
        <ul className="mt-6 space-y-3 text-left text-gray-300">
          <li className="flex items-center gap-2">
            <FaAppleAlt /> Noto‘g‘ri ovqatlanish odatlari
          </li>
          <li className="flex items-center gap-2">
            <FaRunning /> Yetarli jismoniy faollikning yo‘qligi
          </li>
          <li className="flex items-center gap-2">
            <FaBrain /> Doimiy stress va charchoq
          </li>
          <li className="flex items-center gap-2">
            <FaBed /> Sog‘lom uyqu rejimiga amal qilmaslik
          </li>
          <li className="flex items-center gap-2">
            <FaLightbulb /> Motivatsiyaning tez yo‘qolishi
          </li>
        </ul>
      </motion.div>

      {/* Yechim */}
      <motion.div
        className="relative z-10 max-w-3xl p-8 mx-auto mt-16 shadow-2xl rounded-2xl bg-gray-800/80 border border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-green-400 flex items-center justify-center gap-2">
          <LightBulbIcon className="w-8 h-8" /> Bizning yechim
        </h2>
        <ul className="mt-6 space-y-3 text-left text-gray-300">
          <li className="flex items-center gap-2">
            <FaAppleAlt /> Sog‘lom ovqatlanish bo‘yicha maslahatlar
          </li>
          <li className="flex items-center gap-2">
            <FaRunning /> Samarali jismoniy mashqlar rejalari
          </li>
          <li className="flex items-center gap-2">
            <FaBrain /> Stressni kamaytirish usullari
          </li>
          <li className="flex items-center gap-2">
            <FaBed /> Uyqu gigiyenasi va kun tartibi
          </li>
          <li className="flex items-center gap-2">
            <FaLightbulb /> Har kuni motivatsion fikrlar
          </li>
        </ul>
      </motion.div>

      {/* Kelajak */}
      <motion.div
        className="relative z-10 max-w-3xl p-8 mx-auto mt-16 shadow-2xl rounded-2xl bg-gray-800/80 border border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-yellow-400 flex items-center justify-center gap-2">
          <GlobeAltIcon className="w-8 h-8" /> Kelajakdagi maqsadlarimiz
        </h2>
        <ul className="mt-6 space-y-3 text-left text-gray-300">
          <li className="flex items-center gap-2">
            <FaMobileAlt /> Ilovani mobil versiyada ishga tushirish
          </li>
          <li className="flex items-center gap-2">
            <FaUsers /> Shifokorlar va murabbiylar bilan hamkorlik
          </li>
          <li className="flex items-center gap-2">
            <FaGlobe /> Ko‘p tilli qo‘llab-quvvatlash
          </li>
          <li className="flex items-center gap-2">
            <FaRobot /> Sun’iy intellekt yordamida reja tuzish
          </li>
          <li className="flex items-center gap-2">
            <FaLightbulb /> Yangi interaktiv imkoniyatlar
          </li>
        </ul>
      </motion.div>

      {/* Statistikalar */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto mt-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-400 drop-shadow-md mb-10 flex items-center justify-center gap-2">
          <FaGlobe /> Dunyo bo‘yicha Sog‘liq Statistikasi
        </h2>

        {/* Dumaloq statistikalar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <CircleStat
            value={43}
            label="Kattalardagi ortiqcha vazn"
            color="#22c55e"
          />
          <CircleStat
            value={20}
            label="Bolalar ortiqcha vazn"
            color="#eab308"
          />
          <CircleStat
            value={15}
            label="Stress darajasi yuqori"
            color="#ef4444"
          />
          <CircleStat
            value={60}
            label="Jismoniy faollik yo‘q"
            color="#3b82f6"
          />
        </div>

        {/* Batareyka statistikalar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 place-items-center">
          <BatteryStat
            value={43}
            label="Kattalardagi ortiqcha vazn"
            color="#22c55e"
          />
          <BatteryStat
            value={20}
            label="Bolalar ortiqcha vazn"
            color="#eab308"
          />
          <BatteryStat
            value={12}
            label="Sog‘lom ovqatlanmaydiganlar"
            color="#ef4444"
          />
        </div>
      </motion.div>
    </div>
  );
}
