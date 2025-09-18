import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Confetti from "react-confetti";
import {
  CheckIcon,
  SparklesIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

const weeklyWorkouts = {
  Dushanba: {
    Ertalabki: [
      "15 daqiqa yugurish",
      "Plank 30s",
      "Sakrash (Jumping Jacks) 3x50",
    ],
    Yengil: ["Qorin mashqlari (Sit-ups) 3x20", "Biceps 3x15", "Squats 3x20"],
    Kechki: ["10 daqiqa cho‘zilish", "Yoga 15 daqiqa", "Meditatsiya 10 daqiqa"],
  },
  Seshanba: {
    Ertalabki: [
      "20 daqiqa yugurish",
      "Plank 40s",
      "Tog‘ cho‘qqilariga sakrash (Mountain Climbers) 3x30",
    ],
    Yengil: [
      "Oldinga qadam tashlash (Lunges) 3x15",
      "Triceps 3x12",
      "Qorin mashqlari 3x25",
    ],
    Kechki: [
      "Yoga 20 daqiqa",
      "Cho‘zilish 10 daqiqa",
      "Rus burishlari (Russian Twists) 3x20",
    ],
  },
  Chorshanba: {
    Ertalabki: ["15 daqiqa yugurish", "Plank 30s", "Sakrash 3x60"],
    Yengil: ["Qorin mashqlari 3x20", "Biceps 3x15", "Squats 3x20"],
    Kechki: ["Meditatsiya 10 daqiqa", "Cho‘zilish 15 daqiqa", "Yoga 10 daqiqa"],
  },
  Payshanba: {
    Ertalabki: [
      "20 daqiqa yugurish",
      "Tog‘ cho‘qqilariga sakrash 3x30",
      "Plank 45s",
    ],
    Yengil: [
      "Oldinga qadam tashlash 3x20",
      "Triceps 3x15",
      "Qorin mashqlari 3x20",
    ],
    Kechki: ["Yoga 20 daqiqa", "Meditatsiya 15 daqiqa", "Cho‘zilish 10 daqiqa"],
  },
  Juma: {
    Ertalabki: ["15 daqiqa yugurish", "Sakrash 3x50", "Plank 30s"],
    Yengil: ["Qorin mashqlari 3x25", "Biceps 3x15", "Squats 3x25"],
    Kechki: ["Yoga 15 daqiqa", "Meditatsiya 10 daqiqa", "Cho‘zilish 10 daqiqa"],
  },
  Shanba: {
    Ertalabki: [
      "20 daqiqa yugurish",
      "Plank 40s",
      "Tog‘ cho‘qqilariga sakrash 3x35",
    ],
    Yengil: [
      "Oldinga qadam tashlash 3x20",
      "Triceps 3x15",
      "Qorin mashqlari 3x25",
    ],
    Kechki: ["Yoga 25 daqiqa", "Meditatsiya 15 daqiqa", "Cho‘zilish 10 daqiqa"],
  },
  Yakshanba: {
    Ertalabki: ["Dam olish sayr 30 daqiqa", "Plank 30s", "Sakrash 3x50"],
    Yengil: ["Cho‘zilish 15 daqiqa", "Qorin mashqlari 3x20", "Biceps 3x15"],
    Kechki: ["Yoga 20 daqiqa", "Meditatsiya 15 daqiqa", "Rus burishlari 3x20"],
  },
};

export default function Fitness() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const progress = selectedWorkout
    ? Math.floor(
        (completedExercises.length / selectedWorkout.exercises.length) * 100
      )
    : 0;

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedWorkout(null);
    setCompletedExercises([]);
    setShowConfetti(false);
  };

  const handleWorkoutSelect = (type) => {
    setSelectedWorkout({ type, exercises: weeklyWorkouts[selectedDay][type] });
    setCompletedExercises([]);
    setShowConfetti(false);
  };

  const completeExercise = (ex) => {
    if (!completedExercises.includes(ex)) {
      setCompletedExercises((prev) => [...prev, ex]);
    }

    if (
      selectedWorkout.exercises.every(
        (e) => completedExercises.includes(e) || e === ex
      )
    ) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  };

  return (
    <PageWrapper title="🏋️ Haftalik Mashqlar">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {!selectedDay ? (
        <div className="flex flex-col items-center gap-4 p-4 rounded-2xl bg-gray-900/50 backdrop-blur-md shadow-lg text-center">
          <h2 className="text-xl font-bold text-white">
            Qaysi kun mashq qilmoqchisiz?
          </h2>
          <div className="flex gap-2 flex-wrap justify-center">
            {Object.keys(weeklyWorkouts).map((day) => (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className="px-4 py-3 font-semibold text-white transition bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 flex items-center gap-2"
              >
                <SparklesIcon className="w-5 h-5" />
                {day}
              </button>
            ))}
          </div>
        </div>
      ) : !selectedWorkout ? (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-white">
            {selectedDay} mashqlari
          </h2>
          <div className="flex gap-2 flex-wrap justify-center">
            {Object.keys(weeklyWorkouts[selectedDay]).map((type) => (
              <button
                key={type}
                onClick={() => handleWorkoutSelect(type)}
                className="px-4 py-3 font-semibold text-white transition bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 flex items-center gap-2"
              >
                <SparklesIcon className="w-5 h-5" />
                {type}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {selectedDay} - {selectedWorkout.type} mashqlari
          </h2>

          <div className="w-full h-6 bg-gray-700 rounded-full mb-2">
            <div
              className="h-6 bg-green-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white font-medium">{progress}% bajarildi</p>

          <ul className="space-y-4 text-white">
            {selectedWorkout.exercises.map((ex) => (
              <li
                key={ex}
                onClick={() => completeExercise(ex)}
                className={`p-4 transition shadow-md rounded-xl bg-gray-900/50 backdrop-blur-md cursor-pointer hover:scale-105 flex justify-between items-center ${
                  completedExercises.includes(ex)
                    ? "line-through opacity-70 text-gray-400"
                    : ""
                }`}
              >
                {ex}
                {completedExercises.includes(ex) && (
                  <CheckIcon className="w-6 h-6 text-green-400" />
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setSelectedWorkout(null)}
            className="px-6 py-2 mt-4 font-semibold text-white transition bg-gray-800 rounded-lg hover:bg-gray-700 flex items-center gap-2 justify-center"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Mashq turini o‘zgartirish
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
