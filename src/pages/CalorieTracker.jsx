import { useState, useMemo } from "react";
import { CheckIcon, XMarkIcon, SparklesIcon } from "@heroicons/react/24/solid";
import PageWrapper from "../components/PageWrapper";

const weekMenu = {
  Dushanba: {
    Ertalab: [
      { id: "db_e1", name: "Non va tuxum", calories: 300, type: "normal" },
      {
        id: "db_e2",
        name: "Yog‘urt va mevalar",
        calories: 200,
        type: "normal",
      },
      { id: "db_e3", name: "Oqsilli smuzi", calories: 250, type: "normal" },
      {
        id: "db_e4",
        name: "Fast-food Burger",
        calories: 450,
        type: "fastfood",
      },
    ],
    Tushlik: [
      { id: "db_t1", name: "Palov", calories: 600, type: "normal" },
      { id: "db_t2", name: "Manti", calories: 550, type: "normal" },
      {
        id: "db_t3",
        name: "Pizza Margherita",
        calories: 550,
        type: "fastfood",
      },
    ],
    Kechki: [
      { id: "db_k1", name: "Baliq va brokkoli", calories: 400, type: "normal" },
      { id: "db_k2", name: "Sho‘rva", calories: 350, type: "normal" },
    ],
    desserts: [
      { id: "db_d1", name: "Shirinlik", calories: 150 },
      { id: "db_d2", name: "Meva", calories: 80 },
    ],
    drinks: [
      { id: "db_dr1", name: "Suv", calories: 0 },
      { id: "db_dr2", name: "Choy", calories: 30 },
    ],
  },
  Seshanba: {
    Ertalab: [
      { id: "se_e1", name: "Avokado tost", calories: 320, type: "normal" },
      { id: "se_e2", name: "Protein pancake", calories: 360, type: "normal" },
      {
        id: "se_e3",
        name: "Nonushta burrito",
        calories: 450,
        type: "fastfood",
      },
    ],
    Tushlik: [
      { id: "se_t1", name: "Tovuq salat", calories: 300, type: "normal" },
      {
        id: "se_t2",
        name: "Spaghetti bolognese",
        calories: 500,
        type: "normal",
      },
      { id: "se_t3", name: "Sushi", calories: 450, type: "fastfood" },
    ],
    Kechki: [
      { id: "se_k1", name: "Grilled chicken", calories: 450, type: "normal" },
      { id: "se_k2", name: "Vegetarian curry", calories: 400, type: "normal" },
    ],
    desserts: [
      { id: "se_d1", name: "Chocolate cake", calories: 400 },
      { id: "se_d2", name: "Sutli pirog", calories: 200 },
    ],
    drinks: [
      { id: "se_dr1", name: "Kofe", calories: 50 },
      { id: "se_dr2", name: "Sharbat", calories: 120 },
    ],
  },
  Chorshanba: {
    /* shunga o‘xshash qilib kunlarni qo‘shing */
  },
  Payshanba: {
    /* ... */
  },
  Juma: {
    /* ... */
  },
  Shanba: {
    /* ... */
  },
  Yakshanba: {
    /* ... */
  },
};

export default function FoodPlannerWeek() {
  const [day, setDay] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [search, setSearch] = useState("");
  const [showFastFood, setShowFastFood] = useState(true);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  const foods = useMemo(() => {
    if (!day || !mealTime) return [];
    const menu = weekMenu[day][mealTime] || [];
    return menu.filter(
      (f) =>
        (showFastFood || f.type !== "fastfood") &&
        f.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [day, mealTime, search, showFastFood]);

  const toggleFood = (item) => {
    if (selectedFood.includes(item)) {
      setSelectedFood(selectedFood.filter((f) => f !== item));
    } else {
      setSelectedFood([...selectedFood, item]);
    }
  };

  const calculateCalories = () => {
    let sum =
      selectedFood.reduce((acc, f) => acc + f.calories, 0) +
      (selectedDessert ? selectedDessert.calories : 0) +
      (selectedDrink ? selectedDrink.calories : 0);
    setTotalCalories(sum);
  };

  const resetAll = () => {
    setDay("");
    setMealTime("");
    setSelectedFood([]);
    setSelectedDessert(null);
    setSelectedDrink(null);
    setTotalCalories(0);
    setSearch("");
    setShowFastFood(true);
  };

  return (
    <PageWrapper title="🍽 Haftalik Ovqat Rejalashtiruvchi">
      {!day ? (
        <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-md shadow-lg text-center">
          <h2 className="mb-4 text-xl font-bold text-white">
            Haftaning kunini tanlang
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(weekMenu).map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className="px-4 py-2 font-semibold text-white bg-gray-800 rounded-xl hover:bg-gray-700 transition flex items-center gap-2"
              >
                <SparklesIcon className="w-5 h-5" />
                {d}
              </button>
            ))}
          </div>
        </div>
      ) : !mealTime ? (
        <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-md shadow-lg text-center">
          <h2 className="mb-4 text-xl font-bold text-white">
            {day} kuni qaysi paytda ovqatlanasiz?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Ertalab", "Tushlik", "Kechki"].map((m) => (
              <button
                key={m}
                onClick={() => setMealTime(m)}
                className="px-6 py-3 font-semibold text-white bg-gray-800 rounded-xl hover:bg-gray-700 transition flex items-center gap-2"
              >
                <SparklesIcon className="w-5 h-5" />
                {m}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search & Fast-food toggle */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ovqat qidiring..."
              className="flex-grow p-3 rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-700 text-white focus:ring-gray-400 transition"
            />
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={showFastFood}
                onChange={() => setShowFastFood(!showFastFood)}
              />
              Fast-food ko‘rsatilsin
            </label>
          </div>

          {/* Food list */}
          <div className="grid gap-3 md:grid-cols-2 mt-4">
            {foods.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleFood(item)}
                className={`p-4 rounded-xl shadow-md transition text-left text-white flex items-center justify-between ${
                  selectedFood.includes(item)
                    ? "bg-gray-700"
                    : "bg-gray-900/50 backdrop-blur-md"
                }`}
              >
                <span>
                  {item.name} ({item.calories} cal)
                </span>
                {selectedFood.includes(item) && (
                  <CheckIcon className="w-5 h-5 text-green-400" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={calculateCalories}
            className="mt-6 w-full py-3 font-bold text-white bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
          >
            <SparklesIcon className="w-5 h-5" />
            Jami kaloriya hisoblash
          </button>

          {totalCalories > 0 && (
            <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-900/50 backdrop-blur-md text-center text-white">
              <h3 className="font-bold">Sizning jami kaloriyangiz:</h3>
              <p className="text-lg">{totalCalories} cal</p>
            </div>
          )}

          <button
            onClick={resetAll}
            className="mt-4 w-full py-2 font-semibold bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition flex items-center justify-center gap-2"
          >
            <XMarkIcon className="w-5 h-5" />
            Qayta tanlash
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
