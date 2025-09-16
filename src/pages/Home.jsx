import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Home() {
  // Motivation texts
  const motivations = [
    "Har kuni kichik qadam – katta natijaga olib keladi.",
    "Bugun boshlang, ertaga kech bo‘lishi mumkin.",
    "Sog‘lom tana – baxtli hayot asosi.",
    "O‘zingizni seving, tanangizni asrang.",
    "Harakat – hayot kaliti.",
    "Siz bugun qilgan mehnat ertaga mevasini beradi.",
    "Vaqt toping, sog‘lig‘ingizni yo‘qotmang.",
    "Maqsad sari intiling, sabr bilan.",
    "Hech qachon kech emas, bugun boshlang.",
    "Har kuni biroz yaxshilang.",
    "Tana sizga minnatdor bo‘ladi.",
    "Qiyin yo‘l ham birinchi qadamdan boshlanadi.",
    "Sog‘liq – eng katta boylik.",
    "Siz o‘ylagandan ham kuchliroqsiz.",
    "Bir kun emas, bugun!",
    "Intizom – muvaffaqiyatning kaliti.",
    "Harakat qilmasangiz, orzu ortda qoladi.",
    "Kichik odatlar katta o‘zgarishlarga olib keladi.",
    "Harakat – davo.",
    "O‘zingizga investitsiya qiling – bu eng yaxshi sarmoya.",
    "Tanangizga g‘amxo‘rlik qiling, u sizda yagona.",
  ];

  const [currentMotivation, setCurrentMotivation] = useState(0);

  // Change motivation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMotivation((prev) => (prev + 1) % motivations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [motivations.length]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-200 via-blue-100 to-purple-200 py-20 min-h-screen">
      {/* Background animated blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -120, 120, 0], y: [0, -60, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
        <h1 className="text-4xl font-extrabold text-green-700 md:text-5xl drop-shadow-lg">
          Salomatlik Portaliga Xush Kelibsiz
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-800/90">
          Bu portal sog‘lom turmush tarzi, to‘g‘ri ovqatlanish va ruhiy
          salomatlikni rivojlantirishga yordam beradi.
        </p>
      </motion.div>

      {/* Muammo */}
      <motion.div
        className="relative z-10 max-w-3xl p-8 mx-auto mt-16 shadow-2xl rounded-2xl bg-white/50 backdrop-blur-lg border border-white/30"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-red-600">
          ⚠️ Muammo
        </h2>
        <p className="text-lg text-gray-800 text-center">
          Hozirgi kunda ko‘plab insonlar stress, noto‘g‘ri ovqatlanish va
          yetarli jismoniy faollik yo‘qligi tufayli sog‘lig‘ini yo‘qotmoqda.
        </p>
      </motion.div>

      {/* Bizning Yechim */}
      <motion.div
        className="relative z-10 max-w-3xl p-8 mx-auto mt-12 shadow-2xl rounded-2xl bg-white/50 backdrop-blur-lg border border-white/30"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-green-700">
          💡 Bizning Yechim
        </h2>
        <p className="text-lg text-gray-800 text-center">
          Portalimiz orqali siz sog‘lom turmush tarzini shakllantirish,
          motivatsiya olish va hayotingizni ijobiy tomonga o‘zgartirish uchun
          barcha imkoniyatlarga ega bo‘lasiz.
        </p>
      </motion.div>

      {/* Challenge & Motivation */}
      <motion.div
        className="relative z-10 max-w-2xl p-8 mx-auto mt-16 shadow-2xl rounded-2xl bg-white/40 backdrop-blur-lg border border-white/30"
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
            className="text-xl font-medium text-center text-gray-800"
          >
            {motivations[currentMotivation]}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* CTA Button */}
      <NavLink to={"/bmi"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 mt-12 font-bold text-white bg-green-500 rounded-full shadow-lg"
          >
            BMI Kalkulyatorini sinab ko‘ring
          </motion.button>
        </motion.div>
      </NavLink>
    </div>
  );
}
