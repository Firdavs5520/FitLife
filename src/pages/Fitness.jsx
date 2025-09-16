import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

export default function Fitness() {
  const workouts = {
    Ertalabki: [
      "15 daqiqa yugurish",
      "Push-up 10–20 marta",
      "Plank 30–60 soniya",
      "Jumping Jacks 3x50",
      "Mountain Climbers 3x30s",
    ],
    Yengil: [
      "Lunges 3x15",
      "Sit-ups 3x20",
      "Bicep Curls 3x15",
      "Tricep Dips 3x12",
      "Squats 3x20",
    ],
    Kechki: [
      "Stretching 10 daqiqa",
      "Yoga 15 daqiqa",
      "Light Jog 20 daqiqa",
      "Russian Twists 3x20",
      "Meditation 10 daqiqa",
    ],
  };

  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [motivation, setMotivation] = useState("");

  const handleWorkoutSelect = (type) => {
    setSelectedWorkout({ type, exercises: workouts[type] });
    setCompletedExercises([]);
    setMotivation("");
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
    }
  };

  return (
    <PageWrapper title="🏋️ Mashqlar">
      {!selectedWorkout ? (
        <div className="flex flex-col items-center gap-4 p-4 rounded-2xl">
          <h2 className="text-xl font-bold text-green-700">
            Qaysi mashq turini qilmoqchisiz?
          </h2>
          <div className="flex gap-2">
            {Object.keys(workouts).map((type) => (
              <button
                key={type}
                onClick={() => handleWorkoutSelect(type)}
                className="px-4 py-3 font-semibold text-white transition bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:scale-105"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-green-700">
            {selectedWorkout.type} mashqlari
          </h2>
          <ul className="space-y-4 text-green-700">
            {selectedWorkout.exercises.map((ex) => (
              <li
                key={ex}
                onClick={() => completeExercise(ex)}
                className={`p-4 transition shadow-md rounded-xl bg-white/20 backdrop-blur-md cursor-pointer hover:scale-105 ${
                  completedExercises.includes(ex)
                    ? "line-through opacity-70"
                    : ""
                }`}
              >
                {ex}
              </li>
            ))}
          </ul>
          {motivation && (
            <div className="p-4 mt-4 text-white shadow-lg rounded-xl bg-purple-600/80 backdrop-blur-md">
              {motivation}
            </div>
          )}
          <button
            onClick={() => setSelectedWorkout(null)}
            className="px-6 py-2 mt-4 font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Mashq turini o‘zgartirish
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
