import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PageWrapper from "../components/PageWrapper";

function Bmi() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [advice, setAdvice] = useState("");
  const [history, setHistory] = useState([]);

  // LocalStorage dan o‘qish
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bmiHistory") || "[]");
    setHistory(stored);
  }, []);

  const calculateBmi = () => {
    if (!height || !weight) {
      setStatus("⚠️ Iltimos, bo‘y va vazn kiriting!");
      setBmi(null);
      setAdvice("");
      return;
    }

    const h = height / 100;
    const result = (weight / (h * h)).toFixed(1);
    setBmi(result);

    let newStatus = "";
    let newAdvice = "";

    if (result < 18.5) {
      newStatus = "Ozish (Ozg'inlik)";
      newAdvice = "🥗 Ko‘proq to‘yimli ovqatlar va oqsil qabul qiling!";
    } else if (result < 24.9) {
      newStatus = "Normal (Sog‘lom vazn)";
      newAdvice = "👍 Ajoyib! Sog‘lom turmush tarzini davom ettiring.";
    } else if (result < 29.9) {
      newStatus = "Ortiqcha vazn (Semirish)";
      newAdvice = "🏃‍♂️ Faollikni oshiring va kaloriya nazorat qiling.";
    } else {
      newStatus = "Semizlik (Jiddiy sog'liq xavfi)";
      newAdvice = "⚠️ Shifokor bilan maslahatlashish tavsiya etiladi.";
    }

    setStatus(newStatus);
    setAdvice(newAdvice);

    // Tarixga qo‘shish
    const date = new Date().toLocaleDateString();
    const newEntry = { date, bmi: parseFloat(result) };
    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem("bmiHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("bmiHistory");
  };

  return (
    <PageWrapper title="BMI Kalkulyatori" className="text-green-700">
      <div className="mb-4">
        <label>Bo‘yingiz (sm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Masalan: 170"
          className="w-full mt-2 p-3 rounded-xl bg-white/30 backdrop-blur-md border-2 focus:ring-green-400 transition"
        />
      </div>

      <div className="mb-6">
        <label>Vazningiz (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Masalan: 65"
          className="w-full mt-2 p-3 rounded-xl bg-white/30 backdrop-blur-md border-2 focus:ring-green-400 transition"
        />
      </div>

      <motion.button
        onClick={calculateBmi}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 mb-4 font-bold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg"
      >
        Hisoblash
      </motion.button>

      {bmi && (
        <div className="p-6 mb-4 rounded-2xl bg-white/30 backdrop-blur-md shadow-lg border-2 border-gradient-to-r from-purple-400 to-pink-400">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-bold">
              Sizning BMI: <span className="text-green-700">{bmi}</span>
            </p>
            <p className="font-semibold">{status}</p>
          </div>
          <p className="mb-2 text-gray-800">{advice}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="p-4 rounded-xl bg-white/20 backdrop-blur-md shadow-lg">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-green-700">BMI Tarixi</h3>
            <button
              onClick={clearHistory}
              className="px-2 py-1 text-sm bg-red-500/70 rounded-md text-white hover:bg-red-600/80"
            >
              Tozalash
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={history}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 40]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bmi"
                stroke="#4ade80"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </PageWrapper>
  );
}

export default Bmi;
