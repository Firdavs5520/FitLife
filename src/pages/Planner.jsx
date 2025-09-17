import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

export default function Planner() {
  const [time, setTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [alerts, setAlerts] = useState({
    sleep: false,
    water: false,
  });

  // LocalStorage dan yuklash
  useEffect(() => {
    const savedTasks = localStorage.getItem("plannerTasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // LocalStorage ga yozish
  useEffect(() => {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Vaqtni yangilash
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Alertlarni tekshirish
  useEffect(() => {
    const hour = time.getHours();
    const minute = time.getMinutes();

    // Sleep Alert 21:00 dan keyin
    if (hour >= 21 && !alerts.sleep) {
      setAlerts((prev) => ({ ...prev, sleep: true }));
    }

    // Water Alert 08:00–20:00 va har daqiqa
    if (hour >= 8 && hour <= 20 && minute % 1 === 0) {
      setAlerts((prev) => ({ ...prev, water: true }));
    }
  }, [time, alerts.sleep]);

  // Task qo‘shish
  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [...prev, { id: uuidv4(), text: input, done: false }]);
    setInput("");
  };

  // Task bajarilgan/bajarilmagan
  const toggleDone = (id) => {
    setTasks((prev) => {
      const newTasks = prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      );

      const allDone = newTasks.length > 0 && newTasks.every((t) => t.done);
      if (allDone) {
        setShowCongrats(true);
        setTimeout(() => setShowCongrats(false), 3000);
      }

      return newTasks;
    });
  };

  // Taskni o‘chirish
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <PageWrapper title="📅 Sog‘liq va Mashqlar Planner">
      {/* Vaqt */}
      <div className="text-center text-gray-700 font-semibold mb-6">
        Hozirgi vaqt: {time.toLocaleTimeString()}
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Bugungi mashq yoki vazifa..."
          className="flex-grow px-4 py-2 rounded-xl border border-green-400 bg-white/70 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
        >
          +
        </button>
      </div>

      {/* Tasks */}
      <ul className="space-y-2">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`flex justify-between items-center p-3 rounded-xl shadow-md backdrop-blur-md transition duration-200 cursor-pointer ${
                task.done
                  ? "bg-gray-300/50 line-through text-gray-500 hover:bg-gray-300/60"
                  : "bg-white/70 text-gray-800 hover:bg-white/80"
              }`}
            >
              <span onClick={() => toggleDone(task.id)} className="flex-1">
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="ml-3 text-red-500 hover:text-red-700 font-bold"
              >
                ✖
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Pop-ups */}
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 p-4 bg-green-500/80 backdrop-blur-md text-white font-bold rounded-2xl shadow-lg text-center"
          >
            🎉 Ajoyib! Barcha mashqlar bajarildi!
          </motion.div>
        )}

        {alerts.sleep && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-20 right-5 z-50 p-2 text-white shadow-lg rounded-xl bg-purple-600/80 backdrop-blur-md flex items-center gap-2"
          >
            🛌 Uxlash vaqti keldi!
            <button
              onClick={() => setAlerts((prev) => ({ ...prev, sleep: false }))}
              className="ml-2 font-bold"
            >
              ✖
            </button>
          </motion.div>
        )}

        {alerts.water && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-32 right-5 z-50 p-2 text-white shadow-lg rounded-xl bg-blue-500/80 backdrop-blur-md flex items-center gap-2"
          >
            💧 Suv ichdingizmi?
            <button
              onClick={() => setAlerts((prev) => ({ ...prev, water: false }))}
              className="ml-2 font-bold"
            >
              ✖
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
