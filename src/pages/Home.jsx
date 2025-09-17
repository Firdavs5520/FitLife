import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMotivation((prev) => (prev + 1) % motivations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [motivations.length]);

  // Typewriter text
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
      {/* Background blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, -120, 120, 0], y: [0, -60, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-72 h-72 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg ">
          {text}
          <Cursor cursorStyle="_" />
        </h1>
        <motion.div
          className="relative z-10 max-w-3xl p-8 mx-auto shadow-2xl rounded-2xl bg-gray-800/80 backdrop-blur-lg border border-gray-700"
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
              className="text-2xl font-medium text-center text-gray-200"
            >
              {motivations[currentMotivation]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Muammo */}
      <motion.div
        className="relative z-10 max-w-3xl p-8 mx-auto mt-16 shadow-2xl rounded-2xl bg-gray-800/80 backdrop-blur-lg border border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-red-500 drop-shadow-md">
          ⚠️ Muammo
        </h2>
        <p className="text-lg text-gray-200 text-center drop-shadow-lg">
          Hozirgi kunda ko‘plab insonlar stress, noto‘g‘ri ovqatlanish va
          yetarli jismoniy faollik yo‘qligi tufayli sog‘lig‘ini yo‘qotmoqda.
        </p>
      </motion.div>

      {/* Bizning Yechim */}
      <motion.div
        className="relative z-10 max-w-3xl p-8 mx-auto mt-12 shadow-2xl rounded-2xl bg-gray-800/80 backdrop-blur-lg border border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-white drop-shadow-md">
          💡 Bizning Yechim
        </h2>
        <p className="text-lg text-gray-200 text-center drop-shadow-lg">
          Portalimiz orqali siz sog‘lom turmush tarzini shakllantirish,
          motivatsiya olish va hayotingizni ijobiy tomonga o‘zgartirish uchun
          barcha imkoniyatlarga ega bo‘lasiz.
        </p>
      </motion.div>
    </div>
  );
}
