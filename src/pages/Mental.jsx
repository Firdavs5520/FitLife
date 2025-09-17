import { useState, useEffect, useRef } from "react";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

export default function Mental() {
  const [meditationTime, setMeditationTime] = useState(
    () => Number(localStorage.getItem("meditationTime")) || 0
  );
  const [isMeditating, setIsMeditating] = useState(
    () => JSON.parse(localStorage.getItem("isMeditating")) || false
  );
  const [stressLevel, setStressLevel] = useState(
    () => Number(localStorage.getItem("stressLevel")) || null
  );
  const [advice, setAdvice] = useState(
    () => localStorage.getItem("advice") || ""
  );

  const intervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("meditationTime", meditationTime);
  }, [meditationTime]);
  useEffect(() => {
    localStorage.setItem("isMeditating", JSON.stringify(isMeditating));
  }, [isMeditating]);
  useEffect(() => {
    localStorage.setItem("stressLevel", stressLevel);
  }, [stressLevel]);
  useEffect(() => {
    localStorage.setItem("advice", advice);
  }, [advice]);
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startMeditation = () => {
    if (isMeditating) return;
    setIsMeditating(true);
    intervalRef.current = setInterval(() => {
      setMeditationTime((prev) => {
        if (prev >= 600) {
          clearInterval(intervalRef.current);
          setIsMeditating(false);
          alert("Meditatsiyangiz tugadi! 🕊️");
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStressSurvey = (level) => {
    setStressLevel(level);
    if (level <= 3) setAdvice("Siz nisbatan tinch ekansiz, davom eting!");
    else if (level <= 6)
      setAdvice("O‘rtacha stress. Qisqa meditatsiya qilishingiz mumkin.");
    else setAdvice("Yuqori stress! Kitob o‘qing yoki tabiatda sayr qiling.");
  };

  const tips = [
    {
      icon: "🕯️",
      text: "Meditatsiya — har kuni 10 daqiqa",
      color: "bg-gray-800/50",
    },
    {
      icon: "📖",
      text: "Kitob o‘qish — stressni kamaytiradi",
      color: "bg-gray-700/50",
    },
    { icon: "🌿", text: "Tabiatda sayr qilish", color: "bg-gray-800/50" },
  ];

  return (
    <PageWrapper title="🧘 Ruhiy Salomatlik">
      <div className="gap-2 text-white p-4 rounded-lg flex flex-col min-h-[550px]">
        {/* Tavsiyalar */}
        {tips.map((tip, idx) => (
          <motion.div
            key={idx}
            className={`p-2 rounded-lg shadow-md ${tip.color} backdrop-blur-md`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            {tip.icon} {tip.text}
          </motion.div>
        ))}

        {/* Meditatsiya Timer */}
        <div className="p-4 rounded-lg shadow-md bg-gray-900/50 backdrop-blur-md">
          <h3 className="mb-2 font-semibold text-white">Meditatsiya Timer</h3>
          <p className="text-gray-200">
            O‘tkazilgan vaqt: {Math.floor(meditationTime / 60)}:
            {("0" + (meditationTime % 60)).slice(-2)} min
          </p>
          <button
            onClick={startMeditation}
            disabled={isMeditating}
            className="px-4 py-2 mt-2 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            {isMeditating ? "Meditatsiya davom etmoqda..." : "Boshlash"}
          </button>
        </div>

        {/* Stress Survey */}
        <div className="p-4 rounded-lg shadow-md bg-gray-900/50 backdrop-blur-md">
          <h3 className="mb-2 font-semibold text-white">
            Stress darajangizni baholang
          </h3>
          <div className="flex gap-[4px] sm:gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => handleStressSurvey(num)}
                className="px-2 py-1 font-semibold text-white bg-gray-800 rounded hover:bg-gray-700 text-sm sm:text-base"
              >
                {num}
              </button>
            ))}
          </div>
          {advice && (
            <p className="mt-2 text-gray-300 font-medium">💡 {advice}</p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
