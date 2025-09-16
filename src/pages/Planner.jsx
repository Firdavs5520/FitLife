import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

export default function Planner() {
  const [time, setTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [showSleepAlert, setShowSleepAlert] = useState(false);
  const [showWaterAlert, setShowWaterAlert] = useState(false);

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

  // Sleep Alert
  useEffect(() => {
    if (time.getHours() >= 21 && !showSleepAlert) setShowSleepAlert(true);
  }, [time, showSleepAlert]);

  // Water Alert (08:00–20:00)
  useEffect(() => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    if (hour >= 8 && hour <= 20 && minute === 0 && second === 0) {
      setShowWaterAlert(true);
    }
  }, [time]);

  // Task qo‘shish
  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  // Task bajarilgan/bajarilmagan
  const toggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);

    const allDone = newTasks.length > 0 && newTasks.every((t) => t.done);
    if (allDone) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
  };

  // Taskni o‘chirish
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
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
          {tasks.map((task, i) => (
            <motion.li
              key={i}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`flex justify-between items-center p-3 rounded-xl shadow backdrop-blur-md ${
                task.done
                  ? "bg-gray-200/40 line-through text-gray-400"
                  : "bg-white/70 text-gray-800"
              }`}
            >
              <span
                onClick={() => toggleDone(i)}
                className="cursor-pointer flex-1"
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(i)}
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
            className="fixed bottom-5 left-1/2 -translate-x-1/2 p-4 bg-green-500/80 backdrop-blur-md text-white font-bold rounded-2xl shadow-lg text-center"
          >
            🎉 Ajoyib! Barcha mashqlar bajarildi!
          </motion.div>
        )}

        {showSleepAlert && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="p-2 mt-4 text-white shadow-lg rounded-xl bg-purple-600/80 backdrop-blur-md"
          >
            🛌 Uxlash vaqti keldi!
            <button
              onClick={() => setShowSleepAlert(false)}
              className="ml-2 font-bold"
            >
              ✖
            </button>
          </motion.div>
        )}

        {showWaterAlert && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="p-2 mt-4 text-white shadow-lg rounded-xl bg-blue-500/80 backdrop-blur-md"
          >
            💧 Suv ichdingizmi?
            <button
              onClick={() => setShowWaterAlert(false)}
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
