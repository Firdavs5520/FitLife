import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

export default function Mental() {
  const [meditationTime, setMeditationTime] = useState(0);
  const [isMeditating, setIsMeditating] = useState(false);
  const [stressLevel, setStressLevel] = useState(null);
  const [advice, setAdvice] = useState("");

  const startMeditation = () => {
    setIsMeditating(true);
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      setMeditationTime(seconds);
      if (seconds >= 600) {
        // 10 daqiqa
        clearInterval(interval);
        setIsMeditating(false);
        alert("Meditatsiyangiz tugadi! 🕊️");
      }
    }, 1000);
  };

  const handleStressSurvey = (level) => {
    setStressLevel(level);
    if (level <= 3) setAdvice("Siz nisbatan tinch ekansiz, davom eting! 🌿");
    else if (level <= 6)
      setAdvice("O‘rtacha stress. Qisqa meditatsiya qilishingiz mumkin. 🧘");
    else
      setAdvice("Yuqori stress! Kitob o‘qing yoki tabiatda sayr qiling. 📖🌳");
  };

  const tips = [
    {
      icon: "🕯️",
      text: "Meditatsiya — har kuni 10 daqiqa",
      color: "bg-purple-400/40",
    },
    {
      icon: "📖",
      text: "Kitob o‘qish — stressni kamaytiradi",
      color: "bg-blue-400/40",
    },
    { icon: "🌿", text: "Tabiatda sayr qilish", color: "bg-green-400/40" },
  ];

  return (
    <div className=" mt-4">
      <PageWrapper title="🧘 Ruhiy Salomatlik" className>
        <div className="gap-2 text-white p-4 rounded-lg flex flex-col min-h-[550px]">
          {/* Tavsiyalar */}
          {tips.map((tip, idx) => (
            <motion.div
              key={idx}
              className={`p-2 rounded-lg shadow-lg ${tip.color} backdrop-blur-md`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              {tip.icon} {tip.text}
            </motion.div>
          ))}

          {/* Meditatsiya Timer */}
          <div className="p-4 rounded-lg shadow-lg bg-purple-700/50 backdrop-blur-md">
            <h3 className="mb-2 font-semibold">Meditatsiya Timer</h3>
            <p>
              O‘tkazilgan vaqt: {Math.floor(meditationTime / 60)}:
              {("0" + (meditationTime % 60)).slice(-2)} min
            </p>
            <button
              onClick={startMeditation}
              disabled={isMeditating}
              className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {isMeditating ? "Meditatsiya davom etmoqda..." : "Boshlash"}
            </button>
          </div>

          {/* Stress Survey */}
          <div className="p-4 rounded-lg shadow-lg bg-blue-700/50 backdrop-blur-md">
            <h3 className="mb-2 font-semibold">Stress darajangizni baholang</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => handleStressSurvey(num)}
                  className="px-2 py-1 font-semibold text-white bg-purple-500 rounded hover:bg-purple-600"
                >
                  {num}
                </button>
              ))}
            </div>
            {advice && (
              <p className="mt-2 text-gray-200 font-medium">💡 {advice}</p>
            )}
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
