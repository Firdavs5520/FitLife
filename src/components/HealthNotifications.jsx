import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HealthNotifications() {
  const [time, setTime] = useState(new Date());
  const [showSleepAlert, setShowSleepAlert] = useState(false);
  const [showWaterAlert, setShowWaterAlert] = useState(false);
  const [sleepNotified, setSleepNotified] = useState(false);
  const [waterNotified, setWaterNotified] = useState(false);

  // Vaqtni yangilash
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Sleep alert (faqat 1 marta 21:00 dan keyin)
  useEffect(() => {
    const hour = time.getHours();
    if (hour >= 21 && !sleepNotified) {
      setShowSleepAlert(true);
      setSleepNotified(true);
    }
  }, [time, sleepNotified]);

  // Water reminder (har 30 daqiqa: 00 va 30 minutlarda)
  useEffect(() => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if (
      hour >= 8 &&
      hour <= 20 &&
      (minute === 0 || minute === 30) &&
      second === 0 &&
      !waterNotified
    ) {
      setShowWaterAlert(true);
      setWaterNotified(true);
    }

    // Oxirgi sekundda reset qilamiz — keyingi 30 minutga tayyorlash
    if ((minute === 29 && second === 59) || (minute === 59 && second === 59)) {
      setWaterNotified(false);
    }
  }, [time, waterNotified]);

  const closeSleepAlert = () => setShowSleepAlert(false);
  const closeWaterAlert = () => setShowWaterAlert(false);

  return (
    <div className="absolute z-50 flex flex-col gap-3 top-5 right-5">
      <AnimatePresence>
        {showSleepAlert && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="p-2 mt-12 text-white shadow-lg rounded-xl bg-purple-600/80 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <span>🛌 Uxlash vaqti keldi!</span>
              <button
                onClick={closeSleepAlert}
                className="ml-2 font-bold text-white hover:text-gray-200"
              >
                ✖
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWaterAlert && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="max-w-xs p-4 text-white shadow-lg rounded-xl bg-blue-500/80 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <span>💧 Suv ichdingizmi?</span>
              <button
                onClick={closeWaterAlert}
                className="ml-2 font-bold hover:text-gray-200"
              >
                ✖
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 text-lg font-bold text-center text-green-700 duration-1000 drop-shadow-md">
        Hozirgi vaqt: {time.toLocaleTimeString()}
      </div>
    </div>
  );
}
