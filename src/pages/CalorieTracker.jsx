import { useState, useMemo } from "react";
import PageWrapper from "../components/PageWrapper";

const menuData = {
  Ertalab: [
    { id: "e1", name: "Non va tuxum", calories: 300, type: "normal" },
    { id: "e2", name: "Yog‘urt va mevalar", calories: 200, type: "normal" },
    { id: "e3", name: "Oqsilli smuzi", calories: 250, type: "normal" },
    { id: "e4", name: "Fast-food Burger", calories: 450, type: "fastfood" },
  ],
  Tushlik: [
    { id: "t1", name: "Palov", calories: 600, type: "normal" },
    { id: "t2", name: "Manti", calories: 550, type: "normal" },
    { id: "t3", name: "Shashlik", calories: 500, type: "normal" },
    { id: "t4", name: "Fast-food Burger", calories: 450, type: "fastfood" },
    { id: "t5", name: "Pizza Margherita", calories: 550, type: "fastfood" },
  ],
  Kechki: [
    { id: "k1", name: "Baliq va brokkoli", calories: 400, type: "normal" },
    { id: "k2", name: "Sho‘rva", calories: 350, type: "normal" },
    { id: "k3", name: "Makarona", calories: 500, type: "normal" },
  ],
  desserts: [
    { id: "d1", name: "Shirinlik", calories: 150 },
    { id: "d2", name: "Meva", calories: 80 },
    { id: "d3", name: "Sutli pirog", calories: 200 },
  ],
  drinks: [
    { id: "dr1", name: "Suv", calories: 0 },
    { id: "dr2", name: "Choy", calories: 30 },
    { id: "dr3", name: "Sharbat", calories: 120 },
    { id: "dr4", name: "Kofe", calories: 50 },
  ],
};

export default function FoodPlanner() {
  const [mealTime, setMealTime] = useState("");
  const [search, setSearch] = useState("");
  const [showFastFood, setShowFastFood] = useState(true);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  const foods = useMemo(() => {
    if (!mealTime) return [];
    return menuData[mealTime].filter(
      (f) =>
        (showFastFood || f.type !== "fastfood") &&
        f.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [mealTime, search, showFastFood]);

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
    setMealTime("");
    setSelectedFood([]);
    setSelectedDessert(null);
    setSelectedDrink(null);
    setTotalCalories(0);
    setSearch("");
    setShowFastFood(true);
  };

  return (
    <PageWrapper title="🍽 Ovqat rejalashtiruvchi">
      {!mealTime ? (
        <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-md shadow-lg text-center">
          <h2 className="mb-4 text-xl font-bold text-white">
            Qaysi paytda ovqatlanasiz?
          </h2>
          <div className="flex flex-col gap-3 md:flex-row md:justify-center">
            {["Ertalab", "Tushlik", "Kechki"].map((time) => (
              <button
                key={time}
                onClick={() => setMealTime(time)}
                className="px-6 py-3 font-semibold text-white bg-gray-800 rounded-xl hover:bg-gray-700 transition"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
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

          <div className="grid gap-3 md:grid-cols-2 mt-4">
            {foods.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleFood(item)}
                className={`p-4 rounded-xl shadow-md transition text-left text-white ${
                  selectedFood.includes(item)
                    ? "bg-gray-700"
                    : "bg-gray-900/50 backdrop-blur-md"
                }`}
              >
                {item.name} ({item.calories} cal)
              </button>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-white font-semibold mb-2">Dessert tanlang:</h3>
            <div className="flex gap-3 flex-wrap">
              {menuData.desserts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDessert(d)}
                  className={`px-4 py-2 rounded-xl shadow-md transition text-white ${
                    selectedDessert === d
                      ? "bg-gray-700"
                      : "bg-gray-900/50 backdrop-blur-md"
                  }`}
                >
                  {d.name} ({d.calories} cal)
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-white font-semibold mb-2">Ichimlik tanlang:</h3>
            <div className="flex gap-3 flex-wrap">
              {menuData.drinks.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDrink(d)}
                  className={`px-4 py-2 rounded-xl shadow-md transition text-white ${
                    selectedDrink === d
                      ? "bg-gray-700"
                      : "bg-gray-900/50 backdrop-blur-md"
                  }`}
                >
                  {d.name} ({d.calories} cal)
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calculateCalories}
            className="mt-6 w-full py-3 font-bold text-white bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition"
          >
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
            className="mt-4 w-full py-2 font-semibold bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition"
          >
            Qayta tanlash
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
