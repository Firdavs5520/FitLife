import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Confetti from "react-confetti";

export default function Fitness() {
  const workouts = {
    Ertalabki: [
      "15 daqiqa yugurish",
      "10–20 marta yotib-turish (otjimaniya)",
      "Plank 30–60 soniya",
      "Sakrash (Jumping Jacks) 3x50",
      "Mountain Climbers 3x30 soniya",
    ],
    Yengil: [
      "Oldinga qadam tashlab cho‘zilish (Lunges) 3x15",
      "Qorin mashqi (Sit-ups) 3x20",
      "Qo‘lni bukish (Biceps) 3x15",
      "Triceps uchun mashq 3x12",
      "O‘tirib-turish (Squats) 3x20",
    ],
    Kechki: [
      "10 daqiqa cho‘zilish",
      "15 daqiqa yoga",
      "20 daqiqa yengil yugurish",
      "Russian Twists 3x20",
      "10 daqiqa meditatsiya",
    ],
  };

  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [motivation, setMotivation] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleWorkoutSelect = (type) => {
    setSelectedWorkout({ type, exercises: workouts[type] });
    setCompletedExercises([]);
    setMotivation("");
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
      setMotivation("🌟 Zo‘r! Siz barcha mashqlarni bajardingiz!");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  };

  return (
    <PageWrapper title="🏋️ Mashqlar">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {!selectedWorkout ? (
        <div className="flex flex-col items-center gap-4 p-4 rounded-2xl bg-gray-900/50 backdrop-blur-md shadow-lg text-center">
          <h2 className="text-xl font-bold text-white">
            Qaysi mashq turini qilmoqchisiz?
          </h2>
          <div className="flex gap-2">
            {Object.keys(workouts).map((type) => (
              <button
                key={type}
                onClick={() => handleWorkoutSelect(type)}
                className="px-4 py-3 font-semibold text-white transition bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {selectedWorkout.type} mashqlari
          </h2>
          <ul className="space-y-4 text-white">
            {selectedWorkout.exercises.map((ex) => (
              <li
                key={ex}
                onClick={() => completeExercise(ex)}
                className={`p-4 transition shadow-md rounded-xl bg-gray-900/50 backdrop-blur-md cursor-pointer hover:scale-105 ${
                  completedExercises.includes(ex)
                    ? "line-through opacity-70 text-gray-400"
                    : ""
                }`}
              >
                {ex}
              </li>
            ))}
          </ul>
          {motivation && (
            <div className="p-4 mt-4 text-white shadow-lg rounded-xl bg-gray-700/80 backdrop-blur-md">
              {motivation}
            </div>
          )}
          <button
            onClick={() => setSelectedWorkout(null)}
            className="px-6 py-2 mt-4 font-semibold text-white transition bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            Mashq turini o‘zgartirish
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
