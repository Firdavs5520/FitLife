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
    <PageWrapper title="BMI Kalkulyatori">
      <div className="mb-4">
        <label className="text-white font-semibold">Bo‘yingiz (sm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Masalan: 170"
          className="w-full mt-2 p-3 rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-700 text-white focus:ring-gray-400 transition"
        />
      </div>

      <div className="mb-6">
        <label className="text-white font-semibold">Vazningiz (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Masalan: 65"
          className="w-full mt-2 p-3 rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-700 text-white focus:ring-gray-400 transition"
        />
      </div>

      <motion.button
        onClick={calculateBmi}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 mb-4 font-bold text-white bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700"
      >
        Hisoblash
      </motion.button>

      {bmi && (
        <div className="p-6 mb-4 rounded-2xl bg-gray-900/60 backdrop-blur-md shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-bold text-white">
              Sizning BMI: <span className="text-gray-300">{bmi}</span>
            </p>
            <p className="font-semibold text-gray-200">{status}</p>
          </div>
          <p className="mb-2 text-gray-300">{advice}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="p-4 rounded-xl bg-gray-900/40 backdrop-blur-md shadow-lg border border-gray-700">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-white">BMI Tarixi</h3>
            <button
              onClick={clearHistory}
              className="px-2 py-1 text-sm bg-gray-700/70 rounded-md text-white hover:bg-gray-600/80"
            >
              Tozalash
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={history}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis domain={[0, 40]} stroke="#ccc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  borderRadius: "8px",
                  border: "1px solid #555",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="bmi"
                stroke="#fff"
                strokeWidth={3}
                dot={{ r: 4, fill: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </PageWrapper>
  );
}

export default Bmi;
