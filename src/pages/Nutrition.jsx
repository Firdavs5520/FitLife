import PageWrapper from "../components/PageWrapper";

export default function Nutrition() {
  const weeklyMeals = [
    {
      day: "Dushanba",
      breakfast: "Yog‘urt, yulaf, mevalar",
      lunch: "Sabzavotli salat, tovuq go‘shti",
      dinner: "Baliq, brokkoli, yashil choy",
    },
    {
      day: "Seshanba",
      breakfast: "Omlet, pomidor, qora non",
      lunch: "Qaynatilgan tuxum, sabzavotli salat",
      dinner: "Tovuq go‘shti, qovurilgan sabzavotlar",
    },
    {
      day: "Chorshanba",
      breakfast: "Sut, banan, yulaf",
      lunch: "Baliq, quinoa, sabzavotlar",
      dinner: "Tovuq go‘shti, brokkoli, yashil choy",
    },
    {
      day: "Payshanba",
      breakfast: "Omelet, bodring, avokado",
      lunch: "Sabzavotli sho‘rva, tovuq go‘shti",
      dinner: "Baliq, sabzavot salati, yashil choy",
    },
    {
      day: "Juma",
      breakfast: "Yog‘urt, mevalar, yulaf",
      lunch: "Tovuq go‘shti, sabzavot salati",
      dinner: "Baliq, brokkoli, yashil choy",
    },
    {
      day: "Shanba",
      breakfast: "Sut, tuxum, qora non",
      lunch: "Sabzavotli salat, tovuq go‘shti",
      dinner: "Baliq, qovurilgan sabzavotlar",
    },
    {
      day: "Yakshanba",
      breakfast: "Smoothie, banan, yulaf",
      lunch: "Tovuq go‘shti, sabzavotlar",
      dinner: "Baliq, brokkoli, yashil choy",
    },
  ];

  return (
    <div className="pt-4  ">
      <PageWrapper title="🥗 Sog‘lom Ovqatlanish">
        <div className=" p-4  flex flex-col gap-4">
          {weeklyMeals.map((day, idx) => (
            <div
              key={idx}
              className="p-4 shadow-lg bg-white/30 backdrop-blur-md rounded-2xl transition hover:scale-105 duration-300"
            >
              <h2 className="mb-3 text-xl font-bold text-green-700">
                {day.day}
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-blue-600">Ertalab:</span>{" "}
                  {day.breakfast}
                </p>
                <p>
                  <span className="font-semibold text-orange-500">
                    Tushlik:
                  </span>{" "}
                  {day.lunch}
                </p>
                <p>
                  <span className="font-semibold text-purple-600">
                    Kechqurun:
                  </span>{" "}
                  {day.dinner}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageWrapper>
    </div>
  );
}
