import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import Confetti from "react-confetti";

export default function WaterTracker() {
  const [cups, setCups] = useState(0);
  const [time, setTime] = useState(new Date());
  const [showWaterAlert, setShowWaterAlert] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const dailyGoal = 8;
  const percentage = Math.min((cups / dailyGoal) * 100, 100);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      if (hour >= 8 && hour <= 20 && minute === 0) {
        setShowWaterAlert(true);
        setTimeout(() => setShowWaterAlert(false), 5000);
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cups > dailyGoal) {
      setCups(0);
      setCelebrated(false);
    }
  }, [cups]);

  useEffect(() => {
    if (cups === dailyGoal && !celebrated) {
      setShowConfetti(true);
      setCelebrated(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  }, [cups, celebrated]);

  return (
    <PageWrapper title="💧 Suv ichish kuzatuvchisi">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      {/* Current Cups and Progress */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-lg md:text-xl font-bold drop-shadow-md"
        >
          Bugun {cups} / {dailyGoal} stakan suv ichdingiz
        </motion.div>

        {/* Progress Bar */}
        <div className="relative w-full h-6 mt-4 rounded-full overflow-hidden shadow-inner bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8 }}
            className="absolute h-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-inner"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 md:flex-row md:justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCups(cups + 1)}
          className="w-full md:w-1/3 p-3 font-semibold text-white rounded-xl shadow-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        >
          1 stakan qo‘shish
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCups(0)}
          className="w-full md:w-1/3 p-3 font-semibold text-white rounded-xl shadow-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600"
        >
          Boshidan boshlash
        </motion.button>
      </div>

      {/* Water Alert */}
      <AnimatePresence>
        {showWaterAlert && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-5 right-5 max-w-xs p-4 text-white rounded-xl shadow-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 backdrop-blur-md z-50"
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
      <div className="mt-4 text-lg font-bold text-center text-gray-100 drop-shadow-md">
        Hozirgi vaqt: {time.toLocaleTimeString()}
      </div>
    </PageWrapper>
  );
}
