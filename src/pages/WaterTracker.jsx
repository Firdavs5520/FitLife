import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

export default function WaterTracker() {
  const [cups, setCups] = useState(0);
  const [time, setTime] = useState(new Date());
  const [showWaterAlert, setShowWaterAlert] = useState(false);

  const dailyGoal = 8; // kunlik maqsad
  const percentage = Math.min((cups / dailyGoal) * 100, 100);

  // Har soniyada vaqtni yangilash
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Background water reminder
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      // 08:00 dan 20:00 gacha har soat boshida eslatma
      if (hour >= 8 && hour <= 20 && minute === 0) {
        setShowWaterAlert(true);
        setTimeout(() => setShowWaterAlert(false), 5000); // 5 soniya ko‘rinadi
      }
    }, 1000 * 30); // har 30 soniyada tekshiradi

    return () => clearInterval(interval);
  }, []);

  // Motivatsion xabarlar
  const messages = [
    "Shoshilmang, yana bir stakan iching 🚰",
    "Ajoyib! Siz hozirgacha yaxshi ishladingiz 💧",
    "Siz maqsadga yetdingiz! 🎉",
  ];

  let message = messages[0];
  if (cups === 0) message = messages[0];
  else if (cups < dailyGoal) message = messages[1];
  else message = messages[2];

  return (
    <PageWrapper title="💧 Suv ichish kuzatuvchisi">
      {/* Current Cups and Progress */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-lg md:text-xl font-semibold"
        >
          Bugun {cups} / {dailyGoal} stakan suv ichdingiz
        </motion.div>

        {/* Progress Bar */}
        <div className="relative w-full h-6 mt-4 bg-white/20 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8 }}
            className="absolute h-6 bg-blue-500/70 rounded-full backdrop-blur-md"
          />
        </div>

        {/* Motivatsion Xabar */}
        <AnimatePresence>
          <motion.div
            key={cups}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-white font-medium text-sm md:text-base"
          >
            {message}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 md:flex-row md:justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCups(cups + 1)}
          className="w-full md:w-1/3 btn btn-info"
        >
          1 stakan qo‘shish
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCups(0)}
          className="w-full md:w-1/3 btn btn-warning"
        >
          Reset
        </motion.button>
      </div>

      {/* Water Alert */}
      <AnimatePresence>
        {showWaterAlert && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-5 right-5 max-w-xs p-4 text-white shadow-lg rounded-xl bg-blue-500/80 backdrop-blur-md z-50"
          >
            <div className="flex items-center justify-between">
              <span>💧 Suv ichdingizmi?</span>
              <button
                onClick={() => setShowWaterAlert(false)}
                className="ml-2 font-bold hover:text-gray-200"
              >
                ✖
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Time */}
      <div className="mt-4 text-lg font-bold text-center text-green-700 drop-shadow-md">
        Hozirgi vaqt: {time.toLocaleTimeString()}
      </div>
    </PageWrapper>
  );
}
